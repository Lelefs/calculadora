import React from 'react';
import './styles.css';

export default ({ label, classButton, click }) => (
  <button
    className={`button ${classButton}`}
    onClick={e => click && click(label)}
  >
    {label}
  </button>
);
