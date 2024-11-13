import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './editAccount.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const EditAccount = () => {
  const [userData, setUserData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    contrasena: '',
    avatar: '',
  });
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState('');
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
      await axios.put(
        'http://localhost:3001/user/update',
        { ...userData, avatar: selectedAvatar },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Perfil actualizado correctamente');
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
                    <span className="edit-icon">✏️</span>
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
                
                <label htmlFor="contrasena" className="form-label">Contraseña:</label>
                <input
                type="text"
                id="contrasena"
                name="contrasena"
                value={userData.contrasena}
                onChange={handleInputChange}
                className="form-input"
                />

                <button type="button" className="btn-login" onClick={handleSaveChanges}>Guardar Cambios</button>
        </form>
        </div>

        {/* Modal para seleccionar avatar */}
        <Modal 
        className='custom-modal'
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
