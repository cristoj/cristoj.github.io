import { defineConfig } from 'vite'
import path from 'path'

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
    }

})
