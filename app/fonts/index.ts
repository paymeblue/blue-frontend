import localFont from "next/font/local";

export const gilroy = localFont({
  src: "./gilroy/Gilroy-Medium.ttf",
  weight: "400",
  display: "swap",
  variable: "--font-gilory",
  preload: true,
  style: "normal",
});
