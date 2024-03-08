import { ThemeConfig } from "antd";
import { satoshi } from "app/fonts";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#4341CD",
    fontFamily: satoshi.style.fontFamily,
    fontWeightStrong: 400,
    fontSize: 18,
  },
  components: {
    Menu: {
      itemBg: "transparent",
      itemSelectedBg: "transparent",
      boxShadowSecondary: "none",
      itemColor: "#4341CD",
    },
    Input: {
      colorBorder: "transparent",
    },
    Tabs: {
      cardBg: "white",
      colorBgContainer: "#4341CD",
      itemSelectedColor: "white",
      itemColor: "#232949",
      colorBorderSecondary: "transparent",
    },
    Segmented: {
      trackPadding: 4,
      controlHeight: 50,
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
