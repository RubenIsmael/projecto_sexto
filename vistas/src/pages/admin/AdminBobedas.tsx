import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';

/**
 * Interfaz que define la estructura de una bóveda
 */
interface Bobeda {
  id: number;           // Identificador único de la bóveda
  division: string;     // División o ubicación de la bóveda
  estado: 'arriendo' | 'propietario'; // Estado actual de la bóveda
}

export function AdminBobedas() {
  // Estados del componente
  const [bobedas, setBobedas] = useState<Bobeda[]>([]); // Lista de bóvedas
  const [loading, setLoading] = useState(true);          // Estado de carga
  const [formData, setFormData] = useState({             // Datos del formulario
    division: '',
    estado: 'arriendo' as 'arriendo' | 'propietario' // Modificado para aceptar ambos valores
  });

  // Efecto para cargar las bóvedas al montar el componente
  useEffect(() => {
    loadBobedas();
  }, []);

  /**
   * Carga la lista de bóvedas desde la API
   */
  const loadBobedas = async () => {
    try {
      const data = await api.getBobedas();
      setBobedas(data);
    } catch (error) {
      console.error('Error loading bóvedas:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Maneja el envío del formulario para crear una nueva bóveda
   * @param e - Evento del formulario
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createBobeda(formData);
      loadBobedas();
      setFormData({ division: '', estado: 'arriendo' });
    } catch (error) {
      console.error('Error creating bóveda:', error);
    }
  };

  // Renderiza un loader mientras se cargan los datos
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestión de Bóvedas</h2>

      {/* Formulario de creación de bóvedas */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Nueva Bóveda</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de división */}
          <div>
            <label className="block text-sm font-medium text-gray-700">División</label>
            <input
              type="text"
              value={formData.division}
              onChange={(e) => setFormData({ ...formData, division: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          
          {/* Selector de estado */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <select
              value={formData.estado}
              onChange={(e) => setFormData({ ...formData, estado: e.target.value as 'arriendo' | 'propietario' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="arriendo">Arriendo</option>
              <option value="propietario">Propietario</option>
            </select>
          </div>
          
          {/* Botón de submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Crear Bóveda
          </button>
        </form>
      </div>

      {/* Tabla de bóvedas */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">División</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bobedas.map((bobeda) => (
              <tr key={bobeda.id}>
                <td className="px-6 py-4 whitespace-nowrap">{bobeda.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{bobeda.division}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    bobeda.estado === 'arriendo' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {bobeda.estado}
                  </span>
                </td>
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
