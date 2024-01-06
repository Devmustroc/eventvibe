import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite/**/*.js',
    "./node_modules/flowbite-react/lib/**/*.js",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        brand_primary: '#00FAF2',
        brand_secondary: '#51176E',
        brand_gray: '#3a0ca3',
        brand_light: '#EAF2EF',
        brand_white: '#E6E3EF',
        back_ground: '#DEEFE7',
      },
      scrollbar: ['dark'],
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
      require('tailwind-scrollbar'),
      require('flowbite/plugin')
  ],
}
export default config
