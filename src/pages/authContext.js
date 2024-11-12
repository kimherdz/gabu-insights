import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Obtener el rol desde el token si está guardado
    const token = localStorage.getItem('token');
    if (token) {
      // Decodificar o obtener el rol desde el token
      const userRole = JSON.parse(atob(token.split('.')[1])).role; 
      setRole(userRole);
    }
  }, []);

  const updateRole = (newRole) => {
    setRole(newRole);
  };

  return (
    <AuthContext.Provider value={{ role, updateRole }}>
      {children}
    </AuthContext.Provider>
  );
};
