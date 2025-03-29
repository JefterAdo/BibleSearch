import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import groqService from "../services/groqService";
import "./Home.css";
import "./BibleSearch.css";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [answer, setAnswer] = useState(null);
  const inputRef = useRef(null);

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);
    setAnswer(null);

    try {
      const response = await groqService.generateBibleResponse(
        searchQuery.trim()
      );
      setAnswer(response); // Stocker directement la réponse brute
      setSearchParams({ q: searchQuery.trim() });
    } catch (err) {
      setError(
        "Une erreur est survenue lors de la recherche. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initialQuery = searchParams.get("q");
    if (initialQuery && !answer) {
      setQuery(initialQuery);
      performSearch(initialQuery);
    }
    // Focus automatique sur l'input au chargement
    inputRef.current?.focus();
  }, [searchParams]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      performSearch(query.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSearch(e);
    }
  };

  return (
    <div className="home">
      <div className="home-container">
        <header className="home-header">
          <h1 className="home-title">ParoleConnect</h1>
          <p className="home-subtitle">
            Explorer la sagesse biblique à travers l'intelligence artificielle
          </p>
        </header>

        <section className="search-section">
          <form onSubmit={handleSearch} className="search-form">
            <span className="search-icon" aria-hidden="true">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Posez votre question sur la Bible..."
              aria-label="Rechercher dans la Bible"
              className="search-input"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              aria-label={isLoading ? "Recherche en cours..." : "Rechercher"}
            >
              {isLoading ? (
                <>
                  <div className="loader" aria-hidden="true" />
                  <span>Recherche...</span>
                </>
              ) : (
                "Rechercher"
              )}
            </button>
          </form>
        </section>

        {error && (
          <div className="error-message" role="alert">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            {error}
          </div>
        )}

        {answer && (
          <div className="answer-container">
            <div className="bible-answer">
              <div className="answer-header">
                <div className="ai-tag">
                  <span className="ai-icon" aria-hidden="true">
                    ⚡
                  </span>
                  <span>Conseil biblique IA</span>
                </div>
                <h2>Réponse à votre question</h2>
                <div className="answer-context">
                  Basé sur les Écritures et l'analyse IA
                </div>
              </div>
              <div className="markdown-content">
                <ReactMarkdown>{answer}</ReactMarkdown>
              </div>
              <div className="answer-footer">
                <div className="disclaimer">
                  <strong>Note :</strong> Cette réponse est générée par
                  intelligence artificielle à partir de sources bibliques
                  fiables.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
