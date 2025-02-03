// Importaciones necesarias
import React, { useState } from 'react';
import { Send, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Componente ChatbotPage: Página dedicada al chatbot
 * Proporciona una interfaz de chat completa para interacción con usuarios
 */
export function ChatbotPage() {
  // Hook de navegación
  const navigate = useNavigate();

  // Estados del chat
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    // Mensaje inicial de bienvenida
    { text: '¡Hola! Soy el asistente virtual del Cementerio San Agustín. ¿En qué puedo ayudarte?', isUser: false }
  ]);
  const [input, setInput] = useState(''); // Estado del input del usuario

  /**
   * Maneja el envío de mensajes
   * Procesa el mensaje del usuario y genera una respuesta
   */
  const handleSend = async () => {
    if (!input.trim()) return;

    // Agrega el mensaje del usuario al chat
    setMessages(prev => [...prev, { text: input, isUser: true }]);

    // Obtiene y programa la respuesta del chatbot
    const response = getSimulatedResponse(input);
    
    // Simula un delay en la respuesta para naturalidad
    setTimeout(() => {
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 1000);

    setInput('');
  };

  /**
   * Genera respuestas basadas en palabras clave
   * @param question - Pregunta del usuario
   * @returns Respuesta apropiada según el contexto
   */
  const getSimulatedResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    
    // Lógica de respuestas según palabras clave
    if (lowerQuestion.includes('bóveda') || lowerQuestion.includes('boveda')) {
      return 'Actualmente tenemos 15 bóvedas disponibles en diferentes sectores. ¿Te gustaría conocer más detalles?';
    }
    if (lowerQuestion.includes('pago')) {
      return 'Para consultar pagos pendientes, necesito que me proporciones tu número de identificación.';
    }
    if (lowerQuestion.includes('reserva')) {
      return 'Puedes realizar una reserva a través de nuestra sección de Gestión. ¿Te gustaría que te guíe en el proceso?';
    }
    if (lowerQuestion.includes('enterrad')) {
      return 'Para buscar información sobre personas enterradas, necesito el nombre completo de la persona.';
    }
    if (lowerQuestion.includes('horario')) {
      return 'Nuestro horario de atención es: Lunes a Viernes de 8:00 AM a 6:00 PM, Sábados y Domingos de 9:00 AM a 4:00 PM, y Feriados de 10:00 AM a 2:00 PM.';
    }
    return 'Entiendo tu consulta. ¿Te gustaría que te conecte con uno de nuestros asesores para más información?';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra superior con botón de retorno */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-semibold text-gray-900">Asistente Virtual</h1>
        </div>
      </div>

      {/* Contenedor principal del chat */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md">
          {/* Área de mensajes */}
          <div className="h-[calc(100vh-280px)] overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Sugerencias rápidas */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 mb-4">
              {[
                '¿Hay bóvedas disponibles?',
                '¿Cómo hacer una reserva?',
                'Consultar pagos pendientes',
                'Horario de atención'
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setInput(suggestion);
                    handleSend();
                  }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Área de entrada de mensaje */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSend}
                className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}