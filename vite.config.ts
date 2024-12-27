import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 8080, // Ensure Vite uses port 8080 on Render
    host: '0.0.0.0' // Ensure it's publicly accessible
  }
});
