import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@lib': path.resolve(__dirname, '../lib'),
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
