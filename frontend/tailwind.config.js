/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
        boxShadow: {
            nav: '0px 6px 15px 0px #404F680D'
        },
        screens: {
            xs: '540px'
        }
    },
  },
  plugins: [],
}

