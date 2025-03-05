import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import axios from 'axios';

interface Message {
  text: string;
  isUser: boolean;
  timestamp?: Date;
}

interface ChatResponse {
  response: string;
  error?: string;
}

export function Chatbot() {
  // Estados
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: '¡Hola! Soy el asistente virtual del Cementerio San Agustín. ¿En qué puedo ayudarte?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Opciones rápidas para el chat
  const quickOptions = [
    '¿Hay bóvedas disponibles?',
    'Consultar pagos',
    'Hacer una reserva',
    'Buscar difunto',
    'Horarios de atención'
  ];

  // Efecto para hacer scroll al último mensaje
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  /**
   * Maneja el envío de mensajes al backend
   */
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    
    // Agrega el mensaje del usuario
    setMessages(prev => [...prev, {
      text: userMessage,
      isUser: true,
      timestamp: new Date()
    }]);

    setIsLoading(true);

    try {
      // Llamada al backend
      const response = await axios.post<ChatResponse>('http://localhost:5173/api/chat', {
        message: userMessage
      });

      // Agrega la respuesta del bot
      setMessages(prev => [...prev, {
        text: response.data.response,
        isUser: false,
        timestamp: new Date()
      }]);
    } catch (error) {
      // Manejo de errores
      setMessages(prev => [...prev, {
        text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        isUser: false,
        timestamp: new Date()
      }]);
      console.error('Error al enviar mensaje:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Maneja el uso de opciones rápidas
   */
  const handleQuickOption = (option: string) => {
    setInput(option);
    handleSend();
  };

  /**
   * Formatea la hora del mensaje
   */
  const formatMessageTime = (timestamp?: Date) => {
    if (!timestamp) return '';
    return new Intl.DateTimeFormat('es', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  return (
    <>
      {/* Botón flotante para abrir el chat */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Abrir chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Ventana del chat */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl z-50">
          {/* Encabezado */}
          <div className="flex items-center justify-between p-4 border-b bg-blue-600 text-white rounded-t-lg">
            <h3 className="text-lg font-semibold">Asistente Virtual</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition-colors"
              aria-label="Cerrar chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Área de mensajes */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <div className="break-words">{message.text}</div>
                  <div className={`text-xs mt-1 ${
                    message.isUser ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatMessageTime(message.timestamp)}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                  Escribiendo...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Opciones rápidas */}
          <div className="px-4 py-2 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {quickOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleQuickOption(option)}
                  className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                  disabled={isLoading}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Área de entrada */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSend()}
                placeholder="Escribe tu mensaje..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                aria-label="Enviar mensaje"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}