import Spinner from "@shared/Spinner";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Script from "next/script";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Contact us",
  description: "Stay connected with us for all your needs!",
};

const Contact = dynamic(() => import("./contact-us"), {
  loading: () => <Spinner />,
});
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
