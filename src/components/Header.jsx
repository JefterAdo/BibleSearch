import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-icon">✝</span>
          ParoleConnect
        </Link>

        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className={`hamburger ${isMenuOpen ? "active" : ""}`}></span>
        </button>

        <nav className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <Link
            to="/"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">🏠</span>
            Accueil
          </Link>
          <Link
            to="/about"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">ℹ️</span>À propos
          </Link>
          <Link
            to="/contact"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="nav-icon">📧</span>
            Contact
          </Link>
          {/* Le lien Ressources a été supprimé */}
          <button className="search-toggle" aria-label="Toggle search">
            <span className="search-icon">🔍</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
