/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#62C331",
      secondary: "#D968AF",
      greenSeaWeed: "#028090",
      blueQueen: "#456990",
      redFire: "#f45b69",
      base: "#e0d9d9",
    },
    fontFamily: {
      raleway: ["Raleway", "Century Gothic"],
    },
  },
  plugins: [],
};
