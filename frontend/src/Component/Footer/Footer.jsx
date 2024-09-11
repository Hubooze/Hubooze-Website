import React from "react";
import "./Footer.css";

// Importing images
// Importing images
import linkedinIcon from '../Assets/images/linkdein.png';
import twitterIcon from '../Assets/images/twitter.png';
import instagramIcon from '../Assets/images/instagram_icon.png';
import whatsappIcon from '../Assets/images/whatsapp_icon.png'; // Example additional icon
import youtubeIcon from '../Assets/images/youtube.png'

function Footer() {
  return (
    <>
    
  <footer>
    <div className="wrapper">
      <div className="footer">
        <div className="social-icons">
          <div className="footer-icon-container">
            <a href="#"><img src={instagramIcon} alt="Instagram"/></a>
          </div>
          <div className="footer-icon-container">
            <a href="#"><img src={whatsappIcon} alt="WhatsApp"/></a>
          </div>
          <div className="footer-icon-container">
            <a href="#"><img src={twitterIcon} alt="Twitter"/></a>
          </div>
          <div className="footer-icon-container">
            <a href="#"><img src={linkedinIcon} alt="facebook"/></a>
          </div>
          <div className="footer-icon-container">
            <a href="#"><img src={youtubeIcon} alt="youtube"/></a>
          </div>
        </div>

        <div className="footer-links">
          <a href="/about">ABOUT US</a>
          <a href="/careers">CAREERS</a>
          <a href="/employees">EMPLOYEES</a>
          <a href="/policy">POLICY</a>
          <a href="/terms-and-conditions">TERMS & CONDITIONS</a>
          <a href="/press-releases">PRESS RELEASE</a>
          <a href="/blogs">BLOGS</a>
        </div>

        <div className="footerlogo">
          <a href="/" className="footer-logo-link">
            <p>Hubooze.in</p>
          </a>
        </div>

        <div className="footer-copyright">
          <hr />
          <p>Copyright @ 2024 - All Rights Reserved.</p>
          <p>Powered by hubooze</p>
        </div>

      </div>
    </div>
  </footer>
    </>
  );
}

export default Footer;