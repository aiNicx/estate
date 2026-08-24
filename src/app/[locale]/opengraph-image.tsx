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
          padding: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div style={{ fontSize: 20, letterSpacing: 6, color: "#8b3e2a" }}>{kicker}</div>
          <div style={{ fontSize: 20, letterSpacing: 4, color: "#1b3a4a" }}>1830</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              width: 220,
              height: 8,
              display: "flex",
              gap: 3,
            }}
          >
            <div style={{ flex: 1, background: "#1b3a4a", height: 8 }} />
            <div style={{ flex: 1, background: "#2d6a78", height: 8 }} />
            <div style={{ flex: 1, background: "#8b3e2a", height: 8 }} />
            <div style={{ flex: 1, background: "#b0892a", height: 8 }} />
            <div style={{ flex: 1, background: "#3c4f3d", height: 8 }} />
          </div>
          <div style={{ fontSize: 58, lineHeight: 1.08, maxWidth: 920 }}>{title}</div>
          <div style={{ fontSize: 26, color: "#4e4840" }}>{place}</div>
        </div>
      </div>
    ),
    size,
  );
}
