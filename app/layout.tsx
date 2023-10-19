// global css stylesheet
import "@styles/globals.css";
// ant design stylesheet
import { Footer, Navbar } from "@layout/index";
import "antd/dist/reset.css";
import { Metadata } from "next";
import { gilroy } from "./fonts";
import Providers from "./providers";

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
    <html lang="en" className="scroll-smooth scroll-pt-20">
      <body className={`${gilroy.variable}`}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
