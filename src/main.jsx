import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./components/Home";
import ErrorBoundary from "./components/ErrorBoundary"; // Importe le composant
import About from "./components/About";
import Contact from "./components/Contact";
// Resources a été supprimé
import Faq from "./pages/Faq.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import "./pages/Faq.css";
import "./pages/Privacy.css";
import "./pages/Terms.css";
import "./index.css";

// Configuration des en-têtes de sécurité
const meta = document.createElement("meta");
meta.httpEquiv = "Content-Security-Policy";
meta.content = [
  "default-src 'self'",
  "connect-src 'self' https://api.groq.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  "script-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");
document.head.appendChild(meta);

// Configuration du router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorBoundary />, // Ajoute l'ErrorBoundary
    children: [
      {
        index: true, // Définit Home comme route par défaut
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      // La route /resources a été supprimée
      {
        path: "faq",
        element: <Faq />,
      },
      {
        path: "terms",
        element: <Terms />,
      },
      {
        path: "privacy",
        element: <Privacy />,
      },
    ],
  },
]);

// Rendu de l'application
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
