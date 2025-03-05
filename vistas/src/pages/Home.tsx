import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Home() {
  // Hook de navegación para redirección
  const navigate = useNavigate();

  /**
   * Maneja la navegación a diferentes secciones
   * @param tab - Identificador de la sección a mostrar
   */
  const handleServiceClick = (tab: string) => {
    if (tab === 'chat') {
      navigate('/chat');
    } else {
      navigate('/management', { state: { activeTab: tab } });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Estilos de las fuentes */}
      <style>
        {`
          @font-face {
            font-family: 'Coneria Script';
            src: url('/assets/fonts/ConeriaScript.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }

          @font-face {
            font-family: 'Star Trek Future';
            src: url('/assets/fonts/StarTrekFuture.ttf') format('truetype');
            font-weight: normal;
            font-style: normal;
          }
        `}
      </style>

      {/* Título principal */}
      <h1
        className="text-4xl font-bold text-gray-900 mb-6"
        style={{ fontFamily: 'Star Trek Future, sans-serif' }}
      >
        Bienvenidos al Cementerio Parroquial San Agustín
      </h1>

      {/* Sección de presentación */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        {/* Imagen principal */}
        <img
          src="https://media.istockphoto.com/id/1071164602/es/foto/buganvillas-gran-%C3%A1rbol-en-el-cementerio-en-san-agustin-etla.jpg?s=612x612&w=0&k=20&c=Q8hL_xuB4KXoizAMLnARupXBPXMit3GcoMXXeqIisPk="
          alt="Cementerio San Agustín"
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        {/* Descripción del cementerio */}
        <p
          className="text-gray-600 mb-4"
          style={{ fontFamily: 'Coneria Script, sans-serif' }}
        >
          Desde 1890, el Cementerio Parroquial San Agustín ha sido un lugar de paz y recogimiento
          para nuestra comunidad. Con más de 130 años de historia, nuestro cementerio combina
          la tradición y el respeto por nuestros seres queridos con modernas instalaciones y
          servicios digitales para mejor atención a las familias.
        </p>

        <p className="text-gray-600">
          Nuestro compromiso es proporcionar un espacio digno y sereno para el descanso eterno
          de sus seres queridos, mientras facilitamos todos los procesos administrativos a través
          de nuestra plataforma digital Eternity.
        </p>
      </div>

      {/* Grid de servicios y horarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sección de servicios */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Servicios Disponibles</h2>
          <ul className="space-y-2">
            {/* Lista de servicios con navegación */}
            <li>
              <button
                onClick={() => handleServiceClick('vaults')}
                className="text-blue-800 hover:text-blue-600 hover:underline w-full text-left"
              >
                • Consulta de bóvedas disponibles
              </button>
            </li>
            <li>
              <button
                onClick={() => handleServiceClick('reservations')}
                className="text-blue-800 hover:text-blue-600 hover:underline w-full text-left"
              >
                • Reservas en línea
              </button>
            </li>
            <li>
              <button
                onClick={() => handleServiceClick('payments')}
                className="text-blue-800 hover:text-blue-600 hover:underline w-full text-left"
              >
                • Gestión de pagos
              </button>
            </li>
            <li>
              <button
                onClick={() => handleServiceClick('chat')}
                className="text-blue-800 hover:text-blue-600 hover:underline w-full text-left"
              >
                • Asistencia virtual 24/7
              </button>
            </li>
          </ul>
        </div>

        {/* Sección de horarios */}
        <div className="bg-green-50 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-900 mb-4">Horario de Visitas</h2>
          <ul className="space-y-2 text-green-800">
            {/* Lista de horarios */}
            <li>• Lunes a Viernes: 8:00 AM - 6:00 PM</li>
            <li>• Sábados y Domingos: 9:00 AM - 4:00 PM</li>
            <li>• Feriados: 10:00 AM - 2:00 PM</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
