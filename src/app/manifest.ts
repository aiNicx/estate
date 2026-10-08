import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Marina d'Albori Estate",
    short_name: "Marina d'Albori",
    description:
      "An introduction to the waterfront estate at Marina d'Albori, Vietri sul Mare, on the Amalfi Coast.",
    start_url: "/en",
    display: "browser",
    background_color: "#f3efe6",
    theme_color: "#1b3a4a",
  };
}
