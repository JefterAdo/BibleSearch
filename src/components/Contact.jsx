import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simuler l'envoi du formulaire
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact">
      <div className="container">
        <h1 className="section-title">Contactez-nous</h1>
        <p className="section-subtitle">
          Nous sommes là pour vous aider et répondre à toutes vos questions
          concernant ParoleConnect. N'hésitez pas à nous contacter.
        </p>

        <div className="contact-grid">
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <h3>Email</h3>
              <p>
                <a href="mailto:contact@paroleconnect.com">
                  contact@paroleconnect.com
                </a>
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">⏰</div>
              <h3>Disponibilité</h3>
              <p>
                Du lundi au vendredi
                <br />
                9h00 - 18h00
              </p>
            </div>

            <div className="info-card">
              <div className="info-icon">💬</div>
              <h3>Support</h3>
              <p>
                Réponse sous 24-48 heures
                <br />
                ouvrables
              </p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-input"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject" className="form-label">
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className="form-input"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className="form-input"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="loader"></div>
                  Envoi en cours...
                </>
              ) : (
                "Envoyer le message"
              )}
            </button>

            {submitStatus === "success" && (
              <div className="success-message">
                ✅ Votre message a été envoyé avec succès. Nous vous répondrons
                dans les plus brefs délais.
              </div>
            )}

            {submitStatus === "error" && (
              <div className="error-message">
                ❌ Une erreur est survenue lors de l'envoi du message. Veuillez
                réessayer.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
