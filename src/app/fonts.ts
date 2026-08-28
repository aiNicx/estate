import { Fraunces, Outfit } from "next/font/google";

export const displayFont = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
});

export const sansFont = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const fontClassName = `${displayFont.variable} ${sansFont.variable}`;
