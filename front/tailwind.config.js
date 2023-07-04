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
        'opact-gradient': 'linear-gradient(264.6deg, #AD51FF 12.18%, #1A92FF 91.42%)'
      },

      colors: {
        dark: {
          blue: '#060A0F'
        }
      },

      fontSize: {
        //
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
