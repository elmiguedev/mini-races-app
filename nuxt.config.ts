import rollupPluginTs from "@rollup/plugin-typescript";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  srcDir: 'src/',
  ignore: ['/src/pages/**/components/**'],
  modules: ['@nuxtjs/tailwindcss', 'nuxt-auth-utils'],
  ssr: false,
  nitro: {
    rollupConfig: {
      // @ts-ignore
      plugins: [
        rollupPluginTs({
          tsconfig: './tsconfig.json', // Asegurarte de que Rollup esté usando el archivo tsconfig correcto
          target: "ES2020", // Igual al que tenés en el tsconfig.json
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
          verbatimModuleSyntax: false
        })
      ],
    },
    experimental: {
      websocket: true,
      typescriptBundlerResolution: true
    }
  },
  tailwindcss: {
    viewer: false,
  },
})