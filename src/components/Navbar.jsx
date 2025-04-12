import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Deno_2021.svg" alt="App Logo" />
          <span>The Rick & Morty App</span>
        </Link>

        <div className="navbar-links">
          <ul>
            <li><Link to="/" className="active">Home</Link></li>
            {/* This links below dont work, but are used as an example */}
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
