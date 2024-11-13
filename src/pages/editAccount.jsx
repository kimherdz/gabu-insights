import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './editAccount.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { AuthContext } from './authContext';

const EditAccount = () => {
  const { avatar, setAvatar } = useContext(AuthContext); // Para actualizar el avatar en el navbar
  const [userData, setUserData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    nuevaContrasena: '', // Nuevo campo para la contraseña
    avatar: '',
  });
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(avatar); // Inicializamos con el avatar del contexto
  const [showAvatarModal, setShowAvatarModal] = useState(false);

  useEffect(() => {
    // Cargar datos del usuario y avatares
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
        setSelectedAvatar(response.data.avatar);
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
      }
    };

    const fetchAvatars = async () => {
      const response = await axios.get('http://localhost:3001/avatars');
      setAvatars(response.data);
    };

    fetchUserData();
    fetchAvatars();
  }, []);

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAvatarChange = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      const updatedData = {
        ...userData,
        avatar: selectedAvatar,
      };

      // Solo enviamos la nueva contraseña si el usuario la ingresó
      if (userData.nuevaContrasena) {
        updatedData.contrasena = userData.nuevaContrasena;
      }

      await axios.put(
        'http://localhost:3001/user/update',
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert('Perfil actualizado correctamente');
      setAvatar(selectedAvatar); // Actualizamos el avatar en el contexto
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      alert('Hubo un error al actualizar el perfil');
    }
  };

  return (
    <div>
      <div className="signup-container">
        <h2>Editar Perfil</h2>
        <form className="signup-form">

          <div className="avatar-selection">
            <div onClick={() => setShowAvatarModal(true)}>
              <img
                className='default-avatar'
                src={selectedAvatar || 'https://storage.cloud.google.com/mi-app-img/defaultAvatar.png'}
                alt="Avatar"
                style={{ width: '10rem', height: '10rem', borderRadius: '100%' }}
              />
            </div>
          </div>

          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={userData.nombre}
            onChange={handleInputChange}
            className="form-input"
          />

          <label htmlFor="email" className="form-label">Correo:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            className="form-input"
          />

          <label htmlFor="telefono" className="form-label">Teléfono:</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={userData.telefono}
            onChange={handleInputChange}
            className="form-input"
          />
          
          <label htmlFor="nuevaContrasena" className="form-label">Nueva Contraseña:</label>
          <input
            type="password"
            id="nuevaContrasena"
            name="nuevaContrasena"
            value={userData.nuevaContrasena}
            onChange={handleInputChange}
            className="form-input"
            placeholder="Ingresa una nueva contraseña"
          />

          <button type="button" className="btn-login" onClick={handleSaveChanges}>Guardar Cambios</button>
        </form>
      </div>

      {/* Modal para seleccionar avatar */}
      <Modal 
        dialogClassName='custom-modal'
        centered
        show={showAvatarModal} 
        onHide={() => setShowAvatarModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Seleccionar Avatar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='div-avatars'>
            {avatars.map((avatarUrl) => (
              <img
                className='img-avatar'
                key={avatarUrl}
                src={avatarUrl}
                alt="Avatar"
                onClick={() => handleAvatarChange(avatarUrl)}
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAvatarModal(false)}>
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setUserData({ ...userData, avatar: selectedAvatar });
              setShowAvatarModal(false);
            }}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditAccount;
