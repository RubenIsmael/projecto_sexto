/**
 * Configuración de Vite
 * Define las opciones y plugins para el bundler
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Excluye lucide-react de la optimización de dependencias
    // para evitar problemas de compilación
    exclude: ['lucide-react'],
  },
});