import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import NavigationBar from './pages/navbar/navbar'; 
import Home from './pages/home'; 
import Parenting from './pages/parenting'; 
import GameTime from './pages/gameTime';
import Social from './pages/social'; 
import FunZone from './pages/funZone'; 
import Login from './pages/login';
import SignUp from './pages/signUp';
import CoachView from './pages/coaches/coachesView';
import Simon from './pages/games/simon';
import Mole from './pages/games/mole';

function App() {
  return (
    <Router>
      <div className="App">
        <NavigationBar /> 
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/parenting" element={<Parenting />} /> 
          <Route path="/gameTime" element={<GameTime />} /> 
          <Route path="/social" element={<Social />} /> 
          <Route path="/funZone" element={<FunZone />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/coachesView" element={<CoachView />} /> 
          <Route path="/SignUp" element={<SignUp />} />

          <Route path="/games/simon" element={<Simon />} />
          <Route path="/games/mole" element={<Mole />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
