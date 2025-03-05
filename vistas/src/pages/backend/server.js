// server.js
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuración actualizada de la conexión
const dbConfig = {
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'san_agustin_db'
};

// Crear pool de conexiones
const pool = mysql.createPool(dbConfig);

// Verificar conexión con la base de datos
pool.getConnection()
  .then(connection => {
    console.log('Conectado exitosamente a la base de datos san_agustin_db');
    connection.release();
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
  });
