import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: '.', // root folder (client)
  server: {
    port: 5173, // Vite dev server port
    open: true, // auto open browser on npm run dev
  },
  build: {
    outDir: 'dist', // where production build files will go
  },
  resolve: {
    alias: {
      '@': '/src', // optional shortcut for imports
    },
  },
})
