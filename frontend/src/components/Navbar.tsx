import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { FaInstagram } from "react-icons/fa6";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <p className="navbar-logo">picandrew</p>
        <ul className="navbar-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink to="/portfolio" end className={({ isActive }) => isActive ? "active" : ""}>
              PORTFOLIO
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" end className={({ isActive }) => isActive ? "active" : ""}>
              SHOP
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
    </nav>
  );
}

export default Navbar;