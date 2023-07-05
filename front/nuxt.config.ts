import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

export default defineNuxtConfig({
  extends: ['./apps/site', './apps/auth', './apps/app'],
  modules: [
    'nuxt-icon',
    '@pinia/nuxt',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/fontaine',
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt',
    '@nuxtjs/google-fonts'
  ],
  vite: {
    logLevel: 'info',
    resolve: {
      alias: {
        stream: 'stream-browserify'
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis' // fix nuxt3 global
        },
        plugins: [NodeGlobalsPolyfillPlugin()]
      }
    }
  },
  motion: {
    directives: {
      'pop-bottom': {
        initial: {
          scale: 0,
          opacity: 0,
          y: 100
        },
        visible: {
          scale: 1,
          opacity: 1,
          y: 0
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      gaId: process.env.GTM_TAG,
      gtmEnabled: process.env.IS_PROD === 'true'
    }
  },
  app: {
    head: {
      link: [
        {
          hid: 'icon',
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        }
      ]
    }
  },
  googleFonts: {
    prefetch: true,
    preconnect: true,
    families: {
      Lato: [100, 300, 400, 700, 900],
      Poppins: [
        100, 200, 300, 400, 500, 600, 700, 800, 900
      ]
    }
  },
  routeRules: {
    '/': { prerender: true },
    '/wallet': { prerender: true },
    '/auth': { prerender: false }
  }
})
