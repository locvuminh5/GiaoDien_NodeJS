// CustomAlert.js

import React from 'react';
import '../CSS/CustomAlert.css';

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="custom-alert">
      <div className="alert-content">
        <span>{message}</span>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CustomAlert;
