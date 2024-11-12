import React from 'react';
import { useNavigate } from 'react-router-dom';
import './fun.css';

import parentImage from '../img/parents.png';
import coachImage from '../img/coach.png';
import kidImage from '../img/ninos.png';

const ViewUsers = () => {
  const navigate = useNavigate();

  const redirectToRegis = (path) => {
    navigate(path);
  };

  return (
    <div className='container'>
      <img
        src={parentImage}
        alt="Papas"
        onClick={() => redirectToRegis('/admins/viewPapas')}
        className='responsive-img'
        
      />
      <img
        src={coachImage}
        alt="Coaches"
        onClick={() => redirectToRegis('/admins/viewCoaches')}
        className='responsive-img'
        
      />
      <img
        src={kidImage}
        alt="Coaches"
        onClick={() => redirectToRegis('/admins/viewKids')}
        className='responsive-img'
        
      />
      
    </div>
  );
};

export default ViewUsers;