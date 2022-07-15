module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: { min: "300px", max: "1000px" },
      lg: { min: "1000px" },
    },
    extend: {},
  },
  plugins: [],
};
