// vite.config.js
import { resolve } from 'path';
import vituum from 'vituum';
import pages from 'vituum/plugins/pages.js';
import pug from '@vituum/vite-plugin-pug';
import { defineConfig } from 'vite'
import inject from '@rollup/plugin-inject';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  esbuild: {
    charset: 'utf8',
  },
  base: './',
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      sass: {
        api: 'modern-compiler', // or "modern", "legacy"
      },
    },
  },
  plugins: [
    vituum(),
    pug(),
    pages({
      normalizeBasePath: true,
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    inject({
      '$': 'jquery',
      'jQuery': 'jquery',
      'windows.jQuery': 'jquery',
      'windows.$': 'jquery',
      "include": ['**/*.js']
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('/src/assets/js/commons/') || id.includes('/src/assets/js/configs/')) {
            return 'commons';
          }
          if (id.includes('node_modules')) {
            if (id.includes('@xwadex+fesd')) return "xwadex.fesd"
            return 'vendor';
          }
        },
        chunkFileNames: 'assets/js/[name].min.js',
        entryFileNames: assetInfo => {
          const name = assetInfo.name.replace('.pug', '');
          return `assets/js/${name}.min.js`;
        },
        assetFileNames: assetInfo => {
          if (assetInfo.type === 'asset' && /\.(jpe?g|png|gif|svg)$/i.test(assetInfo.name)) {
            return 'assets/img/[name].[ext]';
          }
          if (assetInfo.type === 'asset' && /\.(ttf|woff|woff2|eot)$/i.test(assetInfo.name)) {
            return 'assets/fonts/[name].[ext]';
          }
          if (assetInfo.type === 'asset' && /\.(css)$/i.test(assetInfo.name)) {
            return 'assets/css/[name].min.[ext]';
          }
          return 'assets/[ext]/[name].[ext]';
        },
      },
    },
    // modulePreload: {
    //   polyfill: false
    // }
  },
  server: {
    port: 9000,
    open: true,
    host: 'localhost',
  },
  resolve: {
    alias: {
      '@/': resolve('src'),
      '@/css': resolve('src/assets/css'),
      '@/apps': resolve('src/assets/js/apps'),
      '@/plugins': resolve('src/assets/js/plugins'),
      '@/ui': resolve('src/assets/js/ui'),
      '@/commons': resolve('src/assets/js/commons'),
      '@/configs': resolve('src/assets/js/configs'),
    },
  },
});
