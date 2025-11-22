import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import * as L from "leaflet";
import "leaflet-draw";
import "./MapEditor.css";

// Créer une icône personnalisée pour le panneau stop (octogone rouge)
const iconStop = L.divIcon({
  className: "custom-stop-icon",
  html: `
    <div style="
      width: 50px;
      height: 50px;
      background: #DC143C;
      border: 4px solid white;
      clip-path: polygon(25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%, 0% 25%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(0,0,0,0.5);
      font-weight: 900;
      font-size: 11px;
      color: white;
      text-align: center;
      font-family: 'Arial Black', Arial, sans-serif;
      letter-spacing: 0.5px;
      line-height: 1;
    ">STOP</div>
  `,
  iconSize: [50, 50],
  iconAnchor: [25, 25],
  popupAnchor: [0, -25],
});

const iconDanger = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/595/595067.png",
  iconSize: [32, 32],
});

// Créer une icône personnalisée pour le panneau Zone 30 (panneau rond avec 30)
const iconZone30 = L.divIcon({
  className: "custom-zone30-icon",
  html: `
    <div style="
      width: 50px;
      height: 50px;
      background: white;
      border: 6px solid #DC143C;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(0,0,0,0.5);
      font-weight: 900;
      font-size: 22px;
      color: #DC143C;
      text-align: center;
      font-family: 'Arial Black', Arial, sans-serif;
      line-height: 1;
    ">30</div>
  `,
  iconSize: [50, 50],
  iconAnchor: [25, 25],
  popupAnchor: [0, -25],
});

// Créer une icône personnalisée pour le panneau Fin Zone 30 (panneau rond avec 30 barré)
const iconFinZone30 = L.divIcon({
  className: "custom-finzone30-icon",
  html: `
    <div style="
      width: 50px;
      height: 50px;
      background: white;
      border: 6px solid #000000;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 10px rgba(0,0,0,0.5);
      font-weight: 900;
      font-size: 22px;
      color: #DC143C;
      text-align: center;
      font-family: 'Arial Black', Arial, sans-serif;
      line-height: 1;
      position: relative;
      overflow: hidden;
    ">
      <span style="position: relative; z-index: 1; color: #DC143C;">30</span>
      <div style="
        position: absolute;
        width: 38px;
        height: 5px;
        background: #000000;
        transform: rotate(-45deg);
        z-index: 2;
        left: 50%;
        top: 50%;
        margin-left: -19px;
        margin-top: -2.5px;
      "></div>
    </div>
  `,
  iconSize: [50, 50],
  iconAnchor: [25, 25],
  popupAnchor: [0, -25],
});

type MarkerType = "priority" | "stop" | "zone30" | "finZone30" | null;

interface MapEditorProps {
  initialCity?: string;
  onCityChange?: (city: string) => void;
  onMapDataChange?: (data: any) => void; // Callback pour exporter les données
  initialMapData?: any; // Données initiales à charger
  readOnly?: boolean; // Mode lecture seule
}

