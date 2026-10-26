import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { supabaseDevPlugin } from './src/viteDevSupabase.js'

export default defineConfig({
  plugins: [
    supabaseDevPlugin(),
    react(),
    tailwindcss(),
  ],
})