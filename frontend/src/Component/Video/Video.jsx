import React from "react";
import Video from '../Assets/images/Video.mp4'
import returnImg from "../Assets/images/Return.png"
import './Video.css';
// import '../CSS/Common.css'

function VideoSection() {
  return (
    <section className="Video">
      <div>
        <video id="background-video" src={Video} autoPlay loop muted></video>
        <img className="Return" alt="90-Day-Return" src={returnImg} />
      </div>
    </section>
  );
}

export default VideoSection;