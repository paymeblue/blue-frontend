"use client";
import useAppRedirect from "@hooks/useAppRedirect";

const RedirectPage = () => {
  useAppRedirect({
    iosApp: "paymeblue://",
    iosAppStore: "https://apps.apple.com/ng/app/paymeblue/id6452384963",
    android: {
      scheme: "paymeblue",
      package: "com.roman_dev.blueMobile",
      fallback:
        "https://play.google.com/store/apps/details?id=com.roman_dev.blueMobile",
    },
    overallFallback: "https://paymeblue.com",
  });

  return null; // No UI is required since this page handles redirects
};

export default RedirectPage;
