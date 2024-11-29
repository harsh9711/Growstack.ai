import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config = {
  important: true,
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{js,ts,tsx}",
    "./app/**/*.{js,ts,tsx}",
    "./src/**/*.{js,ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      screens: {
        "1.5xl": "1400px",
        "3xl": "1600px",
        "4xl": "120rem",
        ...defaultTheme.screens,
      },
      inset: {
        "-1.75rem": "-1.30rem",
        "-1.00rem": "-0.55rem",
      },
      spacing: {
        "1.75": "7px",
        "7.5": "1.875rem",
        "8.5": "2.125rem",
        "12.5": "3.125rem",
      },
      minWidth: {
        "20rem": "20rem",
      },
      maxWidth: {
        "7.5xl": "82.5rem",
        "8xl": "96rem",
      },
      colors: {
        "primary-green": "#034737",
        "primary-light-gray": "#F4F4F4",
        "primary-light-green": "#A9FF9B",
        "primary-black": "#14171B",
        "primary-neutral": "#343434",
        "primary-grey": "#918EA4",
        "bookmark-orange-0": "#FAAC70",
        "bookmark-orange-1": "#FAAC70",
        "bookmark-purple-0": "#BC94FF",
        "bookmark-purple-1": "#9F66FF",
        "bookmark-pink-0": "#FF759F",
        "bookmark-pink-1": "#FF196E",
        "bookmark-blue-0": "#39AFFD",
        "bookmark-blue-1": "#477FFF",
        "bookmark-red-0": "#FFA78F",
        "bookmark-red-1": "#F23E2C",
        "bookmark-green-0": "#9BF763",
        "bookmark-green-1": "#26AB5B",
        // background: linear-gradient(180deg, #BC94FF 0%, #9F66FF 100%);

        header: "hsl(var(--header))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        animation: {
          spin: "spin2 1s linear infinite",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2.5xl": "1.25rem",
        "4xl": "1.875rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        increaseWidth: {
          "0%": { width: "0" },
          "100%": { width: "100px" }, // Adjust the final width as needed
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        increaseWidth: "increaseWidth 2s forwards",
      },
      borderColor: {
        "custom-gray": "#EAEAEA",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
};

export default config;