// Fonction pour ajouter un bouton de suppression à un marqueur
function addDeleteButtonToMarker(
  marker: L.Marker,
  map: L.Map,
  drawnItems: L.FeatureGroup,
  onMapDataChange?: (data: any) => void
) {
  // Générer un ID unique pour le bouton
  const markerId = (marker as any)._leaflet_id || Date.now();
  const deleteBtnId = `delete-btn-${markerId}`;

  // Créer un bouton de suppression (caché par défaut)
  const deleteButton = L.divIcon({
    className: "marker-delete-button",
    html: `
      <div id="${deleteBtnId}" style="
        width: 24px;
        height: 24px;
        background: #ef4444;
        border: 2px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        transition: all 0.2s;
        z-index: 1000;
        position: relative;
        opacity: 0;
        pointer-events: none;
      " onmouseover="this.style.transform='scale(1.1)'; this.style.background='#dc2626';" onmouseout="this.style.transform='scale(1)'; this.style.background='#ef4444';">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
          <path d="M9 3L3 9M3 3l6 6" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
    `,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });

  // Créer un marqueur pour le bouton de suppression
  const deleteMarker = L.marker(marker.getLatLng(), {
    icon: deleteButton,
    interactive: true,
    zIndexOffset: 1000,
    opacity: 0, // Caché par défaut
  });

  // Calculer la position du bouton (en haut à droite du marqueur)
  const markerLatLng = marker.getLatLng();
  const iconSizeOption = marker.options.icon?.options?.iconSize;
  const iconSize: [number, number] = Array.isArray(iconSizeOption)
    ? iconSizeOption
    : iconSizeOption instanceof L.Point
    ? [iconSizeOption.x, iconSizeOption.y]
    : [32, 32];
  // Réduire les offsets pour rapprocher le bouton du marqueur
  const offsetY = iconSize[1] / 4 / 111000; // Réduit de moitié pour être plus proche
  const offsetX =
    iconSize[0] / 4 / (111000 * Math.cos((markerLatLng.lat * Math.PI) / 180)); // Réduit de moitié pour être plus proche

  deleteMarker.setLatLng([
    markerLatLng.lat + offsetY,
    markerLatLng.lng + offsetX,
  ]);

  // Ajouter le bouton à la carte
  deleteMarker.addTo(map);

  // Fonction pour afficher le bouton
  const showDeleteButton = () => {
    deleteMarker.setOpacity(1);
    const deleteBtnEl = document.getElementById(deleteBtnId);
    if (deleteBtnEl) {
      deleteBtnEl.style.opacity = "1";
      deleteBtnEl.style.pointerEvents = "all";
    }
  };

  // Fonction pour cacher le bouton
  const hideDeleteButton = () => {
    deleteMarker.setOpacity(0);
    const deleteBtnEl = document.getElementById(deleteBtnId);
    if (deleteBtnEl) {
      deleteBtnEl.style.opacity = "0";
      deleteBtnEl.style.pointerEvents = "none";
    }
  };

  // Afficher le bouton au survol du marqueur
  marker.on("mouseover", showDeleteButton);

  // Cacher le bouton quand on quitte le survol du marqueur
  marker.on("mouseout", () => {
    // Petit délai pour éviter de cacher si on survole le bouton
    setTimeout(() => {
      const deleteBtnEl = document.getElementById(deleteBtnId);
      if (deleteBtnEl && !deleteBtnEl.matches(":hover")) {
        hideDeleteButton();
      }
    }, 100);
  });

  // Afficher le bouton au survol du bouton lui-même
  deleteMarker.on("mouseover", showDeleteButton);

  // Cacher le bouton quand on quitte le survol du bouton
  deleteMarker.on("mouseout", hideDeleteButton);

  // Gérer le clic sur le bouton de suppression
  deleteMarker.on("click", (e) => {
    e.originalEvent?.stopPropagation();
    map.removeLayer(marker);
    map.removeLayer(deleteMarker);
    drawnItems.removeLayer(marker);

    // Exporter les données après suppression
    if (onMapDataChange) {
      setTimeout(() => {
        const markers: any[] = [];
        const polylines: any[] = [];

        drawnItems.eachLayer((layer: L.Layer) => {
          if (layer instanceof L.Marker) {
            const latlng = layer.getLatLng();
            let markerType: MarkerType = "priority";
            const icon = layer.options.icon;
            if (icon === iconStop) {
              markerType = "stop";
            } else if (icon === iconZone30) {
              markerType = "zone30";
            } else if (icon === iconFinZone30) {
              markerType = "finZone30";
            }
            markers.push({
              type: markerType,
              lat: latlng.lat,
              lng: latlng.lng,
            });
          } else if (layer instanceof L.Polyline) {
            const latlngs = layer.getLatLngs();
            const points = Array.isArray(latlngs)
              ? latlngs
                  .map((ll: any) => {
                    if (ll instanceof L.LatLng) {
                      return { lat: ll.lat, lng: ll.lng };
                    } else if (Array.isArray(ll)) {
                      return ll.map((l: any) => ({ lat: l.lat, lng: l.lng }));
                    }
                    return null;
                  })
                  .filter(Boolean)
              : [];
            polylines.push({
              points: points.flat(),
            });
          }
        });

        onMapDataChange({ markers, polylines });
      }, 100);
    }
  });

  // Mettre à jour la position du bouton quand le marqueur est déplacé
  marker.on("drag", () => {
    const newLatLng = marker.getLatLng();
    deleteMarker.setLatLng([newLatLng.lat + offsetY, newLatLng.lng + offsetX]);
  });

  // Sauvegarder une référence au bouton dans le marqueur pour pouvoir le supprimer
  (marker as any).deleteButton = deleteMarker;
}

