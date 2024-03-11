import { Fraunces } from "next/font/google";
import localFont from "next/font/local";

export const fraunces = Fraunces({
  weight: "300",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

export const satoshi = localFont({
  src: "./Satoshi/Fonts/WEB/fonts/Satoshi-Variable.ttf",
  weight: "variable",
  display: "swap",
  variable: "--font-satoshi",
  preload: true,
  style: "normal",
});
