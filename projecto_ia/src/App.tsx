import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Upload, RefreshCw, Loader } from 'lucide-react';
import { procesarMensaje } from './lib/ia';
import { guardarConversacion, obtenerConversaciones } from './lib/database';
import { parseSQLFile } from './lib/sqlAnalyzer';

interface Mensaje {
  tipo: 'usuario' | 'bot';
  contenido: string;
  timestamp: Date;
}

function App() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [inputMensaje, setInputMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [sqlContent, setSqlContent] = useState<string | null>(null);
  const [sqlCargado, setSqlCargado] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMensajes([]);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [mensajes]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target?.result as string;
      setSqlContent(content);
      setSqlCargado(true);
    };
    reader.readAsText(file);
  };

  const reiniciarConversacion = () => {
    setMensajes([]);
    setSqlContent(null);
    setSqlCargado(false);
  };

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMensaje.trim() || cargando) return;

    const mensajeUsuario = inputMensaje.trim();
    setInputMensaje('');
    setMensajes(prev => [...prev, { tipo: 'usuario', contenido: mensajeUsuario, timestamp: new Date() }]);
    setCargando(true);

    try {
      const respuesta = await procesarMensaje(mensajeUsuario, sqlContent);
      const respuestaFormateada = respuesta.replace(/•/g, '\n\n•');
      setMensajes(prev => [...prev, { tipo: 'bot', contenido: respuestaFormateada, timestamp: new Date() }]);
    } catch (error) {
      console.error('Error:', error);
      setMensajes(prev => [...prev, {
        tipo: 'bot',
        contenido: 'Lo siento, ocurrió un error al procesar tu mensaje.',
        timestamp: new Date()
      }]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-800">Asistente Con IA Sementerios San Agustin</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={reiniciarConversacion}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Reiniciar Conversación
          </button>
          {!sqlCargado && (
            <>
              <input
                type="file"
                accept=".sql"
                onChange={handleFileUpload}
                ref={fileInputRef}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Upload className="w-5 h-5" />
                Cargar SQL
              </button>
            </>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 flex flex-col">
        <div ref={chatContainerRef} className="flex-1 bg-white rounded-lg shadow-md p-4 mb-4 overflow-y-auto">
          {mensajes.map((mensaje, index) => (
            <div key={index} className={`mb-4 flex ${mensaje.tipo === 'usuario' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-2 max-w-[80%] ${mensaje.tipo === 'usuario' ? 'flex-row-reverse' : 'flex-row'}`}>
                {mensaje.tipo === 'usuario' ? <User className="w-6 h-6 text-blue-600" /> : <Bot className="w-6 h-6 text-green-600" />}
                <div className={`rounded-lg p-3 ${mensaje.tipo === 'usuario' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                  {mensaje.contenido.split('\n').map((linea, i) => (
                    <p key={i}>{linea}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
          {cargando && (
            <div className="flex justify-start">
              <div className="flex gap-2 max-w-[80%] items-center">
                <Bot className="w-6 h-6 text-green-600" />
                <div className="rounded-lg p-3 bg-gray-100 text-gray-800 flex items-center">
                  <Loader className="w-5 h-5 animate-spin" />
                  <span className="ml-2">La IA está escribiendo...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={manejarEnvio} className="flex gap-2">
          <input type="text" value={inputMensaje} onChange={(e) => setInputMensaje(e.target.value)} placeholder="Escribe tu mensaje aquí..." className="flex-1 rounded-lg border p-3" disabled={cargando} />
          <button type="submit" disabled={cargando} className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
            <Send className="w-6 h-6" />
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
