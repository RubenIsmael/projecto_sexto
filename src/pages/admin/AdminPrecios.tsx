/**
 * Componente AdminPrecios: Gestión de precios del cementerio
 * Permite crear, listar y administrar los precios de las bóvedas
 */

import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';

/**
 * Interfaz que define la estructura de un precio
 */
interface Precio {
  id: number;                    // Identificador único del precio
  sector: string;                // Sector al que aplica el precio
  tipo_adquisicion: 'arriendo' | 'compra'; // Tipo de adquisición
  precio: number;                // Valor monetario
}

export function AdminPrecios() {
  // Estados del componente
  const [precios, setPrecios] = useState<Precio[]>([]); // Lista de precios
  const [loading, setLoading] = useState(true);         // Estado de carga
  const [formData, setFormData] = useState({            // Datos del formulario
    sector: '',
    tipo_adquisicion: 'arriendo' as const,
    precio: ''
  });

  // Efecto para cargar los precios al montar el componente
  useEffect(() => {
    loadPrecios();
  }, []);

  /**
   * Carga la lista de precios desde la API
   */
  const loadPrecios = async () => {
    try {
      const data = await api.getPrecios();
      setPrecios(data);
    } catch (error) {
      console.error('Error loading precios:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Maneja el envío del formulario para crear un nuevo precio
   * @param e - Evento del formulario
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.createPrecio({
        ...formData,
        precio: parseFloat(formData.precio)
      });
      loadPrecios();
      setFormData({ sector: '', tipo_adquisicion: 'arriendo', precio: '' });
    } catch (error) {
      console.error('Error creating precio:', error);
    }
  };

  // Renderiza un loader mientras se cargan los datos
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestión de Precios</h2>

      {/* Formulario de creación de precios */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Nuevo Precio</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de sector */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Sector</label>
            <input
              type="text"
              value={formData.sector}
              onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Selector de tipo de adquisición */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Tipo de Adquisición</label>
            <select
              value={formData.tipo_adquisicion}
              onChange={(e) => setFormData({ ...formData, tipo_adquisicion: e.target.value as 'arriendo' | 'compra' })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="arriendo">Arriendo</option>
              <option value="compra">Compra</option>
            </select>
          </div>

          {/* Campo de precio */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Precio</label>
            <input
              type="number"
              step="0.01"
              value={formData.precio}
              onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Botón de submit */}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Crear Precio
          </button>
        </form>
      </div>

      {/* Tabla de precios */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sector</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {precios.map((precio) => (
              <tr key={precio.id}>
                <td className="px-6 py-4 whitespace-nowrap">{precio.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{precio.sector}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    precio.tipo_adquisicion === 'arriendo' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {precio.tipo_adquisicion}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">${precio.precio.toFixed(2)}</td>
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