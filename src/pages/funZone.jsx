import React from 'react';

const Game = () => {
  const items = ['Simon Dice', 'Golpea al Topo', 'Tic Tac Toe'];

  return (
    <div>
      <h1 style={{ fontWeight: 'bold', textAlign: 'center' }}>Fun Zone</h1>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',height: '100vh' }}>
      <h3>Game Ideas</h3>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
      
    </div>
  );
};

export default Game;