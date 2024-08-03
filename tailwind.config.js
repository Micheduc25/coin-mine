/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Add your custom colors here
        primary: {
          light: "#f5f5f5",
          dark: "#0b1d41",
        },
        secondary: {
          light: "#2cc2d0",
          dark: "#1b7780",
        },

        bluegray: "#16243f",
        "app-pink": "#fc639c",
      },

      fontSize: {
        "2xs": ".625rem",
        "3xs": ".5rem",
        "4xs": ".375rem",
      },
    },
  },
  plugins: [],
};
