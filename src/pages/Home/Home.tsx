import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import {
  MapIcon,
  DrawIcon,
  MarkerIcon,
  SaveIcon,
  TargetIcon,
  UsersIcon,
} from "../../components/Icons/FeatureIcons";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <Header />

      <main className="home-main">
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              Prépare ton permis de conduire avec{" "}
              <span className="highlight">MapPermis</span>
            </h1>
            <p className="hero-description">
              Crée, visualise et entraîne-toi sur les parcours d'examen du
              permis de conduire. Trace tes trajets, ajoute les priorités, stops
              et dangers pour une préparation optimale.
            </p>
            <div className="hero-actions">
              <Link
                to="/parcours/ajouter"
                className="btn btn-primary btn-large"
              >
                Créer un parcours
              </Link>
              <Link to="/parcours" className="btn btn-secondary btn-large">
                Voir mes parcours
              </Link>
            </div>
          </div>
        </section>

        <section className="features-section">
          <h2 className="section-title">Fonctionnalités</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <MapIcon />
              </div>
              <h3 className="feature-title">Carte interactive</h3>
              <p className="feature-description">
                Visualise tes parcours sur une carte OpenStreetMap avec zoom et
                navigation fluide.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <DrawIcon />
              </div>
              <h3 className="feature-title">Dessin de parcours</h3>
              <p className="feature-description">
                Trace facilement tes trajets et ajoute des marqueurs pour les
                points importants.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <MarkerIcon />
              </div>
              <h3 className="feature-title">Marqueurs personnalisés</h3>
              <p className="feature-description">
                Ajoute des dangers, priorités et stops pour annoter précisément
                ton parcours.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <SaveIcon />
              </div>
              <h3 className="feature-title">Sauvegarde</h3>
              <p className="feature-description">
                Enregistre tous tes parcours et accède-y facilement pour réviser
                avant l'examen.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <TargetIcon />
              </div>
              <h3 className="feature-title">Préparation optimale</h3>
              <p className="feature-description">
                Recrée fidèlement les itinéraires d'examen et entraîne-toi en
                conditions réelles.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <UsersIcon />
              </div>
              <h3 className="feature-title">Pour tous</h3>
              <p className="feature-description">
                Que tu sois élève, accompagnateur ou moniteur, MapPermis
                s'adapte à tes besoins.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
