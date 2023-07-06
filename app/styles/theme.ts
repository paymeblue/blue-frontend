import localFont from "next/font/local";

const gilroy = localFont({
  src: "../fonts/Gilroy-Regular.ttf",
  weight: "400",
  variable: "--font-gilory",
  preload: true,
  style: "normal",
});

const theme = {
  token: {
    colorPrimary: "#4341CD",
    fontFamily: gilroy.style.fontFamily,
    fontWeightStrong: 500,
    fontSize: 18,
  },
  components: {
    Menu: {
      itemBg: "transparent",
      colorItemBgSelected: "transparent",
      boxShadowSecondary: "none",
      itemColor: "#4341CD",
    },
    Input: {
      colorBorder: "transparent",
    },
  },
};

export default theme;
