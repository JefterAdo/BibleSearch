import React from "react";
import { useNavigate } from "react-router-dom";
import "./Terms.css";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="terms-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Retour
      </button>

      <div className="terms-content">
        <h1>Conditions d'utilisation</h1>

        <section>
          <h2>1. Acceptation des conditions</h2>
          <p>
            En utilisant ParoleConnect, vous acceptez les présentes conditions
            d'utilisation.
          </p>
        </section>

        <section>
          <h2>2. Utilisation du service</h2>
          <p>
            Le service est destiné à une utilisation personnelle et non
            commerciale.
          </p>
        </section>

        <section>
          <h2>3. Contenu biblique</h2>
          <p>
            Toutes les réponses fournies sont basées exclusivement sur la Bible.
          </p>
        </section>

        <section>
          <h2>4. Responsabilités</h2>
          <p>
            ParoleConnect décline toute responsabilité concernant
            l'interprétation des textes bibliques.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
