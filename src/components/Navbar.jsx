import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import "./Navbar.css";
import myLog from '../assets/logoandvideos/FullLogo_Transparent.png'
import { Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';


function Navbar() {
  const { t, i18n } = useTranslation();
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const closeMobileMenu = () => setClick(false);

  const [button, setButton] = useState(true);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
    const handleResize = () => {
      if (window.innerWidth <= 960) {
        setButton(false);
      } else {
        setButton(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container" id='Home'>
          {/* <Link to="/" className='navbar-logo' onClick={closeMobileMenu}>
          Dv <i className='fab fa-typo3'/>
           </Link> */}
          <div className="navbar-logo">
            <img src={myLog} alt="Company Logo" />
          </div>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="hero" smooth={true} duration={500} className="nav-links" onClick={closeMobileMenu}>
                {t('nav.home')}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="about" smooth={true} duration={500} className="nav-links" onClick={closeMobileMenu}>
                {t('nav.about')}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="services" smooth={true} duration={500} className="nav-links" onClick={closeMobileMenu}>
                {t('nav.services')}
              </Link>
            </li>
            <li className="nav-item nav-contact-mobile">
              <Link to="contact" smooth={true} duration={500} className="nav-links" onClick={closeMobileMenu}>
                {t('nav.contact')}
              </Link>
            </li>
          </ul>
          <div className="lang-switcher">
            {['en', 'pt', 'es'].map(lang => (
              <button
                key={lang}
                onClick={() => i18n.changeLanguage(lang)}
                className={`lang-btn ${i18n.language === lang ? 'active' : ''}`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          {button && <Button buttonStyle="btn--outline"><Link to="contact" smooth={true} duration={500} style={{color: 'inherit', textDecoration: 'none'}}>{t('nav.contact')}</Link></Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
