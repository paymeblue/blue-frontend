import { ThemeConfig } from "antd";
import { gilroy } from "app/fonts";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#4341CD",
    fontFamily: gilroy.style.fontFamily,
    fontWeightStrong: 500,
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
  },
};

export default theme;
