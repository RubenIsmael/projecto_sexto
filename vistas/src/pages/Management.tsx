import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, Calendar, DollarSign } from 'lucide-react';

interface LocationState {
  activeTab?: 'vaults' | 'reservations' | 'payments';
}

export function Management() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('vaults');

  useEffect(() => {
    const state = location.state as LocationState;
    if (state?.activeTab) {
      setActiveTab(state.activeTab);
    }
  }, [location]);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">Gestión</h1>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => setActiveTab('vaults')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'vaults'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Bóvedas
        </button>
        <button
          onClick={() => setActiveTab('reservations')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'reservations'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Reservas
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          className={`px-4 py-2 rounded-lg ${
            activeTab === 'payments'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Pagos
        </button>
      </div>

      {/* Search and filters */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="h-5 w-5" />
            <span>Filtros</span>
          </button>
        </div>
      </div>

      {/* Content area */}
      <div className="bg-white rounded-lg shadow-md p-6">
        {activeTab === 'vaults' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Bóvedas Disponibles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Sample vault cards */}
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="font-semibold text-lg mb-2">Bóveda #{i}</h3>
                  <p className="text-gray-600 mb-2">Sector A, Nivel 2</p>
                  <p className="text-green-600 font-medium">Disponible</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reservations' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reservas Activas</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">Reserva #{i}</h3>
                      <p className="text-gray-600">Bóveda #A-{i}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="h-5 w-5" />
                      <span>Fecha: 2024/03/{i}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Estado de Pagos</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">Pago #{i}</h3>
                      <p className="text-gray-600">Bóveda #B-{i}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <DollarSign className="h-5 w-5" />
                        <span>${i}00.00</span>
                      </div>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        Pendiente
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}