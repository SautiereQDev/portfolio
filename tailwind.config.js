/** @type {import("tailwindcss").Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
        // mono: ["Roboto Mono", "monospace"],
        // serif: ["Merriweather", "serif"],
      },
      container: {
        center: true,
        // padding: "1rem",
      },
    },
  },
  plugins: [],
  corePlugins: {
    container: false,
  },
};
