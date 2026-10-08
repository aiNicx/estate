/* eslint-disable @next/next/no-img-element -- ImageResponse renders plain image elements. */
import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { availableImage } from "@/content/images";
import { parseLocale } from "@/lib/i18n";

export const alt = "Marina d'Albori Estate, Vietri sul Mare, Amalfi Coast";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  const locale = parseLocale(raw);
  const photo = availableImage("hero-cove-aerial");
  const bytes = photo ? await readFile(path.join(process.cwd(), "public", photo.src.slice(1))) : null;
  const photoSrc = bytes ? `data:image/jpeg;base64,${bytes.toString("base64")}` : null;

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#f3efe6", color: "#1c1914" }}>
      <div style={{ width: photoSrc ? 640 : 1200, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 48px" }}>
        <div style={{ fontSize: 18, letterSpacing: 4, color: "#8b3e2a" }}>{locale === "it" ? "PROPRIETÀ FRONTE MARE" : "WATERFRONT ESTATE"}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 64, lineHeight: 1.05 }}>{"Marina d'Albori"}</div>
          <div style={{ fontSize: 25, color: "#4e4840" }}>{`Vietri sul Mare · ${locale === "it" ? "Costiera Amalfitana" : "Amalfi Coast"}`}</div>
        </div>
        <div style={{ fontSize: 20, color: "#1b3a4a" }}>{locale === "it" ? "Sette unità · Terrazze sul mare" : "Seven units · Seafront terraces"}</div>
      </div>
      {photoSrc ? <img src={photoSrc} alt="" width={560} height={630} style={{ objectFit: "cover", objectPosition: "50% 65%" }} /> : null}
    </div>,
    size,
  );
}
