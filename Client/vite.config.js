import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist' // Especifica el directorio de salida
  },
  server: {
    historyApiFallback: true // Añadir esta línea
  }
});