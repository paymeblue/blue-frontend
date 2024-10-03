import { Metadata } from "next";
import Pilot from "./pilot";
import { Fragment } from "react";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Pilot Testers",
  description: `Becaome a Pilot tester`,
};

const PilotPage = () => (
  <Fragment>
    <Script
      src="https://challenges.cloudflare.com/turnstile/v0/api.js"
      defer
      async
      strategy="lazyOnload"
    />
    <Pilot />
  </Fragment>
);

export default PilotPage;
