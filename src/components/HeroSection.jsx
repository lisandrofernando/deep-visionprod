import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import "./HeroSection.css";
import "../App.css";
import gvideo from '../assets/logoandvideos/video-2.mp4'
import mobileVideo from '../assets/logoandvideos/video-1.mp4'

function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='hero-container' id="hero">
      <video className="video" autoPlay loop muted>
        <source src={isMobile ? mobileVideo : gvideo} type="video/mp4" />
      </video>
      <div className="hero-content">
        <h1>PARTNER WITH US</h1>
        <p>Get in touch</p>
        <div className="hero-btns">
          <Button
            className="btns"
            buttonStyle='btn--outline'
            buttonSize='btn--large'
          >
            Get Started
          </Button>
          <Button
            className="btns"
            buttonStyle='btn--primary'
            buttonSize='btn--large'
          >
            We are a Global Consultant <i className="far fa-play-circle" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
