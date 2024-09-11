import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"], // Enable dark mode with class strategy
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ], // Ensure all relevant paths are included
  prefix: "", // No prefix added to Tailwind classes
  theme: {
    container: {
      center: true, // Center the container
      padding: "2rem", // Set padding for the container
      screens: {
        "2xl": "1400px", // Set the max width for extra large screens
      },
    },
    extend: {
      inset: {
        '-1.75rem': '-1.30rem', // Custom inset values
        '-1.00rem': '-0.55rem',
      },
      spacing: {
        '1.75': '7px', // Custom spacing
      },
      minWidth: {
        '20rem': '20rem', // Custom minimum width
      },
      colors: {
        // Define custom colors
        "primary-green": "#034737",
        "primary-light-gray": "#F4F4F4",
        "primary-light-green": "#A9FF9B",
        "primary-black": "#14171B",
        "primary-neutral": "#343434",
        "primary-grey": "#918EA4",
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
        lg: "var(--radius)", // Custom large border radius
        md: "calc(var(--radius) - 2px)", // Custom medium border radius
        sm: "calc(var(--radius) - 4px)", // Custom small border radius
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite", // Blinking caret animation
      },
      borderColor: {
        'custom-gray': '#EAEAEA', // Custom border color
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // Animation plugin
    require("@tailwindcss/typography"), // Typography plugin
  ],
};

export default config;
