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
      itemSelectedColor: "white",
      horizontalItemSelectedColor: "white",
      itemHoverBg: "transparent",
      itemBg: "transparent",
      itemSelectedBg: "#AAA9FF",
      boxShadowSecondary: "none",
      itemColor: "white",
      horizontalItemSelectedBg: "#AAA9FF",
    },
    Input: {
      colorBorder: "transparent",
    },
  },
};

export default theme;
