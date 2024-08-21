import React, { useContext, useRef } from 'react'
import "./Navbar.css";
import dropdown from '../Assets/dpimg.png'
import { useState } from 'react';
import logo from "../Assets/logo.png";
import search_iconssss from "../Assets/search.png"
import cart_icone from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import SearchIcon from '@mui/icons-material/Search';
// import { IoIosArrowDropdownCircle } from "react-icons/io";

const Navbar = () => {
  // const [menu, setMenu] = useState("shop");
  // const { getTotalcartItem } = useContext(ShopContext);
  const menuref = useRef();
  const dropDownToole = (e) => {
    menuref.current.classList.toggle('nav-menu-visible')
    e.target.classList.toggle('open');
  }

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <Link to='/'>
          <img src={logo} alt="" />
        </Link>
        <Link to='/' style={{ textDecoration: 'none' }}>
          <p>Hubooze</p>
        </Link>
      </div>
      <div className="search_name">
      <input placeholder='Search ' className='search_icon' />
      </div>
      <SearchIcon className='search_name' />
     
      <img className="nav-drop-dwon" onClick={dropDownToole} src={dropdown} alt='' />
      <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/category/Men">Men</Link></li>
      <li><Link to="/category/Women">Women</Link></li>
      <li><Link to="/category/Kids">Kids</Link></li>
    </ul>
      <div className='nav-login-cart'>
        {localStorage.getItem('auth-token') ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button> : <Link to="/login"><button >Login</button></Link>}
        <Link to="/cart"><img src={cart_icone} alt="" /></Link>
        {/* <div className="nav-cart-count">{getTotalcartItem()}</div> */}
      </div>
    </div>
  )
}

export default Navbar