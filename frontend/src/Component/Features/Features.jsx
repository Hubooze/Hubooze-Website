import React from "react";
import "./Features.css";
import Facility1 from '../Assets/images/Facility1.jpeg' 
import Facility2 from '../Assets/images/Facility2.jpeg'
import Facility3 from '../Assets/images/Facility3.jpeg'

function Features() {
  return (
    <section className="features-section">
      <div className="feature">
        <img src={Facility1} alt="Feature 1" />
        {/* <img src="images/feature1.png" alt="Feature 1" /> */}
        <h3>Fast Delivery</h3>
        <p>Get your orders delivered in record time.</p>
      </div>
      <div className="feature">
        <img src={Facility2} alt="Feature 2" />
        {/* <img src="images/feature2.png" alt="Feature 2" /> */}
        <h3>Quality Assurance</h3>
        <p>We guarantee the quality of our products.</p>
      </div>
      <div className="feature">
        <img src={Facility3} alt="Feature 3" />
        {/* <img src="images/feature3.png" alt="Feature 3" /> */}
        <h3>24/7 Support</h3>
        <p>Our support team is available around the clock.</p>
      </div>
    </section>
  );
}

export default Features;
