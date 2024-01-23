import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

let ssr = true

if (process.env.NODE_ENV !== 'development') {
  ssr = true
}

export default defineNuxtConfig({
  ssr,
  modules: [
    'nuxt-icon',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/fontaine',
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt',
    '@nuxtjs/google-fonts',
    '@cssninja/nuxt-toaster'
  ],
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  toaster: {
    installPlugin: false
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  vite: {
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'globalThis'
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true
          }) as any
        ]
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
      // Numbers
      GA_ID: process.env.GTM_TAG,

      // String
      SDK_NETWORK: process.env.SDK_NETWORK,

      WC_RELAYER: process.env.WC_RELAYER,
      WC_PROJECT_ID: process.env.WC_PROJECT_ID,

      // Booleans
      GTM_ENABLED: process.env.IS_PROD === 'true',
      NFT_DISABLED: process.env.NFT_DISABLED === 'true',
      FAUCET_DISABLED: process.env.FAUCET_DISABLED === 'true'
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
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
    '/auth': { prerender: true },
    '/faucet': { prerender: true },
    '/history': { prerender: true },
    '/send/nft': { prerender: true },
    '/send/token': { prerender: true },
    '/invoice/nft': { prerender: true },
    '/invoice/token': { prerender: true },
    '/receive/nft': { prerender: true },
    '/receive/token': { prerender: true }
  }
})
