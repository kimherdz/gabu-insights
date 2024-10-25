const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Asegúrate de que la ruta a tu archivo db.js sea correcta

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para manejar JSON
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Ruta para obtener todos los niños
app.get('/children', async (req, res) => {
  try {
    const query = 'SELECT id, nombre FROM children';
    const { rows } = await pool.query(query);
    res.json(rows); // Asegúrate de enviar la respuesta en formato JSON
  } catch (error) {
    console.error('Error al obtener la lista de niños:', error);
    res.status(500).json({ message: 'Error al obtener la lista de niños' });
  }
});

// Ruta para obtener todos los entrenadores
app.get('/coaches', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM coaches');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error al obtener entrenadores:', err);
    res.status(500).json({ error: 'Error al obtener entrenadores' });
  }
});

// Ruta para registrar asistencia
app.post('/attendances', async (req, res) => {
  const { fecha, act_eleccion_juego, act_perder, negociar, convivencia, comentarios, nino_id, coach_id } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO attendances (fecha, act_eleccion_juego, act_perder, negociar, convivencia, comentarios, nino_id, coach_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [fecha, act_eleccion_juego, act_perder, negociar, convivencia, comentarios, nino_id, coach_id]
    );
    res.status(201).json(result.rows[0]); // Devolver el registro creado
  } catch (err) {
    console.error('Error al registrar asistencia:', err);
    res.status(500).json({ error: 'Error al registrar asistencia' });
  }
});


// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
