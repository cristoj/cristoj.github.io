import { defineConfig } from 'vite'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    root: './',
    build: {
        outDir: 'dist'
    },
    server: {
        port: 3000,
        open: true
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    plugins: [
        VitePWA({
            strategies: 'generateSW',
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
                runtimeCaching: [
                    {
                        urlPattern: ({ request }) => request.mode === 'navigate',
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'navigation-cache',
                        },
                    },
                    {
                        urlPattern: ({ request }) =>
                            request.destination === 'style' ||
                            request.destination === 'script' ||
                            request.destination === 'worker',
                        handler: 'StaleWhileRevalidate',
                        options: {
                            cacheName: 'assets-cache',
                        },
                    },
                ],
            },
            srcDir: 'src',
            filename: 'seeder.ts',
            injectRegister: 'script'
        })
    ]
})
