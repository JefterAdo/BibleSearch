import React from "react";
import { useNavigate } from "react-router-dom";
import "./Privacy.css";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="privacy-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Retour
      </button>

      <div className="privacy-content">
        <h1>Politique de confidentialité</h1>

        <section>
          <h2>1. Collecte des informations</h2>
          <p>
            Nous collectons uniquement les informations nécessaires au bon
            fonctionnement du service.
          </p>
        </section>

        <section>
          <h2>2. Utilisation des données</h2>
          <p>
            Vos données personnelles ne seront jamais partagées avec des tiers
            sans votre consentement.
          </p>
        </section>

        <section>
          <h2>3. Sécurité des données</h2>
          <p>
            Nous mettons en œuvre des mesures de sécurité strictes pour protéger
            vos informations.
          </p>
        </section>

        <section>
          <h2>4. Cookies</h2>
          <p>
            Nous utilisons des cookies uniquement pour améliorer l'expérience
            utilisateur.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
