import React, { useState } from 'react';
import './coach.css';

const CoachView = () => {
  const [formData, setFormData] = useState({
    childName: '',
    positiveAttitudeWhenNotChosen: '',
    positiveAttitudeWhenLosing: '',
    goodFaith: '',
    coexistenceLevel: 5, // Valor inicial
    comments: '',
    hoursPlayed: 0 // Valor inicial
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      {/* Encabezado fuera del formulario */}
      <h2>Registro de Comportamiento del Niño</h2>

      {/* Formulario */}
      <form>
        {/* Lista desplegable de los niños */}
        <label htmlFor="childName">Niño:</label>
        <select
          id="childName"
          name="childName"
          value={formData.childName}
          onChange={handleChange}
        >
          <option value="">Seleccionar</option>
          <option value="Niño 1">Niño 1</option>
          <option value="Niño 2">Niño 2</option>
          {/* Agrega más opciones según sea necesario */}
        </select>

        {/* Actitud positiva cuando no se eligió el juego */}
        <label>Actitud positiva cuando no se eligió el juego:</label>
        <select
          name="positiveAttitudeWhenNotChosen"
          value={formData.positiveAttitudeWhenNotChosen}
          onChange={handleChange}
        >
          <option value="">Seleccionar</option>
          <option value="Sí">Sí</option>
          <option value="No">No</option>
        </select>

        {/* Actitud positiva al perder */}
        <label>Actitud positiva al perder:</label>
        <select
          name="positiveAttitudeWhenLosing"
          value={formData.positiveAttitudeWhenLosing}
          onChange={handleChange}
        >
          <option value="">Seleccionar</option>
          <option value="Sí">Sí</option>
          <option value="No">No</option>
        </select>

        {/* Negocio de buena fe */}
        <label>Negocio de buena fe y cumplió acuerdos:</label>
        <select
          name="goodFaith"
          value={formData.goodFaith}
          onChange={handleChange}
        >
          <option value="">Seleccionar</option>
          <option value="Sí">Sí</option>
          <option value="No">No</option>
        </select>

        {/* Nivel de convivencia con un slider */}
        <label htmlFor="coexistenceLevel">Nivel de convivencia:</label>
        <input
          type="range"
          id="coexistenceLevel"
          name="coexistenceLevel"
          min="1"
          max="10"
          value={formData.coexistenceLevel}
          onChange={handleChange}
        />
        <span>{formData.coexistenceLevel} / 10</span>

        {/* Horas jugadas con un slider */}
        <label htmlFor="hoursPlayed">Horas jugadas:</label>
        <input
          type="range"
          id="hoursPlayed"
          name="hoursPlayed"
          min="0"
          max="5" // Ajusta según sea necesario
          value={formData.hoursPlayed}
          onChange={handleChange}
        />
        <span>{formData.hoursPlayed} horas</span>

        {/* Comentarios generales */}
        <label htmlFor="comments">Comentarios generales:</label>
        <textarea
          id="comments"
          name="comments"
          value={formData.comments}
          onChange={handleChange}
        ></textarea>

        {/* Botón para enviar el formulario */}
        <button className='but' type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default CoachView;
