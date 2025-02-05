/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: { 
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        green: {
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        border: { 
          dark: 'var(--border-dark)',
          light: 'var(--border-light)', 
        },
      },
      fontWeight:{
        bold: 500, 
      },
      fontSize: {
        xs: ".75rem",
        sm: ".875rem",
        tiny: ".875rem",
        base: ".940rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": ["2.25rem", "3.2rem"],
        "5xl": ["3rem", "4rem"],
        "6xl": ["4rem", "1rem"],
        "7xl": ["5rem", "1rem"],
        "2xl-responsive": ["1.5rem", { lineHeight: "2rem" }],
        "3xl-responsive": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl-responsive": ["2.25rem", { lineHeight: "2.75rem" }],
        "5xl-responsive": ["3rem", { lineHeight: "3.5rem" }],
        "6xl-responsive": ["4rem", { lineHeight: "4.5rem" }],
        "7xl-responsive": ["5rem", { lineHeight: "5.5rem" }],
      },
    },
    screens: { 
      xs:"375px",
      sm: "575px",
      md: "768px",
      lg: "991px",
      xl: "1200px",
      xxl: "1400px",
    }, 
  },
  plugins: [],
};
