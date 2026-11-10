import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// VITE_BASE lets the same build serve from a sub-path (GitHub Pages uses /webrick/).
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  base: process.env.VITE_BASE || '/',
  server: { port: 5180 },
  // Browser build only: React and Framer Motion in their own chunks, so they download in parallel
  // and stay cached between deploys. The prerender (SSR) build keeps one file.
  build: isSsrBuild ? {} : { rollupOptions: { output: { manualChunks: { react: ['react', 'react-dom'], motion: ['framer-motion'] } } } },
}))
