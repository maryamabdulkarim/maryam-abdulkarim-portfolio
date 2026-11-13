import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      ViteImageOptimizer({
        includePublic: true,
        logStats: true,
        png:  { quality: 80, compressionLevel: 9 },
        jpeg: { quality: 80, mozjpeg: true },
        jpg:  { quality: 80, mozjpeg: true },
        webp: { quality: 80 },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          mimk: path.resolve(__dirname, 'mimk.html'),
          ecosmart: path.resolve(__dirname, 'ecosmart.html'),
          kioni: path.resolve(__dirname, 'kioni.html'),
          kioniDesignSystem: path.resolve(__dirname, 'kioni-design-system.html'),
          ajobook: path.resolve(__dirname, 'ajobook.html'),
          ajoBook: path.resolve(__dirname, 'ajo-book.html'),
          verity: path.resolve(__dirname, 'verity.html'),
          illustrations: path.resolve(__dirname, 'illustrations.html'),
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
