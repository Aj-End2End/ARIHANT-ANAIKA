/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontSize: {
        "custom-size": "16px",
      },
      fontWeight: {
        "custom-weight": "400",
      },
      lineHeight: {
        "custom-line-height": "1.4",
      },
      fontFamily: {
        "custom-font": ["Noto Sans", "sans-serif"],
      },
      scale: {
        104: "1.04",
      },
    },
  },
  variants: {
    extend: {
      scale: ["group-hover"],
      filter: ["group-hover"],
    },
  },
  plugins: [],
};
