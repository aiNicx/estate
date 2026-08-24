import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Marina d'Albori Estate",
    short_name: "Marina d'Albori",
    description:
      "Waterfront estate for sale in Marina d'Albori, Vietri sul Mare, Amalfi Coast.",
    start_url: "/en",
    display: "browser",
    background_color: "#f3efe6",
    theme_color: "#1b3a4a",
  };
}
