import React from "react";
import "./About.css";

const values = [
  {
    id: 1,
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2l.642.219C17.957 3.845 22 8.539 22 14v1a3 3 0 0 1-3 3h-2v-1a5 5 0 0 0-10 0v1H5a3 3 0 0 1-3-3v-1c0-5.461 4.043-10.155 9.358-11.781L12 2z" />
        <path d="M12 2v2M3.2 14h2.8M18 14h2.8" />
      </svg>
    ),
    title: "Fidélité",
    description:
      "Respect et précision dans la transmission de la Parole de Dieu",
  },
  {
    id: 2,
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    title: "Accessibilité",
    description: "La Bible disponible pour tous, partout et à tout moment",
  },
  {
    id: 3,
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v5M12 17v5M2 12h5M17 12h5" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    title: "Innovation",
    description: "Utilisation éthique de la technologie au service de la foi",
  },
  {
    id: 4,
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Communauté",
    description: "Création d'un espace d'échange et de croissance spirituelle",
  },
  {
    id: 5,
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
    title: "Authenticité",
    description:
      "Préservation de l'intégrité et de l'authenticité des textes sacrés",
  },
  {
    id: 6,
    icon: (
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        <path d="M12 7v7" />
        <path d="M9 11h6" />
      </svg>
    ),
    title: "Pédagogie",
    description:
      "Approche pédagogique adaptée pour une meilleure compréhension biblique",
  },
];

const About = () => {
  return (
    <main className="about">
      <div className="about-container">
        <header className="about-header">
          <h1 className="about-title">À Propos de ParoleConnect</h1>
          <p className="about-description">
            Découvrez comment nous utilisons la technologie moderne pour rendre
            la sagesse biblique plus accessible, tout en respectant la tradition
            et la profondeur des Écritures.
          </p>
        </header>

        <section className="values-section" aria-labelledby="values-title">
          <h2 id="values-title" className="values-title">
            Nos Valeurs Fondamentales
          </h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <article
                key={value.id}
                className="value-card"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
                role="article"
              >
                <span className="value-icon" aria-hidden="true">
                  {value.icon}
                </span>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mission-section" aria-labelledby="mission-title">
          <h2 id="mission-title" className="section-title">
            Notre Mission
          </h2>
          <p className="section-text">
            ParoleConnect s'engage à créer un pont entre la sagesse
            traditionnelle des Écritures et les possibilités offertes par
            l'intelligence artificielle. Notre objectif est de faciliter
            l'exploration et la compréhension des textes bibliques, tout en
            respectant leur caractère sacré et leur profondeur spirituelle.
          </p>
        </section>

        <section
          className="commitment-section"
          aria-labelledby="commitment-title"
        >
          <h2 id="commitment-title" className="section-title">
            Notre Engagement
          </h2>
          <div className="commitment-grid">
            <div className="commitment-item">
              <h3>Précision et Respect</h3>
              <p>
                Nous nous engageons à maintenir la plus haute fidélité aux
                textes bibliques originaux, en nous appuyant sur des sources
                fiables et reconnues, tout en préservant leur intégrité
                spirituelle.
              </p>
            </div>
            <div className="commitment-item">
              <h3>Innovation Responsable</h3>
              <p>
                Notre approche technologique est guidée par un profond respect
                pour les Écritures et une volonté constante de servir la
                communauté des croyants de manière éthique et bienveillante.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default About;
