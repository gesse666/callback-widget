// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: {
    optimizeDeps: {
      exclude: ['crypto'],
      noDiscovery: false
    },
    define: {
      global: 'globalThis'
    }
  },
  typescript: {
    typeCheck: true
  }
})
