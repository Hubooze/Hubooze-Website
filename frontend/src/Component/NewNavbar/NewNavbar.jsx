import React, { useContext } from 'react';
import './NewNavbar.css';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';
// import user_icon from '../Assets/user_icon.png';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const { getTotalcartItem } = useContext(ShopContext);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="Hubooze" className="logo" />
        </Link>
        <Link to="/" className="logo-text">Hubooze</Link>
        <p className="tagline">AB BADLEGA BHARAT</p>
      </div>
      <div className="nav-links">
        <Link to="/">Shop</Link>
        <Link to="/mens">Men</Link>
        <Link to="/womens">Women</Link>
        <Link to="/kids">Kids</Link>
      </div>
      <div className="nav-actions">
        <div className="cart-icon-container">
          <Link to="/cart">
            <img src={cart_icon} alt="Cart" className="nav-icon" />
          </Link>
          <div className="cart-count">{getTotalcartItem()}</div>
        </div>
        {localStorage.getItem('auth-token') ? (
          <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/'); }}>
            Logout
          </button>
        ) : (
          <Link to="/login"><button>Login</button></Link>
        )}
        {/* <div className="user-icon-container">
          <Link to="/profile">
            <img src={user_icon} alt="User" className="user-icon" />
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Navbar;
