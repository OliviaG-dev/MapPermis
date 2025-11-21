import { Link } from "react-router-dom";
import "./Error404.css";

export default function Error404() {
  return (
    <div className="error404-container">
      <div className="error404-content">
        <h1 className="error404-title">404</h1>
        <h2 className="error404-subtitle">Page non trouvée</h2>
        <p className="error404-description">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/" className="error404-button">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

