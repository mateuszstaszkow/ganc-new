import { copyFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// Served from https://mateuszstaszkow.github.io/ganc-new/
const base = process.env.VITE_BASE ?? '/ganc-new/'
const siteUrl = process.env.VITE_SITE_URL ?? 'https://mateuszstaszkow.github.io/ganc-new/'

/**
 * GitHub Pages has no server-side rewrite, so a reload on /rodo would 404.
 * Shipping index.html as 404.html lets the client router take over instead.
 * Also emits a small sitemap for the two real routes.
 */
function githubPagesSpa(): Plugin {
  return {
    name: 'github-pages-spa',
    apply: 'build',
    closeBundle() {
      const out = path.resolve(__dirname, 'dist')
      copyFileSync(path.join(out, 'index.html'), path.join(out, '404.html'))

      const today = new Date().toISOString().slice(0, 10)
      const urls = ['', 'rodo']
        .map(
          (route) =>
            `  <url><loc>${siteUrl}${route}</loc><lastmod>${today}</lastmod>` +
            `<changefreq>monthly</changefreq><priority>${route ? '0.4' : '1.0'}</priority></url>`,
        )
        .join('\n')

      writeFileSync(
        path.join(out, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      )
    },
  }
}

export default defineConfig({
  base,
  plugins: [
    react(),
    tailwindcss(),
    githubPagesSpa(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'apple-touch-icon.png', 'robots.txt'],
      manifest: {
        name: 'GANC IZOLACJE Sp. z o.o. — chłodnie i mroźnie',
        short_name: 'GANC IZOLACJE',
        description:
          'Budowa chłodni i mroźni, izolacje termiczne z płyt warstwowych, drzwi chłodnicze i mroźnicze, posadzki przemysłowe. Sianów, cała Polska.',
        lang: 'pl',
        theme_color: '#00A0E3',
        background_color: '#05121f',
        display: 'standalone',
        orientation: 'portrait-primary',
        start_url: base,
        scope: base,
        categories: ['business', 'industrial'],
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          {
            src: 'icons/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        shortcuts: [
          { name: 'Kontakt', url: `${base}#kontakt` },
          { name: 'Oferta', url: `${base}#oferta` },
          { name: 'Realizacje', url: `${base}#realizacje` },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,jpg,webp,woff2}'],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        navigateFallback: `${base}index.html`,
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'ganc-images',
              expiration: { maxEntries: 80, maxAgeSeconds: 60 * 60 * 24 * 60 },
            },
          },
        ],
      },
    }),
  ],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
          react: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
