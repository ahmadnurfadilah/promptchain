const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // darkMode: ["class"],
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./app/**/*.{js,jsx}", "./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        dark: "#222222",
        lime: "#DEECA3",
        primary: {
          DEFAULT: "#1b4a58",
          50: "#d9f3ff",
          100: "#badce7",
          200: "#9ac2d0",
          300: "#78a8b8",
          400: "#5e93a6",
          500: "#438094",
          600: "#377183",
          700: "#285d6d",
          800: "#1b4a58",
          900: "#073541",
        },
        danger: colors.red,
        success: colors.green,
        warning: colors.amber,
      },
      keyframes: {
        updown: {
          "0%, 100%": { transform: "translateY(-10px)" },
          "50%": { transform: "translateY(10px)" },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        updown: "updown 3s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
