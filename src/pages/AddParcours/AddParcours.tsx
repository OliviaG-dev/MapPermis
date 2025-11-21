import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MapEditor from "../../components/MapEditor/MapEditor";
import "./AddParcours.css";

export default function AddParcours() {
  const [parcoursName, setParcoursName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!parcoursName.trim()) {
      alert("Veuillez entrer un nom pour le parcours");
      return;
    }

    // TODO: Sauvegarder le parcours (localStorage ou API)
    const parcours = {
      id: Date.now().toString(),
      name: parcoursName,
      description: description,
      createdAt: new Date().toISOString(),
    };

    // Sauvegarder dans localStorage pour l'instant
    const existingParcours = JSON.parse(
      localStorage.getItem("parcours") || "[]"
    );
    existingParcours.push(parcours);
    localStorage.setItem("parcours", JSON.stringify(existingParcours));

    alert("Parcours créé avec succès !");
    navigate("/parcours");
  };

  return (
    <div className="add-parcours-container">
      <Header />
      <div className="add-parcours-content">
        <div className="add-parcours-sidebar">
          <h1>Créer un nouveau parcours</h1>
          <form onSubmit={handleSubmit} className="parcours-form">
            <div className="form-group">
              <label htmlFor="parcoursName">Nom du parcours *</label>
              <input
                type="text"
                id="parcoursName"
                value={parcoursName}
                onChange={(e) => setParcoursName(e.target.value)}
                placeholder="Ex: Parcours centre-ville"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ajoutez une description pour ce parcours..."
                rows={4}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                Enregistrer le parcours
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate("/parcours")}
              >
                Annuler
              </button>
            </div>
          </form>

          <div className="instructions">
            <h3>Instructions</h3>
            <ul>
              <li>Utilisez les outils de dessin pour tracer votre parcours</li>
              <li>Ajoutez des marqueurs pour les points importants</li>
              <li>Cliquez normalement pour un danger</li>
              <li>SHIFT + clic pour une priorité</li>
              <li>CTRL + clic pour un stop</li>
            </ul>
          </div>
        </div>

        <div className="add-parcours-map">
          <MapEditor />
        </div>
      </div>
      <Footer />
    </div>
  );
}
