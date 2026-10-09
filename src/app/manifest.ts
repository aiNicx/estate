import type { MetadataRoute } from "next";
import { brochureCopy } from "@/content/brochure";

export default function manifest(): MetadataRoute.Manifest {
  const { meta } = brochureCopy("en");
  return {
    name: meta.siteName,
    short_name: meta.siteName,
    description: meta.description,
    start_url: "/en",
    display: "browser",
    background_color: "#f3efe6",
    theme_color: "#1b3a4a",
  };
}
