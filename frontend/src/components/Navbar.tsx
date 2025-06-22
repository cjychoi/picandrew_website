import { useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import logo from '../assets/picandrew_logo_1.png';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" onClick={() => setMenuOpen(false)}>
          <img src={logo} className="navbar-logo" alt="logo" />
        </NavLink>
      </div>

      <div className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
      </div>
      
      <div className={`navbar-menu-container ${menuOpen ? 'active' : ''}`}>
        <div className="navbar-center">
          <ul className="navbar-links">
            <li>
              <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""} onClick={toggleMenu}>
                HOME
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" end className={({ isActive }) => isActive ? "active" : ""} onClick={toggleMenu}>
                ABOUT
              </NavLink>
            </li>
            <li>
              <NavLink to="/gallery" end className={({ isActive }) => isActive ? "active" : ""} onClick={toggleMenu}>
                GALLERY
              </NavLink>
            </li>
            <li>
              <NavLink to="/shop" end className={({ isActive }) => isActive ? "active" : ""} onClick={toggleMenu}>
                SHOP
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" end className={({ isActive }) => isActive ? "active" : ""} onClick={toggleMenu}>
                CONTACT
              </NavLink>
            </li>
            <li>
              <a
                href="https://www.instagram.com/pic_and_rew/"
                target="_blank"
                rel="noopener noreferrer"
                className="navbar-icon"
                onClick={toggleMenu}
              >
                <FaInstagram />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;