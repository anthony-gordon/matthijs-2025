import React from 'react';
import './../style/Header.css'; // Import the CSS file for styling
import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { useItems } from './../ItemContext';
import {disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks} from "body-scroll-lock";

const Header = () => {
  const { menuOpen, setMenuOpen } = useItems();
  const menuRef = useRef(null);


  const handleMenuOpenClose = function(){
    setMenuOpen(menuOpen == true ? false : true)
  }

  useEffect(() => {
    console.log('change')
    const target = menuRef.current;
    console.log('target', target)
    if (menuOpen && target) {
      disableBodyScroll(target);
    } else {
      enableBodyScroll(target);
    }

    // Clean up on unmount
    return () => {
      clearAllBodyScrollLocks();
    };
  }, [menuOpen]);

  return (
    <>
      <header className="header">
        <div className="header-title">
          <Link to="/" className="site-title">Matthijs Holland</Link>
        </div>
        <div className="menu-icon">
          <button className="menu-button" data-open={menuOpen} onClick={handleMenuOpenClose}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
          </button>
        </div>
      </header>
      <nav ref={menuRef} data-open={menuOpen} className="header__slide-out-nav">
        <div className="header__slide-out-nav-inner page-container">
          <Link to="/">Home</Link>
          <Link to="/contact" >Contact</Link>
          <Link to="/personal-statement">Personal Statement</Link>
          </div>
      </nav>
    </>
  );
};

export default Header;
