import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import swc from '@vitejs/plugin-react-swc'
import path from 'path'

export default defineConfig({
  plugins: [swc()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    target: 'es2020',
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'radix-ui': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
          ],
          'charts': ['recharts'],
          'three': ['three'],
        },
      },
    },
  },
  server: {
    port: 3000,
    strictPort: false,
    host: '0.0.0.0',
  },
  preview: {
    port: 3000,
    strictPort: false,
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'framer-motion',
    ],
  },
})
