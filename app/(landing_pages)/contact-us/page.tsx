import { Metadata } from "next";
import Script from "next/script";
import { Fragment } from "react";
import Contact from "./contact-us";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Stay connected with us for all your needs!",
};

const ContactPage = () => {
  return (
    <Fragment>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        defer
        async
        strategy="lazyOnload"
      />
      <Contact />
    </Fragment>
  );
};

export default ContactPage;
