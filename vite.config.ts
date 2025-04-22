import react from '@vitejs/plugin-react';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import { imagetools } from 'vite-imagetools';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    imagetools(),
    splitVendorChunkPlugin(),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240, // 10kb
      deleteOriginFile: false
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240, // 10kb
      deleteOriginFile: false
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['react-toastify'],
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    cssMinify: true,
    target: 'es2015',
    assetsInlineLimit: 4096, // 4kb
    reportCompressedSize: false,
  }
});
