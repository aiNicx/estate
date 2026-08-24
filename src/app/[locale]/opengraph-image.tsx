import { ImageResponse } from "next/og";
import { parseLocale } from "@/lib/i18n";

export const alt = "Marina d'Albori Estate, Vietri sul Mare, Amalfi Coast";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = parseLocale(raw);
  const kicker = locale === "it" ? "IN VENDITA" : "FOR SALE";
  const title =
    locale === "it"
      ? "Una proprietà fronte mare a Vietri sul Mare"
      : "A waterfront estate in Vietri sul Mare";
  const place = "Marina d'Albori · Costiera Amalfitana · Campania";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#f3efe6",
          color: "#1c1914",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 6, color: "#9a4630" }}>{kicker}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 64, lineHeight: 1.1, maxWidth: 900 }}>{title}</div>
          <div style={{ fontSize: 28, color: "#5a5348" }}>{place}</div>
        </div>
      </div>
    ),
    size,
  );
}
