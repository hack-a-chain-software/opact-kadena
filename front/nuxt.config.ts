import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'

let ssr = false

if (process.env.NODE_ENV !== 'development') {
  ssr = true
}

export default defineNuxtConfig({
  ssr,
  extends: ['./apps/site'],
  modules: [
    'nuxt-icon',
    '@pinia/nuxt',
    '@nuxt/image-edge',
    '@vueuse/nuxt',
    '@nuxtjs/fontaine',
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt',
    '@nuxtjs/google-fonts'
  ],
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
      gaId: process.env.GTM_TAG,
      gtmEnabled: process.env.IS_PROD === 'true'
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
    '/receive': { prerender: false },
    '/app': { prerender: false },
    '/auth': { prerender: false }
  }
})
