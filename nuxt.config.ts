// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-monaco-editor'],
  runtimeConfig: {
    public: {
      BASE_URL: process.env.BASE_URL || 'http://localhost:3000',
    },
  },
})