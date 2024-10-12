// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  srcDir: 'src/',
  imports: {
    autoImport: false,
  },
  // ignore: ['/src/pages/**/components/**'],
  modules: ['@nuxtjs/tailwindcss', 'nuxt-auth-utils', '@prisma/nuxt'],
  ssr: false,
  nitro: {
    experimental: {
      websocket: true,
    },
  },
  tailwindcss: {
    viewer: false,
    config: {

    }
  },
  prisma: {
    runMigration: false,
    installStudio: false,
  }
})