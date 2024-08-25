/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
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
