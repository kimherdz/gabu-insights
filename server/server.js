const express = require('express');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para manejar JSON
app.use(express.json());

// Ruta de ejemplo para probar la conexión
app.get('/test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()'); // Consulta simple
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error al ejecutar la consulta', err);
    res.status(500).send('Error en la base de datos');
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
