import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import MapEditor from "../../components/MapEditor/MapEditor";
import "./AddParcours.css";

export default function AddParcours() {
  const [parcoursName, setParcoursName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [mapData, setMapData] = useState<any>(null);
  const navigate = useNavigate();

  const handleCityChange = (newCity: string) => {
    // Mettre à jour le champ ville lorsque l'utilisateur sélectionne une ville depuis la recherche sur la carte
    setCity(newCity);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!parcoursName.trim()) {
      alert("Veuillez entrer un nom pour le parcours");
      return;
    }

    // Sauvegarder le parcours avec les données de la carte
    const parcours = {
      id: Date.now().toString(),
      name: parcoursName,
      description: description,
      city: city,
      mapData: mapData || { markers: [], polylines: [] }, // Sauvegarder les données de la carte
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
              <label htmlFor="city">Ville</label>
              <input
                type="text"
                id="city"
                value={city || "-----"}
                readOnly
                className="city-input-readonly"
                placeholder="Utilisez la recherche sur la carte pour sélectionner une ville"
              />
              <small className="form-hint">
                La ville est automatiquement remplie lorsque vous utilisez la recherche sur la carte.
              </small>
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
              <li>
                <strong>Rechercher une ville :</strong> Utilisez le champ de recherche en haut à gauche de la carte pour centrer la carte sur une ville
              </li>
              <li>
                <strong>Tracer un parcours :</strong> Utilisez l'icône de ligne dans le contrôle en haut à droite pour tracer votre parcours
              </li>
              <li>
                <strong>Ajouter des marqueurs :</strong> Sélectionnez un type de marqueur dans la barre d'outils (Priorité, Stop, Zone 30, Fin Zone 30) puis cliquez sur la carte pour le placer
              </li>
              <li>
                <strong>Déplacer un marqueur :</strong> Faites glisser le marqueur pour le déplacer
              </li>
              <li>
                <strong>Supprimer un marqueur :</strong> Survolez le marqueur avec la souris et cliquez sur la croix rouge qui apparaît
              </li>
              <li>
                <strong>Modifier une ligne :</strong> Cliquez sur l'icône d'édition (crayon) en haut à droite, puis cliquez sur la ligne pour la modifier ou la supprimer
              </li>
            </ul>
          </div>
        </div>

        <div className="add-parcours-map">
          <MapEditor 
            initialCity={city} 
            onCityChange={handleCityChange}
            onMapDataChange={setMapData}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
