# Map Permis

Application web interactive de cartographie permettant de créer et d'éditer des parcours pour la préparation du permis de conduire. Développée avec React, TypeScript et Leaflet.

MapPermis est un outil moderne conçu pour t'aider à comprendre, visualiser et préparer les parcours du permis de conduire. Grâce à une carte interactive, tu peux tracer tes trajets, ajouter les priorités à droite, stops, zones 30 et toutes les zones clés d'un examen. L'objectif : rendre l'apprentissage de la conduite plus clair, plus efficace et plus personnalisé.

Que tu sois élève, accompagnateur ou moniteur, MapPermis te permet de recréer fidèlement les itinéraires d'examen, d'annoter les points difficiles, et de t'entraîner en conditions réelles. Prépare ton permis en toute sérénité, avec une application pensée pour la pratique, la précision… et la réussite.

## ✨ Dernières fonctionnalités

- **🎨 Interface utilisateur modernisée** : Nouvelle barre d'outils personnalisée avec boutons stylisés
- **💾 Système de sauvegarde amélioré** : Bouton "Sauver" avec verrouillage automatique de la carte
- **🗑️ Effacement intelligent** : Bouton "Clear" avec confirmation avant suppression
- **🔍 Recherche de ville améliorée** : Recherche automatique avec debounce et suggestions en temps réel
- **📱 Composants d'alerte personnalisés** : Remplacement des alertes natives par des popups stylisées
- **🔒 Mode verrouillage** : Protection contre les modifications accidentelles après sauvegarde

## 🗺️ Fonctionnalités principales

### Cartographie interactive

- **Carte OpenStreetMap** : Visualisation de cartes avec zoom et navigation fluide
- **Recherche de ville intelligente** : Recherche avec autocomplétion et centrage automatique sur n'importe quelle ville française
  - Recherche automatique avec debounce (500ms)
  - Suggestions de villes en temps réel
  - Synchronisation automatique avec le champ ville du formulaire
- **Navigation** : Zoom, déplacement et contrôle complet de la carte

### Création de parcours

- **Barre d'outils personnalisée** : Interface moderne avec boutons stylisés pour tous les outils
  - **Tracer** : Bouton pour dessiner des parcours
  - **Modifier** : Bouton pour éditer les parcours existants
  - **Sauver** : Sauvegarde les modifications et verrouille la carte
  - **Clear** : Efface tous les éléments de la carte
- **Dessin de tracés** : Trace facilement tes parcours avec l'outil polyline
- **Édition de tracés** : Modifie tes tracés en ajoutant, déplaçant ou supprimant des points
- **Système de verrouillage** : Après sauvegarde, la carte est verrouillée pour éviter les modifications accidentelles
- **Sauvegarde** : Enregistre tes parcours avec nom, description et ville

### Marqueurs personnalisés

L'application propose 4 types de marqueurs spécialisés :

1. **Priorité à droite** : Marqueur triangulaire pour indiquer les priorités à droite
2. **Stop** : Panneau stop octogonal rouge avec texte "STOP"
3. **Zone 30** : Panneau rond avec limite de vitesse 30 km/h
4. **Fin Zone 30** : Panneau rond barré pour indiquer la fin de zone 30

### Gestion des parcours

- **Création** : Crée et sauvegarde tes parcours avec toutes leurs données
- **Liste** : Visualise tous tes parcours sauvegardés avec aperçu
- **Visualisation** : Ouvre un parcours en mode lecture seule pour réviser
- **Suppression** : Supprime les parcours avec confirmation visuelle
- **Ville automatique** : La ville se remplit automatiquement lors de la recherche sur la carte

### Fonctionnalités avancées

- **Interface utilisateur moderne** : Composants d'alerte personnalisés avec design cohérent
  - Alertes de confirmation, d'information et de succès
  - Animations fluides
  - Accessibilité (fermeture avec Échap, clic sur overlay)
- **Drag & Drop** : Déplace facilement les marqueurs sur la carte
- **Suppression intuitive** : Supprime les marqueurs avec une croix qui apparaît au survol
- **Édition de polylines** : Modifie tes tracés en ajoutant ou supprimant des points
- **Mode lecture seule** : Visualise tes parcours sans risque de modification accidentelle
- **Gestion de ville automatique** : Le champ ville se remplit automatiquement lors de la recherche sur la carte
- **Vérification des actions** : Confirmations pour les actions critiques (suppression, effacement)

