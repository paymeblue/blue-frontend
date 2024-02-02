import localFont from "next/font/local";

export const gilroy = localFont({
  src: "./gilroy/Gilroy-Medium.ttf",
  weight: "400",
  display: "swap",
  variable: "--font-gilory",
  preload: true,
  style: "normal",
});

export const satoshi = localFont({
  src: [
    {
      path: "./Satoshi/Fonts/WEB/fonts/Satoshi-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Satoshi/Fonts/WEB/fonts/Satoshi-Medium.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  weight: "400",
  display: "swap",
  variable: "--font-satoshi",
  preload: true,
  style: "normal",
});
