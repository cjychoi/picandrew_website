import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa6";
import logo from '../assets/picandrew_logo_1.png';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} className="navbar-logo" />
        <ul className="navbar-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" end className={({ isActive }) => isActive ? "active" : ""}>
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink to="/gallery" end className={({ isActive }) => isActive ? "active" : ""}>
              GALLERY
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" end className={({ isActive }) => isActive ? "active" : ""}>
              SHOP
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" end className={({ isActive }) => isActive ? "active" : ""}>
              CONTACT
            </NavLink>
          </li>
        </ul>
      </div>
      <a
        href="https://www.instagram.com/pic_and_rew/"
        target="_blank"
        rel="noopener noreferrer"
        className="navbar-icon"
      >
        <FaInstagram />
      </a>
    </nav >
  );
}

export default Navbar;