## 🚀 Technologies utilisées

- **React 19** : Bibliothèque JavaScript pour l'interface utilisateur
- **TypeScript** : Typage statique pour JavaScript
- **React Router** : Navigation et routage dans l'application
- **Leaflet** : Bibliothèque open-source pour les cartes interactives
- **React-Leaflet** : Composants React pour Leaflet
- **Leaflet-Draw** : Plugin Leaflet pour le dessin et l'édition de formes
- **OpenStreetMap Nominatim** : API de géocodage pour la recherche de villes

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

## 📖 Guide d'utilisation détaillé

### Créer un nouveau parcours

1. Depuis la page d'accueil, cliquez sur **"Créer un parcours"**
2. Remplissez le formulaire :
   - **Nom du parcours** (obligatoire)
   - **Ville** : Indiquez la ville pour centrer automatiquement la carte
   - **Description** : Ajoutez une description optionnelle
3. La carte se centre automatiquement sur la ville indiquée

### Rechercher une ville sur la carte

1. Utilisez le champ de recherche en haut à gauche de la carte
2. Tapez le nom de la ville (minimum 3 caractères)
   - La recherche se lance automatiquement après 500ms d'inactivité
3. Sélectionnez la ville dans les résultats proposés
   - Ou appuyez sur Entrée pour sélectionner le premier résultat
4. La carte se centre automatiquement sur la ville sélectionnée
5. Le nom de la ville apparaît automatiquement dans le formulaire (en lecture seule)

### Tracer un parcours

1. Cliquez sur le bouton **"Tracer"** dans la barre d'outils (en haut à droite)
2. Cliquez sur la carte pour commencer le tracé
3. Cliquez à nouveau pour ajouter des points à votre parcours
4. Double-cliquez pour terminer le tracé
5. Le mode se désactive automatiquement après la création du tracé

### Ajouter des marqueurs

1. Sélectionnez un type de marqueur dans la barre d'outils (en haut à droite) :
   - **Priorité** : Pour les priorités à droite
   - **Stop** : Pour les panneaux stop
   - **Zone 30** : Pour les zones limitées à 30 km/h
   - **Fin Zone 30** : Pour la fin des zones 30
2. Cliquez sur la carte à l'endroit où vous souhaitez placer le marqueur
3. Le marqueur est placé et la sélection se désactive automatiquement

### Déplacer un marqueur

- Cliquez sur le marqueur et faites-le glisser (drag & drop) à l'endroit souhaité

### Supprimer un marqueur

1. Survolez le marqueur avec la souris
2. Une petite croix rouge apparaît en haut à droite du marqueur
3. Cliquez sur la croix pour supprimer le marqueur

### Modifier un tracé (polyline)

1. Cliquez sur le bouton **"Modifier"** dans la barre d'outils (en haut à droite)
2. Cliquez sur la ligne pour la sélectionner (elle devient verte avec des poignées)
3. **Ajouter un point** : Cliquez sur un segment de la ligne (entre deux points)
4. **Déplacer un point** : Cliquez et glissez un point existant
5. **Supprimer un point** : Cliquez sur un point, puis cliquez sur l'icône poubelle qui apparaît
6. Le mode édition reste actif pour permettre plusieurs modifications

### Sauvegarder un parcours

#### Depuis la barre d'outils de la carte

1. Après avoir créé ou modifié votre parcours, cliquez sur **"Sauver"** dans la barre d'outils
2. La carte se verrouille automatiquement (les boutons de modification sont désactivés)
3. Pour modifier à nouveau, cliquez sur **"Modifier"** pour déverrouiller

#### Depuis le formulaire

1. Remplissez le formulaire (nom du parcours obligatoire, ville, description)
2. Cliquez sur **"Enregistrer le parcours"**
3. Le parcours est sauvegardé dans le stockage local du navigateur
4. Une alerte de succès s'affiche
5. Vous êtes redirigé vers la liste de vos parcours

### Effacer la carte

1. Cliquez sur le bouton **"Clear"** dans la barre d'outils
2. Confirmez l'action dans la boîte de dialogue
3. Tous les éléments (marqueurs et tracés) sont supprimés
4. La carte est déverrouillée et prête pour une nouvelle création

### Visualiser un parcours

1. Depuis la page **"Mes parcours"**, cliquez sur **"Ouvrir sur la carte"**
2. Le parcours s'ouvre en mode lecture seule avec tous ses marqueurs et tracés
3. Vous pouvez naviguer sur la carte mais pas modifier le parcours

