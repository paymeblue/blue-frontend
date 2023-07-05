import { useEffect, useState } from "react";

const useNavBg = () => {
  const [clientWindowHeight, setClientWindowHeight] = useState<number>(0);
  const [bgColor, setBgColor] = useState<number>(0);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    setClientWindowHeight(window.scrollY);
  };

  useEffect(() => {
    const backgroundTransparentVar = clientWindowHeight / 600;

    if (backgroundTransparentVar < 1) {
      setBgColor(backgroundTransparentVar);
    }
  }, [clientWindowHeight]);
  return bgColor;
};

export default useNavBg;
