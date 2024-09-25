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
        light: "#f0e9d1",
        // Custom Light
        lightPrimary: {
          DEFAULT: "#84653c",
          foreground: "#fff",
        },
        // Custom Light
        lightSecondary: {
          DEFAULT: "#30333b",
          foreground: "hsl(var(--secondary-foreground))",
        },
        // Custom Light
        lightMuted: {
          DEFAULT: "#1e1e25",
          foreground: "hsl(var(--muted-foreground))",
        },
        // Custom Light
        lightAccent: {
          DEFAULT: "#bc915e",
          foreground: "hsl(var(--accent-foreground))",
        },

        // Custom Dark
        dark: "#3b261b",
        darkPrimary: {
          DEFAULT: "#ecdcb9",
          foreground: "#3b261b",
        },
        // Custom Dark
        darkSecondary: {
          DEFAULT: "#84653c",
          foreground: "hsl(var(--secondary-foreground))",
        },
        // Custom Dark
        darkAccent: {
          DEFAULT: "#dcc371",
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
