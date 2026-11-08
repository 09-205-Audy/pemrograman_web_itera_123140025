import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// Konfigurasi Vite + Vitest (untuk unit test)
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',          // simulasi browser untuk test
    globals: true,                 // describe, it, expect bisa dipakai langsung
    setupFiles: './src/setupTests.js',
  },
})