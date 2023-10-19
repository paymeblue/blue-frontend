import { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Stay connected with us for all your needs!",
};

const Contact = dynamic(() => import("./contact-us"));
const ContactPage = () => {
  return (
    <Fragment>
      <Script
        src={process.env.CLOUDFLARE_TURNSTILE_CHALLENGE_URL}
        defer
        async
        strategy="lazyOnload"
      />
      <Contact />
    </Fragment>
  );
};

export default ContactPage;
