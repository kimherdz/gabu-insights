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
app.post('/attendances', authenticateToken, async (req, res) => {
  const coachId = req.user.id; // Extrae el ID del coach desde el token
  const { nino_id, act_eleccion_juego, act_perder, negociar, convivencia, comentarios, fecha, horas_juego } = req.body;

  try {
    const query = `
      INSERT INTO attendances (nino_id, act_eleccion_juego, act_perder, negociar, convivencia, comentarios, fecha, horas_juego, coach_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const values = [nino_id, act_eleccion_juego, act_perder, negociar, convivencia, comentarios, fecha, horas_juego, coachId];

    const result = await pool.query(query, values);
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al registrar la asistencia:', err);
    res.status(500).json({ error: 'Error al registrar la asistencia' });
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
    // Verificar si el usuario es un padre
    const parentQuery = 'SELECT * FROM parents WHERE email = $1';
    const parentResult = await pool.query(parentQuery, [username]);

    if (parentResult.rows.length > 0) {
      const parent = parentResult.rows[0];

      // Verificar si el usuario está activo
      if (!parent.status) {
        return res.status(401).json({ message: 'Usuario no activo' });
      }

      const passwordMatch = await bcrypt.compare(password, parent.contrasena); // Verificar la contraseña

      if (passwordMatch) {
        const token = jwt.sign({ id: parent.id, role: 'parent' }, SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ token, role: 'parent' });
      } else {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }


    }

    // Verificar si el usuario es un coach
    const coachQuery = 'SELECT * FROM coaches WHERE email = $1';
    const coachResult = await pool.query(coachQuery, [username]);

    if (coachResult.rows.length > 0) {
      const coach = coachResult.rows[0];

      // Verificar si el usuario está activo
      if (!coach.status) {
        return res.status(401).json({ message: 'Usuario no activo' });
      }

      const passwordMatch = await bcrypt.compare(password, coach.contrasena); // Verificar la contraseña

      if (passwordMatch) {
        const token = jwt.sign({ id: coach.id, role: 'coach' }, SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ token, role: 'coach' });
      } else {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }


    }

    // Verificar si el usuario es un admin
    const adminQuery = 'SELECT * FROM admins WHERE email = $1';
    const adminResult = await pool.query(adminQuery, [username]);

    if (adminResult.rows.length > 0) {
      const admin = adminResult.rows[0];

      // Verificar la contraseña
      const passwordMatch = await bcrypt.compare(password, admin.contrasena);
      if (passwordMatch) {
        const token = jwt.sign({ id: admin.id, role: 'admin' }, SECRET_KEY, { expiresIn: '1h' });
        return res.status(200).json({ token, role: 'admin' });
      } else {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
    }

    // Si no se encuentra el usuario en ninguna tabla
    res.status(404).json({ message: 'Usuario no encontrado' });
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});

// Ruta para obtener los registros de asistencia del coach logueado
app.get('/coach/attendances', authenticateToken, async (req, res) => {
  const coachId = req.user.id;

  try {
    const query = `
      SELECT a.id, ch.nombre AS nombre_nino, a.act_eleccion_juego, a.act_perder, a.negociar, 
             a.convivencia, a.comentarios, a.fecha, a.horas_juego
      FROM attendances a
      JOIN children ch ON a.nino_id = ch.id
      WHERE a.coach_id = $1
      ORDER BY a.fecha DESC;
    `;
    const { rows } = await pool.query(query, [coachId]);
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener los registros de asistencia:', err);
    res.status(500).json({ error: 'Error al obtener los registros de asistencia' });
  }
});

//Ruta para actualizar la asistencia del coach logueado
app.put('/coach/attendance/update', authenticateToken, async (req, res) => {
  const { id, data } = req.body;

  try {
    // Construimos la consulta dinámicamente solo con los campos presentes en 'data'
    const fields = Object.keys(data).map((key, index) => `${key} = $${index + 1}`);
    const values = Object.values(data);

    const query = `
      UPDATE attendances
      SET ${fields.join(', ')}
      WHERE id = $${fields.length + 1}
    `;
    
    // Agregamos el ID al final de los valores
    await pool.query(query, [...values, id]);

    res.json({ message: 'Registro actualizado exitosamente' });
  } catch (err) {
    console.error('Error al actualizar el registro:', err);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
});




// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
