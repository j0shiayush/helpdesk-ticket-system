import React from 'react';

const Logo = ({ width = 40, height = 40 }) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ marginRight: '10px' }}
  >
    <path d="M50 10 L15 90 h20 L50 50 l15 40 h20 Z" fill="#3498db"/>
    <line x1="35" y1="70" x2="65" y2="70" stroke="white" strokeWidth="8" strokeLinecap="round"/>
    <circle cx="50" cy="30" r="8" fill="#e74c3c" />
  </svg>
);

export default Logo;