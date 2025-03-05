/**
 * Módulo de utilidades para interacción con la API
 * Centraliza todas las llamadas a la API del backend
 */

import axios from 'axios';

// URL base para las peticiones API
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173';

/**
 * Objeto que contiene todas las funciones de interacción con la API
 * Proporciona una interfaz unificada para todas las operaciones del backend
 */

export const api = {
  /**
   * Autenticación de usuario
   * @param email - Correo electrónico del usuario
   * @param password - Contraseña del usuario
   * @returns Promise con los datos del usuario autenticado
   */
  login: async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  },

  /**
   * Obtiene la lista de bóvedas
   * @returns Promise con la lista de bóvedas disponibles
   */
  getBobedas: async () => {
    const response = await axios.get(`${API_URL}/bobedas`);
    return response.data;
  },

  /**
   * Obtiene la lista de precios
   * @returns Promise con la lista de precios actuales
   */
  getPrecios: async () => {
    const response = await axios.get(`${API_URL}/precios`);
    return response.data;
  },

  /**
   * Obtiene la lista de reservas
   * @returns Promise con la lista de reservas realizadas
   */
  getReservas: async () => {
    const response = await axios.get(`${API_URL}/reservas`);
    return response.data;
  },

  /**
   * Crea una nueva reserva
   * @param data - Datos de la reserva a crear
   * @returns Promise con los datos de la reserva creada
   */
  createReserva: async (data: any) => {
    const response = await axios.post(`${API_URL}/reservas`, data);
    return response.data;
  },

  /**
   * Obtiene la lista de usuarios
   * @returns Promise con la lista de usuarios registrados
   */
  getUsuarios: async () => {
    const response = await axios.get(`${API_URL}/usuarios`);
    return response.data;
  },

  /**
   * Crea un nuevo usuario
   * @param data - Datos del usuario a crear
   * @returns Promise con los datos del usuario creado
   */
  createUsuario: async (data: any) => {
    const response = await axios.post(`${API_URL}/usuarios`, data);
    return response.data;
  },

  /**
   * Crea una nueva bóveda
   * @param data - Datos de la bóveda a crear
   * @returns Promise con los datos de la bóveda creada
   */
  createBobeda: async (data: any) => {
    const response = await axios.post(`${API_URL}/bobedas`, data);
    return response.data;
  }
};
