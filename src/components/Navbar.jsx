import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import "./Navbar.css";
import myLog from '../assets/logoandvideos/FullLogo_Transparent.png'
import { Link } from 'react-scroll';


function Navbar() {

  // const history = useHistory();
  // const handleSmoothScroll = (event) => {
  //   event.preventDefault();
  //   const targetPath = event.target.getAttribute('id');
  //   history.push(targetPath);
  //   window.scrollTo({ top: 0, behavior: 'smooth' });
  // };


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
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="about"
                smooth={true}
                duration={500}
                className="nav-links"
                onClick={closeMobileMenu}
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="services"
                smooth={true}
                duration={500}
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Services
              </Link>
            </li>
            <li className="nav-item nav-contact-mobile">
              <Link
                to="contact"
                smooth={true}
                duration={500}
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle="btn--outline"><Link to="contact" smooth={true} duration={500} style={{color: 'inherit', textDecoration: 'none'}}>Contact</Link></Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
