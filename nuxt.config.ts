// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  ssr: process.env.SSR !== 'false',

  runtimeConfig: {
    public: {
      ExperienceApiUrl: process.env.NUXT_EXPERIENCE_API_URL,
      AuthApiUrl: process.env.NUXT_AUTH_API_URL
    }
  },

  modules: [
    '@pinia/nuxt',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    resolve: {
      alias: {
        '@models': '/models',
        '@stores': '/stores',
        '@assets': '/assets',
        '@components': '/components',
        '@utils': '/utils',
        '@services': '/services',
        '@plugins': '/plugins'
      },
    }
  },
})