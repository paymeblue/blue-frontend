const plugin = require("tailwindcss/plugin");
/** @type {import('tailwindcss').Config} */

module.exports = {
  important: true,
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4341CD",
        txt: "#1B1F28",
        txt2: "#666B7E",
        neutral: "#D1D5DB",
        bg: "#FEFEFE;",
        "body-text-1": "#EAEAFEBF",
        "body-text-2": "#32374E",
        "bright-blue": "#AAA9FF",
        "input-field": "#F7F7FA",
      },
      letterSpacing: {
        title: "-2%",
        text: "-1%",
      },
      fontFamily: {
        fraunces: ["var(--font-fraunces)"],
        satoshi: ["var(--font-satoshi)"],
        grotesque: ["var(--font-grotesque)"],
        avenir: ["var(--font-avenir)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        purple:
          "linear-gradient(106.92deg, #C4CFF8 -14.91%, #F9FAFF 59.7%, #BEBAE7 121.38%)",
        lilac:
          "linear-gradient(189.8deg, #F6F0FF -87.15%, rgba(246, 240, 255, 0) 149.62%)",
      },
      boxShadow: {
        shadow: "0px 3px 15px 0px #EAEAFF",
        light: "0px 3px 15px 0px #eaeaff69",
      },
      screens: {
        "mobile-md": "375px",
        "mobile-lg": "425px",
        tablet: "640px",
        laptop: "1024px",
        "laptop-md": "1440px",
        desktop: "1280px",
      },
    },
  },
  plugins: [
    plugin(function groupPeer({ addVariant }) {
      const pseudoVariants = [
        // ... Any other pseudo variants you want to support.
        // See https://github.com/tailwindlabs/tailwindcss/blob/6729524185b48c9e25af62fc2372911d66e7d1f0/src/corePlugins.js#L78
        "checked",
      ].map((variant) =>
        Array.isArray(variant) ? variant : [variant, `&:${variant}`]
      );

      for (const [variantName, state] of pseudoVariants) {
        addVariant(`group-peer-${variantName}`, (ctx) => {
          const result = typeof state === "function" ? state(ctx) : state;
          return result.replace(/&(\S+)/, ":merge(.peer)$1 ~ .group &");
        });
      }
    }),
  ],
};
