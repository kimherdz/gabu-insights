import React, { useContext } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; 
import './navbar.css';
import { AuthContext } from '../authContext';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);


  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
    window.location.reload();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg"> 
      <img src={'https://storage.cloud.google.com/mi-app-img/logo.png'} alt="Logo" className="nav-imagelogo" />
      <Navbar.Toggle aria-controls="navbar-nav" /> 
      <Navbar.Collapse id="navbar-nav">
        <Nav className="me-auto"> 
          
          {/* Home (Visible para todos) */}
          <div className="nav-item-container">
            <Nav.Link as={Link} to="/" className="nav-link-with-image">
              <img src={'https://storage.cloud.google.com/mi-app-img/home.png'} alt="Home" className="nav-image" />
              <span className="hover-text">Home</span>
            </Nav.Link>
          </div>

          {/* Vistas condicionales */}
          {role === 'parent' && (
            <>
              <div className="nav-item-container">
                <Nav.Link as={Link} to="/parenting" className="nav-link-with-image">
                  <img src={'https://storage.cloud.google.com/mi-app-img/parenting.png'} alt="Parenting" className="nav-image" />
                  <span className="hover-text">Parenting</span>
                </Nav.Link>
              </div>
              <div className="nav-item-container">
                <Nav.Link as={Link} to="/gameTime" className="nav-link-with-image">
                  <img src={'https://storage.cloud.google.com/mi-app-img/gameTime.png'} alt="Tiempo de Juego" className="nav-image" />
                  <span className="hover-text">Tiempo de Juego</span>
                </Nav.Link>
              </div>
              <div className="nav-item-container">
                <Nav.Link as={Link} to="/social" className="nav-link-with-image">
                  <img src={'https://storage.cloud.google.com/mi-app-img/social.png'} alt="Interacciones Sociales" className="nav-image" />
                  <span className="hover-text">Foro Gabu</span>
                </Nav.Link>
              </div>
              <div className="nav-item-container">
                <Nav.Link as={Link} to="/funZone" className="nav-link-with-image">
                  <img src={'https://storage.cloud.google.com/mi-app-img/game.png'} alt="FunZone" className="nav-image" />
                  <span className="hover-text">Fun Zone</span>
                </Nav.Link>
              </div>
            </>
          )}

          {role === 'coach' && (
            <>
              <Nav.Link as={Link} to="/coachesView">Registro de niños</Nav.Link>
              <Nav.Link as={Link} to="/fullReport">Reporte completo</Nav.Link>
              <Nav.Link as={Link} to="/social">Foro</Nav.Link>
            </>
          )}

          {role === 'admin' && (
            <>
              <Nav.Link as={Link} to="/viewAllReports">Ver todos los reportes</Nav.Link>
              <Nav.Link as={Link} to="/registerUsers">Registro de nuevos usuarios</Nav.Link>
              <Nav.Link as={Link} to="/viewUsers">Ver todos los usuarios</Nav.Link>
            </>
          )}
        </Nav>

        {/* Botones adicionales */}
        <Nav className="ml-auto">
          <Button variant="outline-light" href="https://playgabu.com/es/old-home" target="_blank">Get Early Access</Button>
          <Button variant="outline-light" as={Link} to="/login">Login</Button>
          <Button variant="outline-light" onClick={handleLogout}>Log Out</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
