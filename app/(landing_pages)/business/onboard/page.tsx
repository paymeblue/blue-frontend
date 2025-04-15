import dynamic from "next/dynamic";
import Script from "next/script";
import { Fragment } from "react";

// Dynamically import the BusinessPilot component with SSR disabled
// to avoid hydration issues with client components
const BusinessOnboardingForm = dynamic(() => import("./onboard"), {
  ssr: false,
});

export const metadata = {
  title: "Blue Business Onboarding | Blue App",
  description:
    "Join the Blue Business Network - Nigeria's new way to receive payments, manage cash flow, and grow smarter.",
  openGraph: {
    title: "Blue Business Onboarding | Blue App",
    description:
      "Join the Blue Business Network - Nigeria's new way to receive payments, manage cash flow, and grow smarter.",
    type: "website",
    locale: "en_US",
    url: "https://www.blueapp.africa/business/pilot",
  },
};

const OnboardPage = () => {
  return (
    <Fragment>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        defer
        async
        strategy="lazyOnload"
      />
      <BusinessOnboardingForm />
    </Fragment>
  );
};

export default OnboardPage;
