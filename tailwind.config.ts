import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        'neon-lime': '#CCFF00',
        'tomato': {
          50: '#feebe6',
          100: '#fed6cd',
          200: '#fcad9c',
          300: '#fb846a',
          400: '#fa5c38',
          500: '#ff5500',
          600: '#c72905',
          700: '#951e04',
          800: '#631403',
          900: '#320a01',
          950: '#230701',
        },
        'slate-blue': {
          50: '#eceafa',
          100: '#dad5f6',
          200: '#b4acec',
          300: '#8f82e3',
          400: '#6a59d9',
          500: '#694aff',
          600: '#3726a6',
          700: '#291c7d',
          800: '#1b1353',
          900: '#0e092a',
          950: '#0a071d',
        },
        'cloudy-sky': {
          50: '#e7f2fd',
          100: '#cfe5fc',
          200: '#9fcbf9',
          300: '#6fb0f6',
          400: '#3f96f3',
          500: '#ff80ee',
          600: '#0c63c0',
          700: '#094a90',
          800: '#063260',
          900: '#031930',
          950: '#021122',
        },
        'bright-gold': {
          50: '#fefbe6',
          100: '#fdf8ce',
          200: '#fbf09d',
          300: '#fae96b',
          400: '#f8e23a',
          500: '#f6da09',
          600: '#c5af07',
          700: '#948305',
          800: '#625704',
          900: '#312c02',
          950: '#221f01',
        },
      },
    },
  },
  plugins: [],

};


export default config;


