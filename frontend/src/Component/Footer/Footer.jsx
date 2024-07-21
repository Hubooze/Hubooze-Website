import React from 'react'
import './Footer.css';
import { Link, Route, Routes } from 'react-router-dom';
import footer_logo_img from '../Assets/logo_big.png'
import instagram_icon from '../Assets/instagram_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

import About from '../../Pages/About';
import Contact from '../../Pages/Contact';
import CompanyPolicy from '../../Pages/CompanyPolicy';
import TermsAndConditions from '../../Pages/TermsAndConditions';
import PressRelease from '../../Pages/PressRelease'


const Footer = () => {
  return (

    <>

      <Routes>
      <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/company-policy" element={<CompanyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/press-releases" element={<PressRelease />} />
      </Routes>

      <div className='footer'>
        <div className="footerlogo">

          <Link to='/' style={{ textDecoration: 'none' }}>
            <p>Hubooze</p>
          </Link>

      
      <div className="footer-social-icon">
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
         

        <div className="footer-copyright">
          <hr />
          <p> Copyright @ 2024 -All Right Reserved.</p>
        </div>
    </div>

    </> 

  );

};


export default Footer;
  