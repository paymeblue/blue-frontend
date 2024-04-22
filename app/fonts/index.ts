import localFont from "next/font/local";

const fraunces = localFont({
  src: "./Fraunces/Fraunces-Italic-VariableFont_SOFT,WONK,opsz,wght.ttf",
  weight: "variable",
  display: "swap",
  variable: "--font-fraunces",
  preload: true,
  style: "normal",
});
const satoshi = localFont({
  src: "./Satoshi/Fonts/WEB/fonts/Satoshi-Variable.ttf",
  weight: "variable",
  display: "swap",
  variable: "--font-satoshi",
  preload: true,
  style: "normal",
});

const avenir = localFont({
  src: "./Avenir Next.ttf",
  display: "swap",
  weight: "variable",
  variable: "--font-avenir",
  preload: true,
  style: "normal",
});
const grotesque = localFont({
  src: [
    {
      path: "./Basis Grotesque PRO Font Family/BasisGrotesqueArabicPro-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./Basis Grotesque PRO Font Family/BasisGrotesqueArabicPro-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Basis Grotesque PRO Font Family/BasisGrotesqueArabicPro-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Basis Grotesque PRO Font Family/BasisGrotesqueArabicPro-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Basis Grotesque PRO Font Family/BasisGrotesqueArabicPro-Black.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  weight: "variable",
  display: "swap",
  variable: "--font-grotesque",
  preload: true,
  style: "normal",
});
export { avenir, fraunces, grotesque, satoshi };
