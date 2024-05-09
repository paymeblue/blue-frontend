import { useEffect, useState } from "react";

export default function useMatchMedia() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Add a listener for changes in screen size
    const mediaQuery = window.matchMedia("(max-width: 900px");

    // set the initial value of the isMobile variable
    setIsMobile(mediaQuery.matches);

    // define a callback to function to handle changes in media query
    const handleMediaQuery = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    // add the callback function to the  media query
    mediaQuery.addEventListener("change", handleMediaQuery);
    return () => mediaQuery.removeEventListener("change", handleMediaQuery);
  }, []);
  return isMobile;
}
