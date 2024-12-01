import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vercel(), react()],
  server: {
    historyApiFallback: true
  }
})
