import assert from "node:assert/strict";
import test, { type TestContext } from "node:test";
import { deliverInquiry, type InquiryPayload } from "./inquiry.ts";

const payload: InquiryPayload = {
  name: "Test enquiry",
  email: "test@example.invalid",
  buyerType: "privateBuyer",
  country: "Italy",
  locale: "en",
  privacyConsent: true,
};

function endpoint(t: TestContext, value?: string) {
  const previous = process.env.INQUIRY_ENDPOINT;
  if (value) process.env.INQUIRY_ENDPOINT = value;
  else delete process.env.INQUIRY_ENDPOINT;
  t.after(() => {
    if (previous === undefined) delete process.env.INQUIRY_ENDPOINT;
    else process.env.INQUIRY_ENDPOINT = previous;
  });
}

test("an unconfigured inbox never confirms delivery or sends a request", async (t) => {
  endpoint(t);
  const fetchMock = t.mock.method(globalThis, "fetch", async () => {
    throw new Error("Unexpected network request");
  });
  const result = await deliverInquiry(payload);
  assert.equal(result.delivered, false);
  assert.equal(result.mode, "unconfigured");
  assert.equal(fetchMock.mock.callCount(), 0);
});

test("delivery is confirmed only after the endpoint accepts the enquiry", async (t) => {
  endpoint(t, "https://delivery.example.invalid");
  const fetchMock = t.mock.method(globalThis, "fetch", async () => new Response(null, { status: 202 }));
  const result = await deliverInquiry(payload);
  assert.equal(result.delivered, true);
  assert.equal(fetchMock.mock.callCount(), 1);
});

test("an endpoint rejection does not produce a delivery confirmation", async (t) => {
  endpoint(t, "https://delivery.example.invalid");
  t.mock.method(globalThis, "fetch", async () => new Response(null, { status: 502 }));
  await assert.rejects(deliverInquiry(payload), /returned 502/);
});

test("network failure does not produce a delivery confirmation", async (t) => {
  endpoint(t, "https://delivery.example.invalid");
  t.mock.method(globalThis, "fetch", async () => {
    throw new Error("Connection unavailable");
  });
  await assert.rejects(deliverInquiry(payload), /Connection unavailable/);
});
