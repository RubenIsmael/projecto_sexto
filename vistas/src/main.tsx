/**
 * Punto de entrada principal de la aplicación
 * Renderiza el componente App en el DOM
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Inicializa la aplicación en modo estricto
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);