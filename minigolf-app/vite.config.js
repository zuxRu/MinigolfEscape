import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/MinigolfEscape/',
  plugins: [react()],
  server: {
    watch: {
      usePolling: true
    },
    port: 3000,
    host: true
  }
})
