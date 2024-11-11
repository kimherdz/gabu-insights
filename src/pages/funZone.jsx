import React from 'react';
import { useNavigate } from 'react-router-dom';
import './fun.css';

import simonImage from '../img/simon.png';
import moleImage from '../img/mole.png';
import tictactoeImage from '../img/tictactoe.png';

const FunZone = () => {
  const navigate = useNavigate();

  const redirectToGame = (path) => {
    navigate(path);
  };

  return (
    <div className='container'>
      <img
        src={simonImage} 
        alt="Simón Dice"
        onClick={() => redirectToGame('/games/simon')}
        className='responsive-img'
        
      />
      <img
        src={moleImage} 
        alt="Golpea al Topo"
        onClick={() => redirectToGame('/golpea-al-topo')}
        className='responsive-img'
        
      />
      <img
        src={tictactoeImage} 
        alt="Tic Tac Toe"
        onClick={() => redirectToGame('/tic-tac-toe')}
        className='responsive-img'
        
      />
    </div>
  );
};

export default FunZone;