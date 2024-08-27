import React from "react";
import "./Footer.css";

// Importing images
import facebookIcon from '../Assets/images/youtube.png';
import twitterIcon from '../Assets/images/twitter.png';
import instagramIcon from '../Assets/images/instagram_icon.png';
import whatsappIcon from '../Assets/images/whatsapp_icon.png'; // Example additional icon

function Footer() {
  return (
    <footer>
      <div className="footer-section">
        <div className="footer-logo">
          {/* <img src={footerLogo} alt="Footer logo" /> */}
        </div>
        <div className="footer-nav">
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>
        <div className="footer-social">
          <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
          <a href="#"><img src={twitterIcon} alt="Twitter" /></a>
          <a href="#"><img src={instagramIcon} alt="Instagram" /></a>
          <a href="#"><img src={whatsappIcon} alt="WhatsApp" /></a> {/* Example additional social icon */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;