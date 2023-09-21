// import stdLibBrowser from 'node-stdlib-browser'
// import replace from '@rollup/plugin-replace'
// import { existsSync, readFileSync } from "node:fs"
import { nodePolyfills } from 'vite-plugin-node-polyfills'
// import nodePolyfills from 'vite-plugin-node-stdlib-browser'
// import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
// import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
// import inject from '@rollup/plugin-inject'

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
    // vue: {
    //   script: {
    //     fs: {
    //       fileExists(file: string) {
    //         return existsSync(file);
    //       },
    //       readFile(file: string) {
    //         return readFileSync(file, "utf-8");
    //       },
    //     },
    //   },
    // },
    plugins: [
      nodePolyfills({
        // globals: {
        //   Buffer: true, // can also be 'build', 'dev', or false
        //   global: true,
        //   process: true,
        // },
        // include: ['fs']
        overrides: {
          // Since `fs` is not supported in browsers, we can use the `memfs` package to polyfill it.
          fs: 'memfs',
        }
      }),
    ],
    define: {
      "process.env": {},
    },
    // optimizeDeps: {
    //   include: ["buffer", "process"],
    //   esbuildOptions: {
    //     define: {
    //       global: 'globalThis'
    //     },
    //   }
    // },
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
