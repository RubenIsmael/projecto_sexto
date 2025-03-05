/**
 * Archivo principal de la aplicación
 * Configura el enrutamiento y la estructura base de la aplicación
 */

// Importaciones principales
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Management } from './pages/Management';
import { ChatbotPage } from './pages/ChatbotPage';
import { Login } from './pages/Login';
import { Chatbot } from './components/Chatbot';
import { AdminBobedas } from './pages/admin/AdminBobedas';
import { AdminPrecios } from './pages/admin/AdminPrecios';
import { AdminReservas } from './pages/admin/AdminReservas';
import { AdminUsuarios } from './pages/admin/AdminUsuarios';

/**
 * Componente principal de la aplicación
 * Configura el enrutamiento y la estructura base de la aplicación
 */
function App() {
  return (
    // Router principal que envuelve toda la aplicación
    <Router>
      {/* Definición de rutas */}
      <Routes>
        {/* Ruta principal con Layout compartido */}
        <Route path="/" element={<Layout />}>
          {/* Rutas públicas */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="management" element={<Management />} />
          <Route path="login" element={<Login />} />
          
          {/* Rutas administrativas protegidas */}
          <Route path="admin">
            <Route path="bobedas" element={<AdminBobedas />} />
            <Route path="precios" element={<AdminPrecios />} />
            <Route path="reservas" element={<AdminReservas />} />
            <Route path="usuarios" element={<AdminUsuarios />} />
          </Route>
        </Route>
        {/* Ruta independiente para el chatbot */}
        <Route path="/chat" element={<ChatbotPage />} />
      </Routes>
      {/* Chatbot flotante disponible en todas las páginas */}
      <Chatbot />
    </Router>
  );
}

export default App;