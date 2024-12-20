/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.2s ease-in-out',
        fadeOut: 'fadeOut 0.2s ease-in-out',
        shimmer: 'shimmer 1.5s infinite',
      },
      colors: {
        primary: {
          DEFAULT: '#FCAC1D', //// Buttons, Active State (Checkbox), Textfield border (Focus)
          100: '#FCE7C1', // Chip
          200: '#FFD690', // Floating Button
          300: '#B3B5D9',
          500: '#FCAC1D',
        },
        secondary: '#020865',
        gray: {
          DEFAULT: '#9E9E9E',
          100: '#F8F8F8',
          200: '#EEEEEE',
          300: '#E0E0E0',
          350: '#CCCCCC',
          400: '#BDBDBD',
          450: '#A6A6A6',
          500: '#9E9E9E',
          550: '#808080',
          600: '#707070',
          700: '#616161',
          750: '#52586F',
          800: '#323645',
          900: '#212121',
          1200: '#FFFFFF4D',
          1500: '#70707080',
        },
        opacity: {
          900: '#000000db',
        },
        green: {
          DEFAULT: 'green',
          200: '#E8FFE4',
          600: '#51B42E',
        },
        red: {
          DEFAULT: 'red',
          200: '#FEECEC',
          600: '#D31B1B',
          700: '#C10101',
        },
        seaBlue: {
          200: '#D6F1FF',
          600: '#006CA4',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        josefin: ['Josefin Sans', 'sans-serif'],
        veneer: ['Veneer', 'sans-serif'],
        quicksand: ['Quicksand', 'sans-serif'],
      },
      fontSize: {
        13: '13px',
        15: '15px',
        17: '17px',
      },
      zIndex: {
        dropdown: 50,
        navbar: 200,
        drawerMobile: 900,
        modal: 500,
        toast: 990,
        loader: 1000,
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        shimmer: {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        screens: {
          xs: '480px',
        },
      },
    },
  },
  plugins: [],
}
