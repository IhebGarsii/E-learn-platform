/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Pacifico: ["Pacifico", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },

      backgroundImage: {
        "custom-gradient":
          "linear-gradient(90deg, rgba(44, 177, 230, 1) 0%, rgba(141, 224, 212, 1) 79%, rgba(255, 255, 255, 1) 100%)",
        "custom-gradient-2":
          "linear-gradient(90deg,rgba(28, 21, 212, 1) 0%, rgba(109, 171, 209, 1) 94%)",
        "footer-black":
          "linear-gradient(90deg,rgba(0, 0, 10, 1) 0%, rgba(79, 102, 105, 1) 97%);",
      },

      colors: {
        "dark-purple": "#081A51",
        "light-white": "rgba(255,255,255,0.17)",
        "dark-blue": "#4f46e5",
        "crayola-blue": "#1F75FE",
      },
    },
  },
  plugins: [],
};
