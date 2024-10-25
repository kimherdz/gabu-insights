import React, { useState } from 'react';
import './accounts.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    childName: '',
    childAge: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías manejar el envío de los datos (por ejemplo, enviarlos a un servidor)
    console.log(formData);
  };

  return (
    <div className="signup-container">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <label htmlFor="email" className="form-label">Correo del padre o encargado:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="form-input"
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="childName">Nombre del niño:</label>
        <input
          type="text"
          id="childName"
          name="childName"
          value={formData.childName}
          onChange={handleChange}
          required
        />

        <label htmlFor="childAge" >Edad del niño:</label>
        <input
          type="number"
          id="childAge"
          name="childAge"
          value={formData.childAge}
          onChange={handleChange}
          required
          className="form-input"
        />

        <button type="submit" className="btn-login">Registrar</button>
      </form>
    </div>
  );
};

export default SignUp;