### Supprimer un parcours

1. Depuis la page **"Mes parcours"**, cliquez sur la **croix (×)** en haut à droite de la carte du parcours
2. Confirmez la suppression dans la boîte de dialogue personnalisée
3. Le parcours est supprimé et retiré de la liste

## 📁 Structure du projet

```
map-permis/
├── public/                      # Fichiers statiques
├── src/
│   ├── components/             # Composants React réutilisables
│   │   ├── Alert/             # Composant d'alerte personnalisé
│   │   │   ├── Alert.tsx      # Composant principal
│   │   │   ├── Alert.css      # Styles
│   │   │   └── useAlert.tsx   # Hook personnalisé
│   │   ├── Error404/          # Page d'erreur 404
│   │   ├── Footer/            # Pied de page
│   │   ├── Header/            # En-tête de navigation
│   │   ├── Icons/             # Icônes SVG personnalisées
│   │   ├── Loader/            # Composant de chargement
│   │   └── MapEditor/         # Éditeur de carte principal
│   │       ├── MapEditor.tsx  # Logique principale
│   │       └── MapEditor.css  # Styles de l'éditeur
│   ├── pages/                 # Pages de l'application
│   │   ├── AddParcours/       # Page de création de parcours
│   │   ├── Home/              # Page d'accueil
│   │   ├── ViewParcours/      # Liste des parcours
│   │   └── ViewSingleParcours/# Visualisation d'un parcours
│   ├── App.tsx                # Composant principal avec routage
│   ├── App.css                # Styles globaux
│   └── index.tsx              # Point d'entrée
├── package.json
└── README.md
```

## 🛠️ Scripts disponibles

- `npm start` ou `npm run dev` : Lance l'application en mode développement
- `npm run build` : Construit l'application pour la production
- `npm test` : Lance les tests
- `npm run eject` : Éjecte la configuration (opération irréversible)

## 📝 Notes importantes

### Stockage des données

- Les parcours sont actuellement sauvegardés dans le **localStorage** du navigateur
- Les données sont stockées localement sur votre machine
- Pour accéder à vos parcours depuis un autre appareil, vous devrez les exporter/importer (fonctionnalité à venir)

### Limitations actuelles

- Le stockage est limité par la capacité du localStorage du navigateur (~5-10 MB selon le navigateur)
- Les parcours ne sont pas synchronisés entre différents appareils
- Une version future pourrait intégrer une base de données distante ou un service cloud

## 🎨 Personnalisation et Design

### Marqueurs personnalisés

L'application utilise des marqueurs personnalisés avec des styles spécifiques :

- **Priorité** : Icône triangulaire jaune (Flaticon)
- **Stop** : Panneau octogonal rouge créé en CSS
- **Zone 30** : Panneau rond rouge avec texte "30"
- **Fin Zone 30** : Panneau rond noir avec texte "30" barré

### Interface utilisateur

- **Design moderne** : Interface avec gradients verts/bleus (#10b981, #06b6d4)
- **Composants d'alerte personnalisés** : Remplace les alertes natives du navigateur
- **Barre d'outils stylisée** : Boutons cohérents avec icônes SVG personnalisées
- **Animations fluides** : Transitions et effets visuels pour une meilleure expérience
- **Responsive** : Interface adaptée à tous les écrans

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

## 📄 Licence

Ce projet est privé.

## 🔗 Ressources

- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [React Router Documentation](https://reactrouter.com/)
- [Leaflet Documentation](https://leafletjs.com/)
- [React-Leaflet Documentation](https://react-leaflet.js.org/)
- [Leaflet-Draw Documentation](https://github.com/Leaflet/Leaflet.draw)
- [OpenStreetMap Nominatim API](https://nominatim.org/release-docs/develop/api/Overview/)

## 🐛 Problèmes connus

Si vous rencontrez des problèmes :

1. Vérifiez que vous utilisez une version récente de Node.js
2. Supprimez le dossier `node_modules` et réinstallez les dépendances : `npm install`
3. Vérifiez la console du navigateur pour les erreurs JavaScript
4. Assurez-vous que votre connexion Internet est active (pour charger les tuiles de carte)

## 📞 Support

Pour toute question ou problème, n'hésitez pas à ouvrir une issue sur le dépôt GitHub.
