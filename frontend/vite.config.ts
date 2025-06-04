// import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'json' , 'html']
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: './testSetup.tsx'
  }
})
