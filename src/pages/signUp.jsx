import React, { useState } from 'react';
import './accounts.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
        <label htmlFor="name" className="form-label">Nombre del padre o encargado:</label>
        <input
          type="name"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="form-input"
        />

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

        <label htmlFor="phone" className="form-label">Número de contacto del padre o encargado:</label>
        <input
          type="phone"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="form-input"
        />

        <label htmlFor="password" className="form-label">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="form-input"
        />

        <label htmlFor="childName" className="form-label">Nombre del niño:</label>
        <input
          type="text"
          id="childName"
          name="childName"
          value={formData.childName}
          onChange={handleChange}
          required
          className="form-input"
        />

        <label htmlFor="childAge" className="form-label">Edad del niño:</label>
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
