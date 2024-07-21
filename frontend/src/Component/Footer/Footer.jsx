import React from 'react'
import './Footer.css';
import { Link } from 'react-router-dom';
import footer_logo_img from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';


const Footer = () => {
  return (

      <div className='footer'>
        <div className="footerlogo">

          <Link to='/' style={{ textDecoration: 'none' }}>
            <p>Hubooze</p>
          </Link>
      </div>

      <div className="footer-links">
        <Link to="/about" style={{ textDecoration: 'none' }}>About</Link>
        <Link to="/contact" style={{ textDecoration: 'none' }}>Contact</Link>
        <Link to="/company-policy" style={{ textDecoration: 'none' }}>Company Policy</Link>
        <Link to="/terms-and-conditions" style={{ textDecoration: 'none' }}>Terms and Conditions</Link>
        <Link to="/press-releases" style={{ textDecoration: 'none' }}>Press Releases</Link>
      </div>

      <div className="footer-links">
        <div className="social-icons">
          <div className="footer-icon-container">
            <img src={instagram_icon} alt='' />
          </div>

            {/* <div className="footer-icon-container">
              <img src={linkedin_icon} alt='' />
            </div> */}

            <div className="footer-icon-container">
              <img src={whatsapp_icon} alt='' />
            </div>
          </div>
        </div>

        <div className="footer-copyright">
          <hr />
          <p> Copyright @ 2024 -All Right Reserved.</p>
        </div>
    </div>

  );

};


export default Footer;
  