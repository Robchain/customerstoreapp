import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@components': resolve(__dirname, './src/presentation/components'),
      '@pages': resolve(__dirname, './src/presentation/pages'),
      '@services': resolve(__dirname, './src/infrastructure/services'),
      '@store': resolve(__dirname, './src/infrastructure/store'),
      '@types': resolve(__dirname, './src/shared/types'),
      '@utils': resolve(__dirname, './src/shared/utils'),
      '@hooks': resolve(__dirname, './src/shared/hooks'),
      '@constants': resolve(__dirname, './src/shared/constants'),
      '@styles': resolve(__dirname, './src/shared/styles')
    }
  },
  server: {
    port: 3000,
    host: true
  }
})