/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  blocklist: ['./src/ComponentForTheMarkdown.tsx'],
  darkMode: "class",
  theme: {
    extend: {
      backgroundColor: ['dark'],
      borderColor: ['dark'],
      textColor: ['dark'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
