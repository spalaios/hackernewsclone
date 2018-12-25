import React from 'react';
import './button.css';

const Button = ({ handleClick }) => {
  return ( 
    <button type="button" className="more-button mt-3 mb-2 cursor" onClick={handleClick}>More</button>
  );
};
export default Button;