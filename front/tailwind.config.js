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
        '6xl-poppins': [
          '54px', {
            lineHeight: '70.2px',
            letterSpacing: '2%',
            fontWeight: '700'
          }
        ],

        '5xl-poppins-2xl': [
          '54px', {
            lineHeight: '64.8px',
            fontWeight: '600'
          }
        ],

        '5xl-poppins-xl': [
          '50px', {
            lineHeight: '60px',
            letterSpacing: '2%',
            fontWeight: '600'
          }
        ],

        '5xl-poppins-md': [
          '48px', {
            lineHeight: '62.4px',
            letterSpacing: '2%',
            fontWeight: '700'
          }
        ],

        '4xl-poppins-md': [
          '48px', {
            lineHeight: '57.6px',
            letterSpacing: '2%',
            fontWeight: '600'
          }
        ],

        '3xl-poppins-lg': [
          '40px', {
            lineHeight: '60px',
            letterSpacing: '2%',
            fontWeight: '600'
          }
        ],

        '3xl-poppins-md': [
          '32px', {
            lineHeight: '48px',
            fontWeight: '600'
          }
        ],

        'base-poppins': [
          '16px', {
            lineHeight: '20px',
            fontWeight: '500'
          }
        ],

        base: [
          '16px', {
            lineHeight: '24px',
            letterSpacing: '6%',
            fontWeight: '600'
          }
        ],

        lg: [
          '20px', {
            lineHeight: '30px',
            letterSpacing: '6%',
            fontWeight: '600'
          }
        ],

        '4xl-poppins': [
          '42px', {
            lineHeight: '63px',
            fontWeight: '600'
          }
        ],

        '3xl-poppins-xs': [
          '32px', {
            lineHeight: '41.6px',
            letterSpacing: '2%',
            fontWeight: '700'
          }
        ],

        'sm-hero': [
          '14px', {
            lineHeight: '21px',
            fontWeight: '400'
          }
        ],

        sm: [
          '14px', {
            lineHeight: '21px',
            fontWeight: '400'
          }
        ],

        xs: [
          '12px', {
            lineHeight: '20px',
            fontWeight: '500'
          }
        ],

        'xs-poppins': [
          '12px', {
            lineHeight: '18px',
            fontWeight: '500'
          }
        ],

        'lg-xs': [
          '18px', {
            lineHeight: '27px',
            fontWeight: '500'
          }
        ],

        '2xl-poppins': [
          '24px', {
            lineHeight: '36px',
            letterSpacing: '-3%',
            fontWeight: '500'
          }
        ],

        'base-xs': [
          '16px', {
            lineHeight: '24px',
            fontWeight: '500'
          }
        ],

        'sm-poppins': [
          '14px', {
            lineHeight: '20px',
            fontWeight: '500'
          }
        ]
      },

      screens: {
        xs: '520px'
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
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
}
