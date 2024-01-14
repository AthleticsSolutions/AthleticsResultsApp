import React from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const HamburgerMenu = ({ isOpen, onClick, size }) => {
  return (
    <div className="hamburger-menu" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={onClick}>
        {isOpen ? <FiX /> : <FiMenu />}
      </div>
    </div>
  );
};

export default HamburgerMenu;