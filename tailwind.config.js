/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      customfocus : {
        'border-color': '#1668e3',
        'box-shadow': '0 0 0 2px rgba(22, 104, 227, 0.5)',/* Adjust shadow as needed */
        'outline': 'none',
      }
    },
  },
  plugins: [],
}

