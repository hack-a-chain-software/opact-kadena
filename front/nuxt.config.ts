import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

let ssr = false

if (process.env.NODE_ENV !== 'development') {
  ssr = true
}

export default defineNuxtConfig({
  ssr,
  modules: [
    'nuxt-icon',
    '@pinia/nuxt',
    '@cssninja/nuxt-toaster',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxtjs/fontaine',
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt',
    '@nuxtjs/google-fonts'
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
  image: {
    provider: 'ipx'
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
      // Booleans
      nftDisabled: true,
      faucetDisabled: true,
      gtmEnabled: process.env.IS_PROD === 'true',
      // opactSDKNetwork: process.env.OPACT_SDK_NETWORK,
      // nftDisabled: process.env.NFT_DISABLED === 'true',

      // Numbers
      gaId: process.env.GTM_TAG,

      // String
      opactSDKNetwork: 'kadena-testnet',
      relayUrl: 'wss://relay.walletconnect.com',
      projectId: '3974e0e0f91a102389b8cb3fc1a590a5'
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
    '/wallet': { prerender: true },
    '/tickets': { prerender: true },
    '/auth': { prerender: false },
    '/home': { prerender: false },
    '/faucet': { prerender: false },
    '/history': { prerender: false },
    '/invoice': { prerender: false },
    '/send/nft': { prerender: false },
    '/send/token': { prerender: false },
    '/receive/nft': { prerender: false },
    '/receive/token': { prerender: false }
  }
})
