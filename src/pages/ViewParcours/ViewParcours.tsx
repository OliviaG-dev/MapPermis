import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./ViewParcours.css";

interface Parcours {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export default function ViewParcours() {
  const [parcours, setParcours] = useState<Parcours[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Charger les parcours depuis localStorage
    const storedParcours = JSON.parse(localStorage.getItem("parcours") || "[]");
    setParcours(storedParcours);
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce parcours ?")) {
      const updatedParcours = parcours.filter((p) => p.id !== id);
      setParcours(updatedParcours);
      localStorage.setItem("parcours", JSON.stringify(updatedParcours));
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="view-parcours-container">
      <Header />
      <div className="view-parcours-content">
        <div className="view-parcours-header">
          <h1>Mes parcours</h1>
          <button
            className="btn-add"
            onClick={() => navigate("/parcours/ajouter")}
          >
            + Nouveau parcours
          </button>
        </div>

        {parcours.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🗺️</div>
            <h2>Aucun parcours créé</h2>
            <p>Commencez par créer votre premier parcours</p>
            <button
              className="btn-primary"
              onClick={() => navigate("/parcours/ajouter")}
            >
              Créer un parcours
            </button>
          </div>
        ) : (
          <div className="parcours-grid">
            {parcours.map((p) => (
              <div key={p.id} className="parcours-card">
                <div className="parcours-card-header">
                  <h3>{p.name}</h3>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(p.id)}
                    title="Supprimer"
                  >
                    ×
                  </button>
                </div>
                {p.description && (
                  <p className="parcours-description">{p.description}</p>
                )}
                <div className="parcours-footer">
                  <span className="parcours-date">
                    Créé le {formatDate(p.createdAt)}
                  </span>
                  <button className="btn-view" onClick={() => navigate("/")}>
                    Ouvrir sur la carte
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
