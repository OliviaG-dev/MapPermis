import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import * as L from "leaflet";
import "leaflet-draw";
import "./MapEditor.css";

const iconStop = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/568/568717.png",
  iconSize: [32, 32],
});

const iconPriority = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2100/2100794.png",
  iconSize: [32, 32],
});

const iconDanger = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/595/595067.png",
  iconSize: [32, 32],
});

function LeafletDrawEditor() {
  const map = useMap();
  const drawnItemsRef = useRef(new L.FeatureGroup());

  useEffect(() => {
    const drawnItems = drawnItemsRef.current;
    map.addLayer(drawnItems);

    // Tools
    const drawControl = new L.Control.Draw({
      position: "topright",
      draw: {
        polygon: false,
        circle: false,
        rectangle: false,
        circlemarker: false,
        marker: {
          icon: iconDanger,
        },
        polyline: {
          shapeOptions: {
            weight: 4,
          },
        },
      },
      edit: {
        featureGroup: drawnItems,
      },
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, (e: any) => {
      const { layer } = e;
      // Exemple : clic = danger, SHIFT + clic = priorité, CTRL + clic = stop
      if (layer instanceof L.Marker) {
        if (e.originalEvent?.shiftKey) layer.setIcon(iconPriority);
        else if (e.originalEvent?.ctrlKey) layer.setIcon(iconStop);
        else layer.setIcon(iconDanger);
      }
      drawnItems.addLayer(layer);
    });

    return () => {
      map.removeControl(drawControl);
    };
  }, [map]);

  return null;
}

export default function MapEditor() {
  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={14}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LeafletDrawEditor />
    </MapContainer>
  );
}

