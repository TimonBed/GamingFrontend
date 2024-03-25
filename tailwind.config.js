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
        'brandtext': '#e7e9ee',
        brandgray: {
          '100': '#F8F8F8',
          '200': '#E0E0E0',
          '300': '#C8C8C8',
          '400': '#888888',
          '500': '#707070',
          '600': '#505050',
          '700': '#383838',
          '750': '#303030',
          '800': '#282828',
          '850': '#1C1C1C',
          '900': '#101010',
        }
      },
  },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

