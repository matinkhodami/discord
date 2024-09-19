import { withUt } from "uploadthing/tw";
 
export default withUt({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        foreground: "hsl(var(--foreground))",
        gray: "hsl(var(--gray))",

        // Custom Light
        light: "#F7F7F7",
        // Custom Light
        lightPrimary: {
          DEFAULT: "#FF971D",
          foreground: "#fff",
        },
        // Custom Light
        lightSecondary: {
          DEFAULT: "#FFE8D6",
          foreground: "hsl(var(--secondary-foreground))",
        },
        // Custom Light
        lightMuted: {
          DEFAULT: "#F6F6F6",
          foreground: "hsl(var(--muted-foreground))",
        },
        // Custom Dark
        dark: "#222831",
        darkPrimary: {
          DEFAULT: "#FD7014",
          foreground: "#fff",
        },
        // Custom Dark
        darkSecondary: {
          DEFAULT: "#393E46",
          foreground: "hsl(var(--secondary-foreground))",
        },
        // Custom Dark
        darkMuted: {
          DEFAULT: "#EEEEEE",
          foreground: "hsl(var(--muted-foreground))",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
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
});
