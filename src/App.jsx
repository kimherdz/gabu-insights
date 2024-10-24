import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // react-router-dom v6
import NavigationBar from './pages/navbar/navbar'; // Importamos la barra de navegación
import Home from './pages/home'; // Importamos la página de Home
import Parenting from './pages/parenting'; // Importamos la página de Parenting
import GameTime from './pages/gameTime'; // Importamos la página de Tiempo de Juego
import Social from './pages/social'; // Importamos la página de Interacciones Sociales
import Game from './pages/game'; // Importamos la página de Juego Educativo
import Login from './pages/login';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar /> {/* La barra de navegación siempre visible */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Ruta para la página principal */}
          <Route path="/parenting" element={<Parenting />} /> {/* Ruta para la página de Parenting */}
          <Route path="/gameTime" element={<GameTime />} /> {/* Ruta para la página de Tiempo de Juego */}
          <Route path="/social" element={<Social />} /> {/* Ruta para la página de Interacciones Sociales */}
          <Route path="/game" element={<Game />} />
          <Route path="/login" element={<Login />} /> {/* Ruta para la página de Juego Educativo */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
