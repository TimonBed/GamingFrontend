/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brandprimary': '#2f5bac',
        'brandprimaryhover': '#6489ce',
        'brandprimaryactive': '#1f3e7c',
        'brandprimaryfocus': '#1f3e7c',
        'brandtext': '#e7e9ee'
      },
  },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

