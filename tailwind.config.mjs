/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
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
      colors: {
        "neon-pink": "hsl(330, 100%, 50%)",
        "lime-mint-green": "hsl(150, 90%, 58%)", // Complementary to neon-pink
        "light-pink": "hsl(330, 100%, 70%)", // Lighter shade for backgrounds
        "dark-pink": "hsl(330, 100%, 30%)", // Darker shade for backgrounds
        "red-pink": "hsl(350, 100%, 50%)", // Analogous color
        magenta: "hsl(310, 100%, 50%)", // Analogous color
        "deep-blue": "hsl(210, 100%, 30%)", // Complements Lime Mint Green
        "dark-cyan": "hsl(180, 100%, 30%)", // Complements Lime Mint Green
        "rich-purple": "hsl(270, 90%, 60%)",
        "neon-green": "hsl(120, 100%, 50%)",
        "electric-blue": "hsl(190, 100%, 70%)",
        "neon-purple": "hsl(280, 100%, 50%)",
        "neon-red": "hsl(0, 100%, 50%)",
        "bright-yellow": "hsl(60, 70%, 50%)",
        turquoise: "hsl(175, 100%, 41%)",
        "darken-pink": "hsl(330, 0%, 50%)",
        "vibrant-orange": "hsl(30, 100%, 50%)",
        "dark-purple": "hsl(270, 50%, 25%)",
        "dark-violet": "hsl(280, 60%, 30%)",

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
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

