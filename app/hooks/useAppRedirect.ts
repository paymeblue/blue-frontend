import { useEffect, useState, useRef } from "react";

interface AndroidOptions {
  scheme: string;
  host?: string;
  package: string;
  action?: string;
  category?: string;
  component?: string;
  fallback?: string;
}

interface RedirectOptions {
  iosApp?: string;
  iosAppStore?: string;
  android?: AndroidOptions;
  overallFallback?: string;
}

const useAppRedirect = (options: RedirectOptions) => {
  const [queryString, setQueryString] = useState<
    Record<string, string | string[]>
  >({});
  const [browserMovedToBackground, setBrowserMovedToBackground] =
    useState(false);
  const redirected = useRef(false); // Prevent multiple redirections

  // Parse the query string and set state
  useEffect(() => {
    const parseQueryString = () => {
      const search = window.location.search.split(/[\&\?]/g);
      const query: Record<string, string | string[]> = {};
      search.forEach((param) => {
        if (!param) return;
        const [key, value] = param.split("=");
        query[key] =
          query[key] !== undefined
            ? [value || ""].concat(query[key] as string | string[])
            : value || "";
      });
      setQueryString(query);
    };

    parseQueryString();
  }, []);

  // Visibility change listener
  useEffect(() => {
    const handleVisibilityChange = () => {
      setBrowserMovedToBackground(
        document.visibilityState === "hidden" ||
          // @ts-ignore
          document.visibilityState === "unloaded"
      );
    };

    const handleBlur = () => setBrowserMovedToBackground(true);

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  const tryToOpenInMultiplePhases = (urls: string[]) => {
    if (redirected.current) return; // Prevent multiple redirections
    redirected.current = true;

    setBrowserMovedToBackground(false);
    let currentIndex = 0;
    let redirectTime = new Date();
    window.location.href = urls[currentIndex++];

    const next = () => {
      if (urls.length > currentIndex) {
        setTimeout(() => {
          if (browserMovedToBackground) {
            console.log(
              "Browser moved to the background, assuming the app opened"
            );
            return;
          }

          if (new Date().getTime() - redirectTime.getTime() > 3000) {
            console.log("Enough time has passed, app likely opened");
          } else {
            redirectTime = new Date();
            window.location.href = urls[currentIndex++];
            next();
          }
        }, 10);
      }
    };

    next();
  };

  useEffect(() => {
    if (redirected.current) return; // Skip if already redirected

    const hasIos = !!(options.iosApp || options.iosAppStore);
    const hasAndroid = !!options.android;
    const hasOverallFallback = !!options.overallFallback;

    if (hasIos && /iP(hone|ad|od)/.test(navigator.userAgent)) {
      const urls: string[] = [];
      if (options.iosApp) urls.push(options.iosApp);
      if (options.iosAppStore) urls.push(options.iosAppStore);
      tryToOpenInMultiplePhases(urls);
    } else if (hasAndroid && /Android/.test(navigator.userAgent)) {
      const {
        scheme,
        host,
        package: packageName,
        action,
        category,
        component,
        fallback,
      } = options.android!;
      const intentUrl = `intent://${host}#Intent;scheme=${encodeURIComponent(scheme)};package=${encodeURIComponent(packageName)};${action ? `action=${encodeURIComponent(action)};` : ""}${category ? `category=${encodeURIComponent(category)};` : ""}${component ? `component=${encodeURIComponent(component)};` : ""}${fallback ? `S.browser_fallback_url=${encodeURIComponent(fallback)};` : ""}end`;

      const anchor = document.createElement("a");
      document.body.appendChild(anchor);
      anchor.href = intentUrl;
      if (anchor.click) {
        anchor.click();
      } else {
        window.location.href = intentUrl;
      }
    } else if (hasOverallFallback) {
      window.location.href = options.overallFallback || "";
    } else {
      console.log(
        "Unknown platform and no overallFallback URL, no action taken"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, browserMovedToBackground]);

  return queryString;
};

export default useAppRedirect;
