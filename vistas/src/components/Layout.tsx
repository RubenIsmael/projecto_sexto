/**
 * Componente Layout: Estructura principal de la aplicación
 * Proporciona el diseño base y navegación para todas las páginas
 */

import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Home, Users, Phone, Settings, Cross, LogIn, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

/**
 * Componente Layout: Estructura principal de la aplicación
 * Incluye la barra lateral de navegación y el contenido principal
 */
export function Layout() {
  // Estados y hooks
  const [isOpen, setIsOpen] = React.useState(false); // Control del menú móvil
  const location = useLocation(); // Hook para obtener la ubicación actual
  const navigate = useNavigate(); // Hook para navegación programática
  const { isAuthenticated, logout } = useAuthStore(); // Estado de autenticación

  // Función para verificar si una ruta está activa
  const isActive = (path: string) => location.pathname === path;

  // Configuración de elementos del menú
  const menuItems = [
    { path: '/', icon: Home, label: 'Inicio' },
    { path: '/about', icon: Users, label: '¿Quiénes Somos?' },
    { path: '/contact', icon: Phone, label: 'Contacto' },
    { path: '/management', icon: Settings, label: 'Gestión' },
  ];

  // Elementos del menú administrativo
  const adminMenuItems = [
    { label: 'Bóvedas', path: '/admin/bobedas' },
    { label: 'Precios', path: '/admin/precios' },
    { label: 'Reservas', path: '/admin/reservas' },
    { label: 'Usuarios', path: '/admin/usuarios' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Overlay para el menú móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Barra lateral de navegación */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-30 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        {/* Encabezado de la barra lateral */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">San Agustín</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-md hover:bg-gray-100 md:hidden"
          >
            <Cross className="h-6 w-6" />
          </button>
        </div>
        
        {/* Navegación principal */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Menú administrativo (solo visible para usuarios autenticados) */}
          {isAuthenticated && (
            <div className="pt-4">
              <div className="text-sm font-medium text-gray-400 px-3 mb-2">
                Administración
              </div>
              {adminMenuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronDown className="h-4 w-4 ml-auto" />
                </Link>
              ))}
            </div>
          )}

          {/* Botón de inicio/cierre de sesión */}
          {isAuthenticated ? (
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full"
            >
              <LogIn className="h-5 w-5" />
              <span>Cerrar Sesión</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            >
              <LogIn className="h-5 w-5" />
              <span>Iniciar Sesión</span>
            </Link>
          )}
        </nav>
      </aside>

      {/* Botón de menú móvil */}
      <div className="fixed top-4 left-4 md:hidden z-20">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md bg-white shadow-lg hover:bg-gray-50"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Contenido principal */}
      <div className="md:ml-64 min-h-screen">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}