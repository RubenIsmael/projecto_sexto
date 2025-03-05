/**
 * Componente AdminUsuarios: Gestión de usuarios del sistema
 * Permite crear, listar y administrar los usuarios del cementerio
 */

import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';

/**
 * Interfaz que define la estructura de un usuario
 */
interface Usuario {
  id: number;       // Identificador único del usuario
  nombres: string;  // Nombres del usuario
  apellidos: string;// Apellidos del usuario
  correo: string;   // Correo electrónico del usuario
}

export function AdminUsuarios() {
  // Estados del componente
  const [usuarios, setUsuarios] = useState<Usuario[]>([]); // Lista de usuarios
  const [loading, setLoading] = useState(true);           // Estado de carga
  const [formData, setFormData] = useState({              // Datos del formulario
    nombres: '',
    apellidos: '',
    correo: '',
    clave: ''
  });

  // Efecto para cargar los usuarios al montar el componente
  useEffect(() => {
    loadUsuarios();
  }, []);

  /**
   * Carga la lista de usuarios desde la API
   */
  const loadUsuarios = async () => {
    try {
      const data = await api.getUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error('Error loading usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Maneja el envío del formulario para crear un nuevo usuario
   * @param e - Evento del formulario
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createUsuario(formData);
      loadUsuarios();
      setFormData({ nombres: '', apellidos: '', correo: '', clave: '' });
    } catch (error) {
      console.error('Error creating usuario:', error);
    }
  };

  // Renderiza un loader mientras se cargan los datos
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestión de Usuarios</h2>

      {/* Formulario de creación de usuarios */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Nuevo Usuario</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Campo de nombres */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Nombres</label>
              <input
                type="text"
                value={formData.nombres}
                onChange={(e) => setFormData({ ...formData, nombres: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            {/* Campo de apellidos */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Apellidos</label>
              <input
                type="text"
                value={formData.apellidos}
                onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>
          {/* Campo de correo electrónico */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              value={formData.correo}
              onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          {/* Campo de contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              value={formData.clave}
              onChange={(e) => setFormData({ ...formData, clave: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          {/* Botón de submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Crear Usuario
          </button>
        </form>
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombres</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apellidos</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.nombres}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.apellidos}</td>
                <td className="px-6 py-4 whitespace-nowrap">{usuario.correo}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900">Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}