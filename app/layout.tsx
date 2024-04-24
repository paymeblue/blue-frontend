// global css stylesheet
import "@styles/globals.css";
// ant design stylesheet
import "antd/dist/reset.css";
import { Metadata } from "next";
import { avenir, fraunces, grotesque, satoshi } from "./fonts";
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <body
        className={`${fraunces.variable} ${satoshi.variable} ${avenir.variable} ${grotesque.variable} ${grotesque.className}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
