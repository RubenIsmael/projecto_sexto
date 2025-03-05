/**
 * Componente AdminReservas: Gestión de reservas del cementerio
 * Permite visualizar y administrar las reservas de bóvedas
 */

import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';

/**
 * Interfaz que define la estructura de una reserva
 */
interface Reserva {
  id: number;                    // Identificador único de la reserva
  cedula: string;                // Cédula del solicitante
  id_usuario: number;            // ID del usuario que realiza la reserva
  id_bobeda: number;             // ID de la bóveda reservada
  id_precio: number;             // ID del precio aplicado
  estado_pago: 'pagado' | 'pendiente'; // Estado del pago
  fecha_reserva: string;         // Fecha en que se realizó la reserva
}

export function AdminReservas() {
  // Estados del componente
  const [reservas, setReservas] = useState<Reserva[]>([]); // Lista de reservas
  const [loading, setLoading] = useState(true);            // Estado de carga

  // Efecto para cargar las reservas al montar el componente
  useEffect(() => {
    loadReservas();
  }, []);

  /**
   * Carga la lista de reservas desde la API
   */
  const loadReservas = async () => {
    try {
      const data = await api.getReservas();
      setReservas(data);
    } catch (error) {
      console.error('Error loading reservas:', error);
    } finally {
      setLoading(false);
    }
  };

  // Renderiza un loader mientras se cargan los datos
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestión de Reservas</h2>

      {/* Tabla de reservas */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cédula</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bóveda</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {reservas.map((reserva) => (
              <tr key={reserva.id}>
                <td className="px-6 py-4 whitespace-nowrap">{reserva.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reserva.cedula}</td>
                <td className="px-6 py-4 whitespace-nowrap">{reserva.id_bobeda}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    reserva.estado_pago === 'pagado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {reserva.estado_pago}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(reserva.fecha_reserva).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-blue-600 hover:text-blue-900 mr-2">Ver</button>
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