
const DB_NAME = 'chatbot_db';
const STORE_NAME = 'conversaciones';

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { 
          keyPath: 'id', 
          autoIncrement: true 
        });
      }
    };
  });
};

export const guardarConversacion = async (pregunta: string, respuesta: string) => {
  const db = await openDB();
  
  return new Promise<void>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const conversacion = {
      pregunta,
      respuesta,
      timestamp: new Date().toISOString()
    };

    const request = store.add(conversacion);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
    
    transaction.oncomplete = () => db.close();
  });
};

export const obtenerConversaciones = async () => {
  const db = await openDB();
  
  return new Promise<any[]>((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const conversaciones = request.result;
      resolve(conversaciones.reverse().slice(0, 50));
    };
    
    transaction.oncomplete = () => db.close();
  });
};