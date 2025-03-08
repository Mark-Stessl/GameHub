import { fileURLToPath, URL } from 'node:url';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './manifest.js';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    port: 8080,
  },
  plugins: [
    vue({
      template: { transformAssetUrls },
    }),
    VitePWA({
      manifest,
      includeAssets: ['*/.{js,css,html,jpg,ico,png,ttf,woff2,svg}'],
      workbox: {
        mode: 'development',
        runtimeCaching: [
          {
            // Main games collection endpoint
            urlPattern: '/games',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'gamehub',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 1, // 1 day
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // Individual game endpoint (for specific game IDs)
            urlPattern: new RegExp('/games/[0-9a-zA-Z-_]+$'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'game-details-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 1, // 1 day
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // For the localhost endpoint from your store
            urlPattern: new RegExp('^http://localhost:3000/games'),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'external-games-api-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 1, // 1 day
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // Cache images from games
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'game-images',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),

    quasar({
      sassVariables: 'src/quasar-variables.sass',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  preview: {
    port: 5555,
    // proxy: {
    //   '/games': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //   },
    // },
  },
});
