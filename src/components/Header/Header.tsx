import { Link } from "react-router-dom";
import logo from "../../assets/Logo-MapPermis.png";
import "./Header.css";

export default function Header() {
  return (
    <nav className="header-nav">
      <Link to="/" className="header-logo">
        <img src={logo} alt="MapPermis" className="header-logo-img" />
        <span className="header-logo-text">MapPermis</span>
      </Link>
      <div className="header-links">
        <Link to="/parcours" className="header-link">
          Mes parcours
        </Link>
        <Link
          to="/parcours/ajouter"
          className="header-link header-link-primary"
        >
          + Nouveau parcours
        </Link>
      </div>
    </nav>
  );
}
