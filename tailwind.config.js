/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blur: {
          '0%': { filter: "blur(10px)" },
          '50%':{ filter: "blur(20px)" },
          '100%': { filter: "blur(10px)" },
        }
      },
      animation: {
        blur: 'blur 2s linear infinite',
      }
    },
  },
  plugins: [],
}