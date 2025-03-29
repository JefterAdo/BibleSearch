import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import groqService from "../services/groqService";
import "./BibleSearch.css";

const BibleSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState(null); // Stockera la réponse brute Markdown

  // Mémoriser les options de ReactMarkdown pour éviter les re-renders inutiles
  const markdownOptions = useMemo(
    () => ({
      remarkPlugins: [remarkGfm],
    }),
    []
  );

  const handleSearch = useCallback(
    async (e) => {
      e?.preventDefault?.();
      if (!query.trim()) {
        setError("Veuillez entrer une question");
        return;
      }

      setIsLoading(true);
      setError(null);
      setAnswer(null);

      try {
        const trimmedQuery = query.trim();
        const response = await groqService.generateBibleResponse(trimmedQuery);

        if (!response) {
          throw new Error("Réponse vide reçue de l'API");
        }

        setAnswer(response);
        setSearchParams({ q: trimmedQuery });
      } catch (err) {
        console.error("Erreur API Groq:", err);
        setError(
          err.message.includes("API")
            ? "Erreur de connexion au service. Veuillez réessayer plus tard."
            : "Une erreur est survenue. Veuillez reformuler votre question."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [query, setSearchParams]
  ); // Ajout des dépendances

  // Lance la recherche si un paramètre 'q' est dans l'URL au chargement
  useEffect(() => {
    const initialQuery = searchParams.get("q");
    if (initialQuery && !answer) {
      setQuery(initialQuery);
      handleSearch({ preventDefault: () => {} });
    }
  }, [searchParams, answer, handleSearch]); // Ajout des dépendances manquantes

  return (
    <div className="bible-search">
      {/* Le formulaire reste identique */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Posez votre question biblique..."
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="loader"></div>
              <span>Recherche...</span>
            </>
          ) : (
            "Rechercher"
          )}
        </button>
      </form>

      {isLoading && (
        <div className="loading-indicator">Chargement des réponses...</div>
      )}
      {error && <div className="error-message">{error}</div>}

      {answer && (
        <div className="answer-container">
          <div className="bible-answer">
            <div className="answer-header">
              <div className="ai-tag">
                <span className="ai-icon">⚡</span>
                <span>Conseil biblique IA</span>
              </div>
              <h2>Réponse à votre question</h2>
              <div className="answer-context">
                Basé sur les Écritures et la théologie
              </div>
            </div>

            {/* Affichage avec ReactMarkdown */}
            <div className="markdown-content">
              <ReactMarkdown {...markdownOptions}>{answer}</ReactMarkdown>
            </div>

            <div className="answer-footer">
              <div className="disclaimer">
                <strong>Note :</strong> Cette réponse est générée par
                intelligence artificielle à partir de sources bibliques fiables.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BibleSearch;
