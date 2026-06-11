import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import "./HeroSection.css";
import "../App.css";
import gvideo from '../assets/logoandvideos/video-2.mp4'
import mobileVideo from '../assets/logoandvideos/video-1.mp4'
import { useTranslation } from 'react-i18next';

function HeroSection() {
  const { t } = useTranslation();
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
        <h1>{t('hero.title')}</h1>
        <p>{t('hero.subtitle')}</p>
        <div className="hero-btns">
          <Button className="btns" buttonStyle='btn--outline' buttonSize='btn--large'>
            {t('hero.getStarted')}
          </Button>
          <Button className="btns" buttonStyle='btn--primary' buttonSize='btn--large'>
            {t('hero.globalConsultant')} <i className="far fa-play-circle" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
