import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambiado a useNavigate
import './accounts.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Hook de navigate para la redirección

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Username:', username, 'Password:', password);

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Maneja la redirección según el rol
        if (data.role === 'parent') {
          navigate('/dashboard'); // Redirige a la vista de padres
        } else if (data.role === 'coach') {
          navigate('/coachesView'); // Redirige a la vista de entrenadores
        }
      } else {
        // Muestra un mensaje de error
        alert(data.message);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Correo Electrónico</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="show-password-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </button>
          </div>
        </div>
        <button type="submit" className="btn-login">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
