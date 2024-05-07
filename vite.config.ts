import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 100,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
          return;
        }
        warn(warning);
      },
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      '/graphql': {
        target: 'http://0.0.0.0:8080',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
