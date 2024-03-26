import { ThemeConfig } from "antd";
import { satoshi } from "app/fonts";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#4341CD",
    fontFamily: satoshi.style.fontFamily,
  },
  components: {
    Input: {
      colorBorder: "transparent",
    },
    Menu: {
      itemBg: "transparent",
      itemSelectedBg: "transparent",
      boxShadowSecondary: "none",
      itemColor: "#4341CD",
    },
    Segmented: {
      trackPadding: 8,
      controlHeight: 65,
      trackBg: "white",
      itemColor: "#232949",
      itemSelectedColor: "white",
      itemSelectedBg: "#4341CD",
      itemHoverBg: "#4341CD10",
      motionDurationMid: "0.1s",
      motionDurationSlow: "0.2s",
    },
  },
};

export default theme;
