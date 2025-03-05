import { GoogleGenerativeAI } from '@google/generative-ai';
import * as tf from '@tensorflow/tfjs';

const API_KEY = 'AIzaSyATYX4FWH2gtzU3iy_lLU38Yurvp1HoMOQ';
const genAI = new GoogleGenerativeAI(API_KEY);

// Red neuronal simple para clasificación de intenciones
const crearModeloNeuronal = async () => {
  const modelo = tf.sequential();
  
  modelo.add(tf.layers.dense({
    units: 64,
    activation: 'relu',
    inputShape: [10]
  }));
  
  modelo.add(tf.layers.dense({
    units: 32,
    activation: 'relu'
  }));
  
  modelo.add(tf.layers.dense({
    units: 5,
    activation: 'softmax'
  }));

  modelo.compile({
    optimizer: 'adam',
    loss: 'categoricalCrossentropy',
    metrics: ['accuracy']
  });

  return modelo;
};

// Sistema experto basado en reglas
const reglasExperto = [
  {
    condicion: (texto: string) => texto.toLowerCase().includes('gráfico'),
    accion: () => 'GENERAR_GRAFICO'
  },
  {
    condicion: (texto: string) => texto.toLowerCase().includes('análisis'),
    accion: () => 'REALIZAR_ANALISIS'
  },
  {
    condicion: (texto: string) => texto.toLowerCase().includes('tabla'),
    accion: () => 'ANALIZAR_TABLA'
  },
  {
    condicion: (texto: string) => texto.toLowerCase().includes('consulta'),
    accion: () => 'ANALIZAR_CONSULTA'
  }
];

const formatearRespuesta = (texto: string): string => {
  // Eliminar asteriscos y negritas
  texto = texto.replace(/\*\*/g, '');
  
  // Convertir listas con asteriscos en listas HTML
  texto = texto.replace(/\n\s*\*\s/g, '\n• ');
  
  // Agregar saltos de línea después de los puntos seguidos
  texto = texto.replace(/\.\s+/g, '.\n\n');
  
  // Formatear secciones
  texto = texto.replace(/([A-Za-zÁ-Úá-ú]+:)/g, '\n\n$1\n');
  
  // Eliminar múltiples saltos de línea
  texto = texto.replace(/\n{3,}/g, '\n\n');
  
  // Asegurar que haya espacio después de los dos puntos
  texto = texto.replace(/:/g, ': ');
  
  return texto.trim();
};

export const procesarMensaje = async (mensaje: string, sqlContent: string | null = null) => {
  // Aplicar sistema experto
  for (const regla of reglasExperto) {
    if (regla.condicion(mensaje)) {
      const accion = regla.accion();
      // Procesar acción específica
    }
  }

  // Usar Gemini para generar respuesta
  const modelo = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  let prompt = `
    Actúa como un asistente virtual experto y responde en español.
    Sigue estas reglas para formatear tu respuesta:
    1. Usa oraciones cortas y claras
    2. Separa los párrafos con saltos de línea
    3. Usa viñetas () para listas
    4. Organiza la información en secciones claras
    5. No uses markdown ni formateo especial
    6. Evita respuestas demasiado largas
    7. Prioriza la información más relevante
  `;

  if (sqlContent) {
    prompt += `
    
    Contexto SQL:
    ${sqlContent}
    
    Analiza el contenido SQL proporcionado y responde la siguiente pregunta relacionada con las tablas, consultas o estructura de la base de datos.
    `;
  }

  prompt += `
    
    Pregunta del usuario: ${mensaje}
    
    Por favor proporciona una respuesta útil, clara y bien estructurada.
  `;

  try {
    const resultado = await modelo.generateContent(prompt);
    const respuesta = await resultado.response.text();
    return formatearRespuesta(respuesta);
  } catch (error) {
    console.error('Error al procesar con Gemini:', error);
    return 'Lo siento, hubo un error al procesar tu solicitud.';
  }
};