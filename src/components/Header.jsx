import React from 'react';
import { Link } from 'react-router-dom'; // If you're using react-router for navigation
import './../style/Header.css'; // Import the CSS file for styling

const Header = () => {
  return (
    <header className="header">
      <div className="header-title">
        <Link to="/" className="site-title">Matthijs Holland</Link>
      </div>
      <div className="menu-icon">
        <button className="menu-button" onClick={() => alert('Menu Clicked')}>
          ☰ {/* This is a simple hamburger menu icon */}
        </button>
      </div>
    </header>
  );
};

export default Header;
