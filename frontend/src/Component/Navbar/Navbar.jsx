import React, { useState } from "react";
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

  const toggleSearch = () => {
    setSearchVisible(!searchVisible);
  };

  const toggleLogin = () => {
    setLoginVisible(!loginVisible);
  };

  return (
    <header className="header">
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
              <li><Link to="/loginSignup">SIGN IN</Link></li>
              <li><Link to="/loginSignup">LOGIN</Link></li>
              <li><a href="#">MY ACCOUNT</a></li>
            </ul>
          </div>
          <li><Link to="/cart"><img className="cart main-nav-img" alt="cart-icon" src={cartIcon} /></Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;








// import React, { useContext, useRef } from 'react'
// import "./Navbar.css";
// // import dropdown from '../Assets/dpimg.png'
// import { useState } from 'react';
// // import logo from "../Assets/logo.png";
// // import search_iconssss from "../Assets/search.png"
// // import cart_icone from '../Assets/cart_icon.png'
// import { Link } from 'react-router-dom';
// import { ShopContext } from '../../Context/ShopContext';
// import SearchIcon from '@mui/icons-material/Search';
// // import { IoIosArrowDropdownCircle } from "react-icons/io";

// const Navbar = () => {
//   // const [menu, setMenu] = useState("shop");
//   // const { getTotalcartItem } = useContext(ShopContext);
//   const menuref = useRef();
//   const dropDownToole = (e) => {
//     menuref.current.classList.toggle('nav-menu-visible')
//     e.target.classList.toggle('open');
//   }

//   return (
//     <div className='navbar'>
//       <div className='nav-logo'>
//         <Link to='/'>
//           {/* <img src={logo} alt="" /> */}
//         </Link>
//         <Link to='/' style={{ textDecoration: 'none' }}>
//           <p>Hubooze</p>
//         </Link>
//       </div>
//       <div className="search_name">
//       <input placeholder='Search ' className='search_icon' />
//       </div>
//       <SearchIcon className='search_name' />
     
//       {/* <img className="nav-drop-dwon" onClick={dropDownToole} src={dropdown} alt='' /> */}
//       <ul>
//       <li><Link to="/">Home</Link></li>
//       <li><Link to="/category/Men">Men</Link></li>
//       <li><Link to="/category/Women">Women</Link></li>
//       <li><Link to="/category/Kids">Kids</Link></li>
//     </ul>
//       <div className='nav-login-cart'>
//         {localStorage.getItem('auth-token') ? <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/') }}>Logout</button> : <Link to="/login"><button >Login</button></Link>}
//         {/* <Link to="/cart"><img src={cart_icone} alt="" /></Link> */}
//         {/* <div className="nav-cart-count">{getTotalcartItem()}</div> */}
//       </div>
//     </div>
//   )
// }

// export default Navbar