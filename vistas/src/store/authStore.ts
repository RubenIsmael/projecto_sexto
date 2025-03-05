/**
 * Store de autenticación usando Zustand
 * Maneja el estado global de autenticación de la aplicación
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Interfaz que define la estructura del estado de autenticación
 */
interface AuthState {
  user: any | null;        // Información del usuario autenticado
  isAuthenticated: boolean; // Estado de autenticación
  login: (user: any) => void; // Función para iniciar sesión
  logout: () => void;      // Función para cerrar sesión
}

/**
 * Store de autenticación usando Zustand
 * Persiste el estado en localStorage para mantener la sesión
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // Estado inicial
      user: null,
      isAuthenticated: false,
      
      // Acciones
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage', // Nombre para localStorage
    }
  )
);