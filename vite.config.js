import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Inventory Management System',
        short_name: 'Inventory',
        description: 'A modern inventory management system',
        theme_color: '#4361ee',
        background_color: '#f5f7fb',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/My Logo.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/My Logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    })
  ],
})
