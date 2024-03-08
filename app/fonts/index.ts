import { Fraunces } from "next/font/google";
import localFont from "next/font/local";

export const fraunces = Fraunces({
  weight: "variable",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});
export const gilroy = localFont({
  src: "./gilroy/Gilroy-Medium.ttf",
  weight: "400",
  display: "swap",
  variable: "--font-gilory",
  preload: true,
  style: "normal",
});

export const satoshi = localFont({
  src: "./Satoshi/Fonts/WEB/fonts/Satoshi-Variable.ttf",
  weight: "variable",
  display: "swap",
  variable: "--font-satoshi",
  preload: true,
  style: "normal",
});
