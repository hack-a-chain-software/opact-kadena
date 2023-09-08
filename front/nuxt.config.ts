import { resolve } from "path";
import inject from '@rollup/plugin-inject'
import stdLibBrowser from 'node-stdlib-browser'

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
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        ...stdLibBrowser
      }
    },
    plugins: [
      {
        ...inject({
          global: [
            require.resolve("node-stdlib-browser/helpers/esbuild/shim"),
            "global"
          ],
          process: [
            require.resolve("node-stdlib-browser/helpers/esbuild/shim"),
            "process"
          ],
          Buffer: [
            require.resolve("node-stdlib-browser/helpers/esbuild/shim"),
            "Buffer"
          ]
        }),
        enforce: "post"
      }
    ],
    build: {
      target: ["esNext"],
      rollupOptions: {
        output: {
          format: "es",
          // dir: 'dist', // Diretório de saída
          // entryFileNames: '[name].js', // Nome do arquivo de saída
          // chunkFileNames: '[name].js', // Nome do arquivo de chunk
        },
        // input: {
        //   main: './src/main.tsx', // Caminho para o arquivo principal do seu aplicativo
        //   worker: './src/sw/worker.ts' // Caminho para o arquivo do worker
        // },
      }
    },
    optimizeDeps: {
      include: ["buffer", "process"]
    },
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
    '/tickets': { prerender: true },
    '/receive': { prerender: false },
    '/app': { prerender: false },
    '/auth': { prerender: false }
  }
})
