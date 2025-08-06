/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      height: {
        // "operation-table": "calc(100vh - 274px)",
        // "operation-table-lg": "calc(100vh - 196px)",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "dark-mode",
      {
        "light-mode": {
          //!base color
          primary: "#214F85",
          "primary-focus": "#172E4A",
          "primary-content": "#FFFFFF",
          // primary: "#36A0EA",
          // "primary-focus": "#570df8",
          // "primary-content": "#ffffff",
          secondary: "#E9EDF2",
          "secondary-focus": "#bd0091",
          "secondary-content": "#36A0EA",

          accent: "#36A0EA",
          "accent-focus": "#570df8",
          "accent-content": "#ffffff",
          // accent: "#172E4A",
          // "accent-focus": "red",
          // "accent-content": "#FFFFFF",

          //!for bg or control
          neutral: "#FFFFFF", //*basic
          // "neutral-focus": "red",
          // "neutral-content": "red",//*default black
          // "base-content": "#FFFFFF",//*default black
          "base-100": "#EAF0F7", //*basic to dark
          "base-200": "#B9D3F0", //*dark
          "base-300": "#214F85", //*dark more

          //!alert
          info: "#214F85", //blue
          // success: "green",
          // warning: "yellow",
          // error: "red",
          "error-content": "#ffffff",
        },
      },
    ],
  },
};
