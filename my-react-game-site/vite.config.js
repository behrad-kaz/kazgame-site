// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // **بازگرداندن 'base' به حالت لوکال هاست**
  base: '/', // <--- **این را به '/' تغییر دهید**
  build: {
    outDir: 'dist',
  },
})