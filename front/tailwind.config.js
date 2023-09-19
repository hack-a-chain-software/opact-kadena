const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './assets/**/*.{vue,js,css}',
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './server/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './node_modules/windplus/styles/**/*.{vue,js,css}',
    './node_modules/windplus/styles/*.{vue,js,css}',
    './node_modules/windplus/styles/main.css'
  ],

  darkMode: 'class',

  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: '0px 16px',
          xl: '0px 60px'
        }
      },

      fontFamily: {
        sans: [
          'Lato', ...defaultTheme.fontFamily.sans
        ],
        title: [
          'Poppins', ...defaultTheme.fontFamily.sans
        ]
      },

      backgroundImage: {
        'card-gradient': 'linear-gradient(181.92deg, #0D1116 5.93%, #202428 98.38%)',
        'inverted-card-gradient': 'linear-gradient(181.92deg, #202428 5.93%, #0D1116 98.38%)',
        'opact-gradient': 'linear-gradient(264.6deg, #AD51FF 12.18%, #1A92FF 91.42%)',
        'blue-gradient': 'linear-gradient(225deg, #1B6DFF 6.97%, #1A92FF 95.31%)',
        'purple-gradient': 'linear-gradient(225deg, #8050E4 6.97%, #AD51FF 95.31%)'
      },

      colors: {
        dark: {
          blue: '#060A0F'
        },

        blue: {
          300: '#1A92FF',
          400: '#1B6DFF',
          500: '#1D48FF',
          800: '#072540',
          950: '#060A0F'
        },

        purple: {
          300: '#AD51FF',
          500: '#8050E4',
          800: '#2A2468'
        },

        gray: {
          600: '#363B42',
          700: '#383B3F',
          800: '#202428',
          900: '#0E1319'
        },

        font: {
          1: '#FAFAFA',
          2: '#B8B8B8'
        },

        green: {
          500: '#38A169'
        }
      },

      fontSize: {
        giant: ['72px', '86.4px'],
        display: ['60px', '72px'],
        xxxl: ['48px', '57.6px'],
        xxl: ['36px', '43.2px'],
        xl: ['28px', '39.2px'],
        lg: ['24px', '33.6px'],
        md: ['22px', '30.8px'],
        sm: ['18px', '25.2px'],
        xs: ['16px', '22.4px'],
        xxs: ['14px', '19.6px'],
        xxxs: ['12px', '16.8px'],
        nano: ['8px', '9.6px']
      },

      fontWeight: {
        medium: 500,
        regular: 400,
        semibold: 700
      },

      screens: {
        xs: '520px',
        '2xl': '1440px'
      },

      minHeight: {
        screen: '100vh'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
}
