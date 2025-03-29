import React from "react";
import { useNavigate } from "react-router-dom";
import "./Faq.css";

const Faq = () => {
  const navigate = useNavigate();

  return (
    <div className="faq-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Retour
      </button>

      <h1 className="faq-title">Foire Aux Questions</h1>

      <div className="faq-section">
        <div className="faq-item">
          <h3 className="faq-question">
            <span className="faq-icon">❓</span>
            Comment fonctionne ParoleConnect ?
          </h3>
          <p className="faq-answer">
            ParoleConnect est une plateforme alimentée par l'IA Groq Cloud qui
            utilise le modèle Mixtral-8x7b pour fournir des réponses basées
            uniquement sur la Bible. Posez votre question et notre système
            analysera les Écritures pour vous fournir une réponse pertinente
            accompagnée des références bibliques correspondantes.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">
            <span className="faq-icon">❓</span>
            Les réponses sont-elles fiables ?
          </h3>
          <p className="faq-answer">
            Notre système est conçu pour fournir des réponses basées uniquement
            sur le texte biblique. Cependant, nous recommandons toujours de
            vérifier les versets cités dans votre propre Bible et de prier pour
            le discernement.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">
            <span className="faq-icon">❓</span>
            Puis-je poser n'importe quelle question ?
          </h3>
          <p className="faq-answer">
            Vous pouvez poser toute question en rapport avec la Bible.
            Cependant, veuillez noter que certaines questions complexes peuvent
            nécessiter une étude plus approfondie que ce que notre système peut
            fournir.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">
            <span className="faq-icon">❓</span>
            Comment sont sélectionnées les réponses ?
          </h3>
          <p className="faq-answer">
            Notre IA analyse le texte biblique dans son ensemble et sélectionne
            les passages les plus pertinents en fonction de votre question. Les
            réponses sont toujours accompagnées des références bibliques
            correspondantes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Faq;
