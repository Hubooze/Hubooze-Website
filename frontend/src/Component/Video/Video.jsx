import React from "react";
import Video from '../Assets/images/Video.mp4'
import "./Video.css";


function VideoSection() {
  return (
    <div className="hero-section">
      <video autoPlay loop muted playsInline className="hero-video">
        <source src={Video} type="video/mp4" />
        {/* <source src="images/hero-video.mp4" type="video/mp4" /> */}
        Your browser does not support the video tag.
      </video>
      <div className="content">
        <h1>Your one stop shop</h1>
        <p>Find the best deals on your favorite items!</p>
      </div>
    </div>
  );
}

export default VideoSection;
