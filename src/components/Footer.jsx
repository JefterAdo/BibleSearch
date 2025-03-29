import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>À propos</h4>
          <p>
            ParoleConnect est une plateforme biblique intelligente alimentée par
            l'IA Groq Cloud (Mixtral-8x7b).
          </p>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: contact@paroleconnect.online</p>
          <p>Téléphone: +225 05 46 90 96 42</p>
        </div>
        <div className="footer-section">
          <h4>Ressources</h4>
          <ul>
            <li>
              <Link to="/Faq">FAQ</Link>
            </li>
            <li>
              <Link to="/Terms">Conditions d'utilisation</Link>
            </li>
            <li>
              <Link to="/Privacy">Politique de confidentialité</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} ParoleConnect - Tous droits réservés</p>
        <p>Alimenté par Groq Cloud AI</p>
      </div>
    </footer>
  );
};

export default Footer;
