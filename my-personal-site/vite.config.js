import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Custom title + favicon
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  define: {
    global: 'globalThis',
  },
})
