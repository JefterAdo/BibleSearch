import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Erreur capturée:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h1>Oops! Une erreur est survenue.</h1>
          <p>Nous sommes désolés, mais quelque chose s'est mal passé.</p>
          {this.state.error && (
            <p>
              <i>{this.state.error.toString()}</i>
            </p>
          )}
          {process.env.NODE_ENV === "development" && this.state.errorInfo && (
            <details
              style={{
                whiteSpace: "pre-wrap",
                marginTop: "20px",
                textAlign: "left",
              }}
            >
              <summary>Détails de l'erreur</summary>
              {this.state.errorInfo.componentStack}
            </details>
          )}
          <div style={{ marginTop: "20px" }}>
            <a
              href="/"
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                textDecoration: "none",
                borderRadius: "5px",
              }}
            >
              Retour à l'accueil
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