function LeafletDrawEditor({
  selectedMarkerType,
  onMarkerTypeChange,
  onMapDataChange,
  initialMapData,
  readOnly = false,
}: {
  selectedMarkerType: MarkerType;
  onMarkerTypeChange: (type: MarkerType) => void;
  onMapDataChange?: (data: any) => void;
  initialMapData?: any;
  readOnly?: boolean;
}) {
  const map = useMap();
  const drawnItemsRef = useRef(new L.FeatureGroup());
  const clickHandlerRef = useRef<((e: L.LeafletMouseEvent) => void) | null>(
    null
  );

  useEffect(() => {
    const drawnItems = drawnItemsRef.current;
    map.addLayer(drawnItems);

    // Fonction pour exporter les données de la carte
    const exportMapData = () => {
      const markers: any[] = [];
      const polylines: any[] = [];

      drawnItems.eachLayer((layer: L.Layer) => {
        if (layer instanceof L.Marker) {
          const latlng = layer.getLatLng();
          let markerType: MarkerType = "priority"; // Par défaut

          // Déterminer le type de marqueur selon l'icône
          const icon = layer.options.icon;
          if (icon === iconStop) {
            markerType = "stop";
          } else if (icon === iconZone30) {
            markerType = "zone30";
          } else if (icon === iconFinZone30) {
            markerType = "finZone30";
          }

          markers.push({
            type: markerType,
            lat: latlng.lat,
            lng: latlng.lng,
          });
        } else if (layer instanceof L.Polyline) {
          const latlngs = layer.getLatLngs();
          const points = Array.isArray(latlngs)
            ? latlngs
                .map((ll: any) => {
                  if (ll instanceof L.LatLng) {
                    return { lat: ll.lat, lng: ll.lng };
                  } else if (Array.isArray(ll)) {
                    return ll.map((l: any) => ({ lat: l.lat, lng: l.lng }));
                  }
                  return null;
                })
                .filter(Boolean)
            : [];

          polylines.push({
            points: points.flat(),
          });
        }
      });

      const data = { markers, polylines };
      if (onMapDataChange) {
        onMapDataChange(data);
      }
    };

    // Charger les données initiales si disponibles
    if (initialMapData) {
      if (initialMapData.markers) {
        initialMapData.markers.forEach((markerData: any) => {
          let icon: L.Icon | L.DivIcon;
          switch (markerData.type) {
            case "priority":
              icon = iconDanger;
              break;
            case "stop":
              icon = iconStop;
              break;
            case "zone30":
              icon = iconZone30;
              break;
            case "finZone30":
              icon = iconFinZone30;
              break;
            default:
              icon = iconDanger;
          }

          const marker = L.marker([markerData.lat, markerData.lng], {
            icon,
            draggable: !readOnly,
          });
          drawnItems.addLayer(marker);

          if (!readOnly) {
            addDeleteButtonToMarker(marker, map, drawnItems, onMapDataChange);
          }
        });
      }

      if (initialMapData.polylines && Array.isArray(initialMapData.polylines)) {
        initialMapData.polylines.forEach((polylineData: any) => {
          if (polylineData.points && Array.isArray(polylineData.points)) {
            const points = polylineData.points
              .map((p: any) => {
                if (p.lat && p.lng) {
                  return [p.lat, p.lng] as [number, number];
                }
                return null;
              })
              .filter(Boolean) as [number, number][];

            if (points.length > 0) {
              const polyline = L.polyline(points, {
                weight: 4,
                interactive: !readOnly,
              });

              if (!readOnly) {
                polyline.on("mouseover", () => {
                  map.getContainer().style.cursor = "pointer";
                });
                polyline.on("mouseout", () => {
                  map.getContainer().style.cursor = "";
                });
              }

              drawnItems.addLayer(polyline);
            }
          }
        });
      }
    }

    // Tools
    const drawControl = new L.Control.Draw({
      position: "topright",
      draw: {
        polygon: false,
        circle: false,
        rectangle: false,
        circlemarker: false,
        marker: false, // Désactiver le marqueur par défaut
        polyline: readOnly
          ? false
          : {
              shapeOptions: {
                weight: 4,
              },
            },
      },
      ...(readOnly
        ? {}
        : {
            edit: {
              featureGroup: drawnItems,
              remove: false, // Désactiver la suppression au clic direct
              edit: {
                selectedPathOptions: {
                  color: "#10b981",
                  weight: 5,
                  opacity: 0.9,
                  dashArray: "10, 5",
                },
              },
            },
          }),
    });

    if (!readOnly) {
      map.addControl(drawControl);
    }

    // Fonction pour ajouter des boutons de suppression aux points d'une polyline en mode édition
    const addDeleteButtonsToPolylineHandles = (polyline: L.Polyline) => {
      // Attendre que les handles soient créés par Leaflet Draw
      setTimeout(() => {
        const latlngs = polyline.getLatLngs();

        // Flatten les latlngs (gérer les segments multiples)
        const flattenLatlngs = (arr: any[]): L.LatLng[] => {
          const result: L.LatLng[] = [];
          arr.forEach((item) => {
            if (
              Array.isArray(item) &&
              item.length > 0 &&
              item[0] instanceof L.LatLng
            ) {
              result.push(...item);
            } else if (item instanceof L.LatLng) {
              result.push(item);
            }
          });
          return result;
        };

        const allPoints = flattenLatlngs(
          Array.isArray(latlngs) ? latlngs : [latlngs]
        );

        allPoints.forEach((latlng: L.LatLng, index: number) => {
          // Créer un bouton de suppression pour ce point
          const deleteButton = L.divIcon({
            className: "polyline-handle-delete-btn",
            html: `
              <div style="
                width: 20px;
                height: 20px;
                background: #ef4444;
                border: 2px solid white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 2px 6px rgba(0,0,0,0.4);
                font-size: 14px;
                color: white;
                font-weight: 900;
                line-height: 1;
                position: relative;
                z-index: 1001;
              ">×</div>
            `,
            iconSize: [20, 20],
            iconAnchor: [10, 25], // Positionner au-dessus du handle
          });

          const deleteMarker = L.marker(latlng, {
            icon: deleteButton,
            interactive: true,
            zIndexOffset: 1001,
          });

          (deleteMarker as any).isDeleteButton = true;
          (deleteMarker as any).polyline = polyline;
          (deleteMarker as any).pointIndex = index;

          deleteMarker.addTo(map);

          // Gérer le clic pour supprimer ce point
          deleteMarker.on("click", (e) => {
            e.originalEvent?.stopPropagation();

            // Retirer le point de la polyline
            const currentLatlngs = polyline.getLatLngs();
            const flattened = flattenLatlngs(
              Array.isArray(currentLatlngs) ? currentLatlngs : [currentLatlngs]
            );

            if (flattened.length > 2) {
              flattened.splice(index, 1);
              polyline.setLatLngs(flattened);

              // Retirer tous les boutons de suppression
              map.eachLayer((mapLayer: L.Layer) => {
                if ((mapLayer as any).isDeleteButton) {
                  map.removeLayer(mapLayer);
                }
              });

              // Recréer les boutons pour les points restants
              addDeleteButtonsToPolylineHandles(polyline);

              // Exporter les données après suppression
              if (onMapDataChange && exportMapData) {
                setTimeout(exportMapData, 100);
              }
            }
          });
        });
      }, 150);
    };

    // Écouter quand une polyline est sélectionnée en mode édition
    map.on(L.Draw.Event.EDITSTART, (e: any) => {
      const handler = e.handler;
      if (handler && handler._enabledLayers) {
        handler._enabledLayers.eachLayer((layer: L.Layer) => {
          if (layer instanceof L.Polyline) {
            addDeleteButtonsToPolylineHandles(layer);
          }
        });
      }
    });

    // Nettoyer les boutons quand l'édition se termine
    map.on(L.Draw.Event.EDITSTOP, () => {
      map.eachLayer((mapLayer: L.Layer) => {
        if ((mapLayer as any).isDeleteButton) {
          map.removeLayer(mapLayer);
        }
      });
    });

    map.on(L.Draw.Event.CREATED, (e: any) => {
      const { layer } = e;

      // S'assurer que les polylines sont interactives et peuvent être éditées
      if (layer instanceof L.Polyline) {
        layer.options.interactive = true;
        // Activer les événements de survol uniquement (ne pas bloquer le clic pour l'édition)
        layer.on("mouseover", () => {
          map.getContainer().style.cursor = "pointer";
        });
        layer.on("mouseout", () => {
          map.getContainer().style.cursor = "";
        });
      }

      drawnItems.addLayer(layer);

      // Ajouter un bouton de suppression si c'est un marqueur
      if (layer instanceof L.Marker && !readOnly) {
        addDeleteButtonToMarker(layer, map, drawnItems, onMapDataChange);
      }

      // Exporter les données après ajout
      if (!readOnly) {
        setTimeout(exportMapData, 100);
      }
    });

    // Écouter quand une polyline est sélectionnée en mode édition
    map.on(L.Draw.Event.EDITSTART, (e: any) => {
      const layer = e.handler._enabledLayers;
      if (layer && !readOnly) {
        layer.eachLayer((l: L.Layer) => {
          if (l instanceof L.Polyline) {
            addDeleteButtonsToPolylineHandles(l);
          }
        });
      }
    });

    // Exporter les données après édition d'une polyline
    map.on(L.Draw.Event.EDITED, () => {
      if (!readOnly && onMapDataChange) {
        setTimeout(exportMapData, 100);
      }
    });

    // Gérer le placement de marqueurs personnalisés
    const handleMapClick = (e: L.LeafletMouseEvent) => {
      if (selectedMarkerType) {
        // Vérifier si on clique sur un élément existant (polyline, marker, etc.)
        const clickedLayer = e.target;
        if (
          clickedLayer &&
          clickedLayer !== map &&
          clickedLayer instanceof L.Layer
        ) {
          return; // Ne pas créer de marqueur si on clique sur un élément existant
        }

        let icon: L.Icon | L.DivIcon;
        switch (selectedMarkerType) {
          case "priority":
            icon = iconDanger; // Utiliser l'icône danger pour priorité
            break;
          case "stop":
            icon = iconStop;
            break;
          case "zone30":
            icon = iconZone30;
            break;
          case "finZone30":
            icon = iconFinZone30;
            break;
          default:
            return;
        }

        const marker = L.marker(e.latlng, {
          icon,
          draggable: !readOnly, // Rendre le marqueur déplaçable si pas en lecture seule
        });
        drawnItems.addLayer(marker);

        // Ajouter un bouton de suppression au marqueur si pas en lecture seule
        if (!readOnly) {
          addDeleteButtonToMarker(marker, map, drawnItems, onMapDataChange);
        }

        // Désélectionner après placement
        onMarkerTypeChange(null);

        // Exporter les données après ajout
        setTimeout(exportMapData, 100);
      }
    };

    // Retirer l'ancien handler s'il existe
    if (clickHandlerRef.current) {
      map.off("click", clickHandlerRef.current);
    }
    clickHandlerRef.current = handleMapClick;
    map.on("click", handleMapClick);

    return () => {
      if (!readOnly) {
        map.removeControl(drawControl);
      }
      if (clickHandlerRef.current) {
        map.off("click", clickHandlerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, selectedMarkerType, onMarkerTypeChange, initialMapData, readOnly]);

  return null;
}

function SetMapCenter({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
}

function CitySearch({ onSearch }: { onSearch: (city: string) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const geocodeCity = async (city: string) => {
    if (!city.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          city + ", France"
        )}&limit=5&addressdetails=1`,
        {
          headers: {
            "User-Agent": "MapPermis/1.0",
          },
        }
      );
      const data = await response.json();
      setResults(data);
      setShowResults(true);
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    if (value.length >= 3) {
      geocodeCity(value);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  const handleSelect = (result: any) => {
    setSearchTerm(result.display_name.split(",")[0]);
    setShowResults(false);
    onSearch(result);
  };

  return (
    <div className="city-search-container">
      <div className="city-search-input-wrapper">
        <input
          type="text"
          className="city-search-input"
          placeholder="Rechercher une ville..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          onFocus={() => results.length > 0 && setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
        />
        {isLoading && <span className="city-search-loader">...</span>}
      </div>
      {showResults && results.length > 0 && (
        <div className="city-search-results">
          {results.map((result, index) => (
            <div
              key={index}
              className="city-search-result-item"
              onClick={() => handleSelect(result)}
            >
              <strong>{result.display_name.split(",")[0]}</strong>
              <span className="city-search-result-details">
                {result.display_name.split(",").slice(1, 3).join(", ")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function MapEditor({
  initialCity,
  onCityChange,
  onMapDataChange,
  initialMapData,
  readOnly = false,
}: MapEditorProps) {
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    48.8566, 2.3522,
  ]);
  const [mapZoom, setMapZoom] = useState(14);
  const [selectedMarkerType, setSelectedMarkerType] =
    useState<MarkerType>(null);
  const lastGeocodedCityRef = useRef<string>("");

  const geocodeAndCenter = async (city: string) => {
    // Éviter de géocoder la même ville plusieurs fois
    if (lastGeocodedCityRef.current === city.trim().toLowerCase()) {
      return;
    }

    if (!city || city.trim().length < 3) {
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          city + ", France"
        )}&limit=1&addressdetails=1`,
        {
          headers: {
            "User-Agent": "MapPermis/1.0",
          },
        }
      );
      const data = await response.json();
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        setMapCenter([lat, lon]);
        setMapZoom(14);
        lastGeocodedCityRef.current = city.trim().toLowerCase();
        // Ne pas mettre à jour le champ ville automatiquement quand c'est appelé depuis initialCity
        // On laisse l'utilisateur garder ce qu'il a tapé
      }
    } catch (error) {
      console.error("Erreur lors du géocodage:", error);
    }
  };

  useEffect(() => {
    if (initialCity && initialCity.trim().length >= 3) {
      geocodeAndCenter(initialCity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialCity]);

  const handleCitySearch = (result: any) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    setMapCenter([lat, lon]);
    setMapZoom(14);
    if (onCityChange) {
      onCityChange(result.display_name.split(",")[0]);
    }
  };

  return (
    <div className="map-editor-container">
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: "100%", width: "100%" }}
        key={`${mapCenter[0]}-${mapCenter[1]}`}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SetMapCenter center={mapCenter} zoom={mapZoom} />
        <LeafletDrawEditor
          selectedMarkerType={selectedMarkerType}
          onMarkerTypeChange={setSelectedMarkerType}
          onMapDataChange={onMapDataChange}
          initialMapData={initialMapData}
          readOnly={readOnly}
        />
      </MapContainer>
      {!readOnly && (
        <div className="city-search-overlay">
          <CitySearch onSearch={handleCitySearch} />
        </div>
      )}
      {!readOnly && (
        <div className="marker-toolbar">
          <button
            className={`marker-toolbar-btn ${
              selectedMarkerType === "priority" ? "active" : ""
            }`}
            onClick={() =>
              setSelectedMarkerType(
                selectedMarkerType === "priority" ? null : "priority"
              )
            }
            title="Priorité"
          >
            <img
              className="priority-icon"
              src="https://cdn-icons-png.flaticon.com/512/595/595067.png"
              alt="Priorité"
            />
            <span>Priorité</span>
          </button>
          <button
            className={`marker-toolbar-btn ${
              selectedMarkerType === "stop" ? "active" : ""
            }`}
            onClick={() =>
              setSelectedMarkerType(
                selectedMarkerType === "stop" ? null : "stop"
              )
            }
            title="Stop"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 40 40"
              style={{ overflow: "visible" }}
            >
              <defs>
                <clipPath id="stopOctagon">
                  <polygon points="10,0 30,0 40,10 40,30 30,40 10,40 0,30 0,10" />
                </clipPath>
              </defs>
              <polygon
                points="10,0 30,0 40,10 40,30 30,40 10,40 0,30 0,10"
                fill="#DC143C"
                stroke="white"
                strokeWidth="2"
              />
              <text
                x="20"
                y="25"
                fontSize="12"
                fontWeight="900"
                fill="white"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
              >
                STOP
              </text>
            </svg>
            <span>Stop</span>
          </button>
          <button
            className={`marker-toolbar-btn ${
              selectedMarkerType === "zone30" ? "active" : ""
            }`}
            onClick={() =>
              setSelectedMarkerType(
                selectedMarkerType === "zone30" ? null : "zone30"
              )
            }
            title="Zone 30"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 50 50"
              style={{ overflow: "visible" }}
            >
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="white"
                stroke="#DC143C"
                strokeWidth="6"
              />
              <text
                x="25"
                y="32"
                fontSize="20"
                fontWeight="900"
                fill="#DC143C"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
              >
                30
              </text>
            </svg>
            <span>Zone 30</span>
          </button>
          <button
            className={`marker-toolbar-btn ${
              selectedMarkerType === "finZone30" ? "active" : ""
            }`}
            onClick={() =>
              setSelectedMarkerType(
                selectedMarkerType === "finZone30" ? null : "finZone30"
              )
            }
            title="Fin Zone 30"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 50 50"
              style={{ overflow: "visible" }}
            >
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="white"
                stroke="#000000"
                strokeWidth="6"
              />
              <text
                x="25"
                y="32"
                fontSize="20"
                fontWeight="900"
                fill="#DC143C"
                textAnchor="middle"
                fontFamily="Arial, sans-serif"
              >
                30
              </text>
              <line
                x1="13"
                y1="13"
                x2="37"
                y2="37"
                stroke="#000000"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
            <span>Fin Zone 30</span>
          </button>
        </div>
      )}
    </div>
  );
}
