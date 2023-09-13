// global css stylesheet
import "@styles/globals.css";
// ant design stylesheet
import "antd/dist/reset.css";
import { Metadata } from "next";
import localFont from "next/font/local";
import LayoutFooter from "./layout/Footer";
import Navbar from "./layout/Navbar";
import Providers from "./providers";

const gilroy = localFont({
  src: "./fonts/Gilroy-Regular.ttf",
  weight: "400",
  variable: "--font-gilory",
  preload: true,
  style: "normal",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Blue",
    default: "Blue",
  },
  description:
    "Receive and make payments easily with Blue, you can make payments seamlessly, request and receive money, all on one platform.",
  applicationName: "Blue",
  authors: {
    url: "https://github.com/roman-developer-experts",
    name: "Roman Dev Experts",
  },
  keywords: ["Make payments", "Receive money", "Seamless payment", "Blue"],
  manifest: "https://paymeblue.com//site.webmanifest",
  icons: [
    {
      rel: "icon",
      url: "https://paymeblue.com//favicon-32x32.png",
    },
    {
      rel: "apple-touch-icon",
      url: "https://paymeblue.com//apple-touch-icon.png",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${gilroy.variable}`}>
        <Providers>
          <Navbar />
          {children}
          <LayoutFooter />
        </Providers>
      </body>
    </html>
  );
}
