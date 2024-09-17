/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*'],
      exclude: [
        'src/**/*.test.{js,ts,jsx,tsx}',
        'src/setupTests.ts',
        'src/main.tsx',
        'src/App.tsx',
        'src/api/rickAndMortyApi.ts',
        'src/pages/Episodes.tsx',
        'src/pages/Location.tsx',
        'src/vite-env.d.ts'
      ],
    },
    setupFiles: ['./src/setupTests.ts'],
  },
})