import typescript from "@rollup/plugin-typescript";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  srcDir: 'src/',
  // ignore: ['/src/pages/**/components/**'],
  modules: ['@nuxtjs/tailwindcss', 'nuxt-auth-utils'],
  ssr: false,
  nitro: {
    rollupConfig: {
      // @ts-ignore
      plugins: [
        typescript({
          include: ['src/server/**/*.ts'],
          tsconfig: 'src/server/tsconfig.json',
        })
      ],
    },
    experimental: {
      websocket: true,
    },
  },
  tailwindcss: {
    viewer: false,
  },
})