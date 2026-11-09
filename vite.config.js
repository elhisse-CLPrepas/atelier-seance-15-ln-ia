import { defineConfig } from 'vite'
export default defineConfig({
  base: './',
  server: { port: 5173 },
  build: { target: 'es2020', modulePreload: false, cssCodeSplit: false, assetsInlineLimit: 0 },
})
