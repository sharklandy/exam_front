# Application de Gestion d'Utilisateurs React

Application React permettant de gérer une liste d'utilisateurs avec fonctionnalités de recherche, tri et favoris.

## Fichiers Principaux

### Composants
- `App.jsx` : Composant racine, gère le routage et le thème (clair/sombre)
- `UserList.jsx` : Affiche la liste des utilisateurs avec :
  - Recherche par nom/email
  - Tri (nom, âge, favoris)
  - Pagination
  - Mise en cache des résultats (useMemo)
- `UserCard.jsx` : Carte individuelle d'utilisateur avec :
  - Informations basiques
  - Gestion des favoris (localStorage)
  - Lien vers les détails
- `UserDetail.jsx` : Affiche les détails complets d'un utilisateur

### Pages
- `Home.jsx` : Page principale affichant la liste des utilisateurs
- `UserPage.jsx` : Page de détail d'un utilisateur avec :
  - Chargement asynchrone des données
  - Gestion des états de chargement
  - Gestion des erreurs

## Fonctionnalités

- 🌓 Thème clair/sombre
- 🔍 Recherche en temps réel
- 📊 Tri multiple (nom, âge, favoris)
- ⭐ Système de favoris persistant
- 📱 Interface responsive
- 📄 Pagination
- ⚡ Optimisations de performance avec useMemo

## API

L'application utilise l'API [DummyJSON](https://dummyjson.com/users) pour récupérer les données utilisateurs.