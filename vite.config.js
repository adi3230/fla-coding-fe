import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/global.scss";`,
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: 'istanbul' // or 'v8'
    },
  },
  server: {
    host: true,
    port: 8000
  }
})
