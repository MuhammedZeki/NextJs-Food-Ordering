/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary:"#ffbe33",
        secondary:"#222831"
      },
      fontFamily:{
        dancing :['var(--font-dancing-script)', "cursive"],
        sans :['var(--font-open-sans)', "serif"]
      },
      container:{
        screens:{
          xs:"375px",
          sm:"640px",
          md:"768px",
          lg:"1024px",
          xl:"1140px",
          "2xl":"1140px"
        },
      },      
      keyframes: {
        shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },
      },
      animation: {
        shine: 'shine 5s linear infinite',
      },
    },
  },
  plugins: [],
};
