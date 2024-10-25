import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import './navbar.css';

import homeImage from '../../img/home.png';
import parentingImage from '../../img/parenting.png';
import gameTimeImage from '../../img/gameTime.png';
import socialImage from '../../img/social.png';
import gameImage from '../../img/game.png';
import logoImage from '../../img/logo.png';

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg"> 
      <img src={logoImage} alt="Logo" className="nav-imagelogo" />
      <Navbar.Toggle aria-controls="navbar-nav" /> 
      <Navbar.Collapse id="navbar-nav">
        <Nav className="me-auto"> 
          
        {/* Home */}
        <div className="nav-item-container">
            <Nav.Link as={Link} to="/" className="nav-link-with-image">
              <img src={homeImage} alt="Home" className="nav-image" />
              <span className="hover-text">Home</span>
            </Nav.Link>
          </div>

          {/* Parenting */}
          <div className="nav-item-container">
            <Nav.Link as={Link} to="/parenting" className="nav-link-with-image">
              <img src={parentingImage} alt="Parenting" className="nav-image" />
              <span className="hover-text">Parenting</span>
            </Nav.Link>
          </div>

          {/* Tiempo de Juego */}
          <div className="nav-item-container">
            <Nav.Link as={Link} to="/gameTime" className="nav-link-with-image">
              <img src={gameTimeImage} alt="Tiempo de Juego" className="nav-image" />
              <span className="hover-text">Tiempo de Juego</span>
            </Nav.Link>
          </div>

          {/*Foro Gabu */}
          <div className="nav-item-container">
            <Nav.Link as={Link} to="/social" className="nav-link-with-image">
              <img src={socialImage} alt="Interacciones Sociales" className="nav-image" />
              <span className="hover-text">Foro Gabu</span>
            </Nav.Link>
          </div>

          {/* Gamming */}
          <div className="nav-item-container">
            <Nav.Link as={Link} to="/game" className="nav-link-with-image">
              <img src={gameImage} alt="Gamming" className="nav-image" />
              <span className="hover-text">Gamming</span>
            </Nav.Link>
          </div>
        </Nav>

        {/* Botones adicionales */}
        <Nav className="ml-auto">
          <Button variant="outline-light" href="https://playgabu.com/es/old-home" target="_blank">Get Early Access</Button>
          <Button variant="outline-light" as={Link} to="/login">Login</Button>
          <Button variant="outline-light" as={Link} to="/signup">Sign Up</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
