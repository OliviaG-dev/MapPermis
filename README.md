# Map Permis

Application web interactive de cartographie permettant de créer et d'éditer des éléments sur une carte OpenStreetMap. Développée avec React, TypeScript et Leaflet.

MapPermis est un outil moderne conçu pour t’aider à comprendre, visualiser et préparer les parcours du permis de conduire.
Grâce à une carte interactive, tu peux tracer tes trajets, ajouter les priorités à droite, stops, dangers et toutes les zones clés d’un examen. L’objectif : rendre l’apprentissage de la conduite plus clair, plus efficace et plus personnalisé.

Que tu sois élève, accompagnateur ou moniteur, MapPermis te permet de recréer fidèlement les itinéraires d’examen, d’annoter les points difficiles, et de t’entraîner en conditions réelles. Prépare ton permis en toute sérénité, avec une application pensée pour la pratique, la précision… et la réussite.

## 🗺️ Fonctionnalités

- **Carte interactive** : Visualisation de cartes OpenStreetMap avec zoom et navigation
- **Dessin de marqueurs** : Ajout de marqueurs personnalisés avec différentes icônes selon le contexte
- **Dessin de polylignes** : Création de lignes et de tracés sur la carte
- **Édition** : Modification et suppression des éléments dessinés
- **Marqueurs personnalisés** :
  - **Danger** : Clic normal
  - **Priorité** : SHIFT + Clic
  - **Stop** : CTRL + Clic

## 🚀 Technologies utilisées

- **React 19** : Bibliothèque JavaScript pour l'interface utilisateur
- **TypeScript** : Typage statique pour JavaScript
- **Leaflet** : Bibliothèque open-source pour les cartes interactives
- **React-Leaflet** : Composants React pour Leaflet
- **Leaflet-Draw** : Plugin Leaflet pour le dessin et l'édition de formes

## 📋 Prérequis

- Node.js (version 14 ou supérieure)
- npm ou yarn

## 🔧 Installation

1. Clonez le dépôt :

```bash
git clone <url-du-depot>
cd map-permis
```

2. Installez les dépendances :

```bash
npm install
```

## 🎯 Utilisation

### Démarrage en mode développement

Lancez l'application en mode développement :

```bash
npm start
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000)

### Construction pour la production

Créez une version optimisée pour la production :

```bash
npm run build
```

Les fichiers de production seront générés dans le dossier `build/`.

### Tests

Lancez les tests :

```bash
npm test
```

## 📖 Guide d'utilisation

### Ajouter un marqueur

1. Cliquez sur l'icône de marqueur dans la barre d'outils (en haut à droite)
2. Cliquez sur la carte pour placer le marqueur
3. Utilisez les raccourcis clavier pour changer le type de marqueur :
   - **Clic normal** : Marqueur de danger
   - **SHIFT + Clic** : Marqueur de priorité
   - **CTRL + Clic** : Marqueur de stop

### Dessiner une polyligne

1. Cliquez sur l'icône de ligne dans la barre d'outils
2. Cliquez sur la carte pour commencer le tracé
3. Cliquez à nouveau pour ajouter des points
4. Double-cliquez pour terminer le tracé

### Modifier ou supprimer un élément

1. Cliquez sur l'icône d'édition dans la barre d'outils
2. Sélectionnez un élément sur la carte
3. Modifiez sa position ou supprimez-le

## 📁 Structure du projet

```
map-permis/
├── public/              # Fichiers statiques
├── src/
│   ├── components/      # Composants React
│   │   └── MapEditor/
│   │       ├── MapEditor.tsx
│   │       └── MapEditor.css
│   ├── pages/          # Pages de l'application
│   │   └── Home/
│   │       ├── Home.tsx
│   │       └── Home.css
│   ├── App.tsx         # Composant principal
│   ├── App.css         # Styles de l'application
│   └── index.tsx       # Point d'entrée
├── package.json
└── README.md
```

## 🛠️ Scripts disponibles

- `npm start` : Lance l'application en mode développement
- `npm run build` : Construit l'application pour la production
- `npm test` : Lance les tests
- `npm run eject` : Éjecte la configuration (opération irréversible)

## 📝 Notes

- L'application utilise les tuiles OpenStreetMap pour l'affichage des cartes
- Les icônes des marqueurs sont chargées depuis Flaticon
- La carte est centrée par défaut sur Paris (48.8566, 2.3522)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

Ce projet est privé.

## 🔗 Ressources

- [React Documentation](https://reactjs.org/)
- [Leaflet Documentation](https://leafletjs.com/)
- [React-Leaflet Documentation](https://react-leaflet.js.org/)
- [Leaflet-Draw Documentation](https://github.com/Leaflet/Leaflet.draw)
