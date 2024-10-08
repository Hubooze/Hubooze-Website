import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import "./Navbar.css";

// Import all images
import logo from '../Assets/images/Logo.png';
import straightLine from '../Assets/images/line.png';
import searchIcon from '../Assets/images/search.png';
import personIcon from '../Assets/images/Person.png';
import cartIcon from '../Assets/images/Cart.png';

function Navbar() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [navbarBg, setNavbarBg] = useState(false);

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const toggleLogin = () => {
    setLoginVisible(!loginVisible);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) { // Adjust this value as needed
        setNavbarBg(true);
      } else {
        setNavbarBg(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`header ${navbarBg ? 'navbar-scrolled' : ''}`}>
      <Link to="/"><img className="logo" alt="hubooze logo" src={logo} /></Link>
      <nav className="main-nav">
        <ul className="main-nav-list">
          <li><Link className="main-nav-link" to="/">Home</Link></li>
          <li><Link className="main-nav-link" to="/men">Men</Link></li>
          <li><Link className="main-nav-link" to="/women">Women</Link></li>
          <li><Link className="main-nav-link" to="/kids">Kids</Link></li>
          <li><img className="straight-line main-nav-img" alt="straight-line" src={straightLine} /></li>
          <li>
            <div id="search-container" className={`search-container ${searchVisible ? 'visible' : 'hidden'}`}>
              <input type="text" placeholder="Search..." />
            </div>
          </li>
          <li><img className="search main-nav-img" id="search-icon" alt="search-icon" src={searchIcon} onClick={toggleSearch} /></li>
          <li><img className="person main-nav-img" alt="Person-icon" src={personIcon} onClick={toggleLogin} /></li>
            <div className="containerforlogin" style={{ display: loginVisible ? "block" : "none" }}>
              <ul>
                <li><Link to="/login">SIGN UP</Link></li>
                <li><Link to="/login">LOGIN</Link></li>
                <li><a href="#">MY ACCOUNT</a></li>
              </ul>
            </div>
          <li><Link to="/cart"><img className="cart-home-page main-nav-img" alt="cart-icon" src={cartIcon} /></Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
