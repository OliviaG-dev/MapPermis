import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MapEditor from "../../components/MapEditor/MapEditor";
import "./ViewSingleParcours.css";

interface Parcours {
  id: string;
  name: string;
  description: string;
  city?: string;
  mapData?: any;
  createdAt: string;
}

export default function ViewSingleParcours() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [parcours, setParcours] = useState<Parcours | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger le parcours depuis localStorage
    const storedParcours = JSON.parse(localStorage.getItem("parcours") || "[]");
    const foundParcours = storedParcours.find((p: Parcours) => p.id === id);
    
    if (foundParcours) {
      setParcours(foundParcours);
    } else {
      alert("Parcours non trouvé");
      navigate("/parcours");
    }
    setLoading(false);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="view-single-parcours-container">
        <Header />
        <div className="view-single-parcours-content">
          <p>Chargement...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!parcours) {
    return null;
  }

  return (
    <div className="view-single-parcours-container">
      <Header />
      <div className="view-single-parcours-content">
        <div className="view-single-parcours-sidebar">
          <button
            className="btn-back"
            onClick={() => navigate("/parcours")}
          >
            Retour aux parcours
          </button>
          <h1>{parcours.name}</h1>
          {parcours.description && (
            <p className="parcours-description">{parcours.description}</p>
          )}
          {parcours.city && (
            <p className="parcours-city">
              <strong>Ville :</strong> {parcours.city}
            </p>
          )}
          <p className="parcours-date">
            Créé le {new Date(parcours.createdAt).toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="view-single-parcours-map">
          <MapEditor
            initialCity={parcours.city}
            initialMapData={parcours.mapData}
            readOnly={true}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

