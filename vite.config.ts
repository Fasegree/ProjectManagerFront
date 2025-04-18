import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'

// @ts-ignore
export default defineConfig(({ mode }) => ({
  base: './', // ВАЖНО для правильной загрузки ассетов на Vercel
  plugins: [
    vue(),
    visualizer({ open: true }), // анализ бандла после сборки
  ],
  build: {
    sourcemap: true, // для отладки
  },
}))
