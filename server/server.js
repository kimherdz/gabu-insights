const express = require('express');
const cors = require('cors');
const pool = require('./db'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;
const SECRET_KEY = 'marta1329'

// Middleware para manejar JSON
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Middleware para autenticar el token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Token faltante' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user; // Guardar los datos del usuario en la solicitud
    next();
  });
};

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
  const { fecha, act_eleccion_juego, act_perder, negociar, convivencia, comentarios, nino_id, coach_id, horas_juego } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO attendances (fecha, act_eleccion_juego, act_perder, negociar, convivencia, comentarios, nino_id, coach_id, horas_juego) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [fecha, act_eleccion_juego, act_perder, negociar, convivencia, comentarios, nino_id, coach_id, horas_juego]
    );
    res.status(201).json(result.rows[0]); // Devolver el registro creado
  } catch (err) {
    console.error('Error al registrar asistencia:', err);
    res.status(500).json({ error: 'Error al registrar asistencia' });
  }
});


// Ruta para obtener los comentarios de las asistencias de los hijos del padre logueado
app.get('/attendances/comments', authenticateToken, async (req, res) => {
  const parentId = req.user.id;
  try {
    const query = `
      SELECT c.nombre AS coach_name, a.comentarios 
      FROM attendances a 
      JOIN coaches c ON a.coach_id = c.id
      JOIN children ch ON a.nino_id = ch.id
      WHERE a.comentarios IS NOT NULL AND ch.padre_id = $1;
    `;
    const { rows } = await pool.query(query, [parentId]);
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener los comentarios:', err);
    res.status(500).json({ error: 'Error al obtener los comentarios' });
  }
});

// Ruta para obtener las habilidades adquiridas del hijo del padre logueado
app.get('/attendances/skills', authenticateToken, async (req, res) => {
  const parentId = req.user.id;
  try {
    const query = `
      SELECT SUM(act_perder) AS act_perder, 
             SUM(negociar) AS negociar, 
             SUM(act_eleccion_juego) AS act_eleccion_juego 
      FROM attendances a
      JOIN children ch ON a.nino_id = ch.id
      WHERE ch.padre_id = $1;
    `;
    const { rows } = await pool.query(query, [parentId]);
    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener los datos de habilidades:', err);
    res.status(500).json({ error: 'Error al obtener los datos de habilidades' });
  }
});

// Ruta para obtener las horas de juego por día de la semana
app.get('/game/hours', authenticateToken, async (req, res) => {
  const parentId = req.user.id;

  try {
    const query = `
      SELECT fecha, horas_juego 
      FROM attendances a
      JOIN children ch ON a.nino_id = ch.id
      WHERE ch.padre_id = $1 AND fecha >= NOW() - INTERVAL '7 days'
      ORDER BY fecha;
    `;
    const { rows } = await pool.query(query, [parentId]);
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener las horas de juego:', err);
    res.status(500).json({ error: 'Error al obtener las horas de juego' });
  }
});

// Ruta para obtener el nivel de convivencia por día de la semana
app.get('/game/coexistence', authenticateToken, async (req, res) => {
  const parentId = req.user.id;

  try {
    const query = `
      SELECT fecha, convivencia 
      FROM attendances a
      JOIN children ch ON a.nino_id = ch.id
      WHERE ch.padre_id = $1 AND fecha >= NOW() - INTERVAL '7 days'
      ORDER BY fecha;
    `;
    const { rows } = await pool.query(query, [parentId]);
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener el nivel de convivencia:', err);
    res.status(500).json({ error: 'Error al obtener el nivel de convivencia' });
  }
});

// Ruta para login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verificar si es padre
    const parentQuery = 'SELECT * FROM parents WHERE email = $1';
    const parentResult = await pool.query(parentQuery, [username]);

    if (parentResult.rows.length > 0) {
      const parent = parentResult.rows[0];
      const passwordMatch = await bcrypt.compare(password, parent.contrasena); // Verificar la contraseña

      if (passwordMatch) {
        const token = jwt.sign({ id: parent.id, role: 'parent' }, SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ token, role: 'parent' });
      } else {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
    }

    // Verificar si es un coach
    const coachQuery = 'SELECT * FROM coaches WHERE email = $1';
    const coachResult = await pool.query(coachQuery, [username]);

    if (coachResult.rows.length > 0) {
      const coach = coachResult.rows[0];
      const passwordMatch = await bcrypt.compare(password, coach.contrasena); // Verificar la contraseña

      if (passwordMatch) {
        const token = jwt.sign({ id: coach.id, role: 'coach' }, SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ token, role: 'coach' });
      } else {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
    }

    return res.status(404).json({ message: 'Usuario no encontrado' });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
