# Structure CSS du Portfolio

Cette documentation explique l'organisation modulaire des styles CSS du portfolio.

## Organisation des fichiers

### 📁 `src/styles/`

La structure CSS est divisée en plusieurs modules pour une meilleure maintenabilité :

```
src/styles/
├── base.css          # Styles de base et configuration globale
├── typography.css    # Configuration typographique
├── animations.css    # Animations générales et keyframes
├── typewriter.css    # Effet machine à écrire spécialisé
└── components.css    # Styles spécifiques aux composants
```

### 📄 Détail des fichiers

#### `base.css`

- **Rôle** : Styles fondamentaux et configuration globale
- **Contient** :
  - Configuration de la sélection de texte
  - Smooth scrolling
  - Styles de scrollbar personnalisés

#### `typography.css`

- **Rôle** : Configuration typographique
- **Contient** :
  - Configuration de la police Manrope
  - Styles de classe `.font-body` et `.text-content`
  - Optimisations de rendu des polices

#### `animations.css`

- **Rôle** : Animations générales et effets visuels
- **Contient** :
  - Keyframes d'animations (blob, glow, pulse, etc.)
  - Classes utilitaires d'animation (.animate-\*)
  - Effets de transition et de mouvement

#### `typewriter.css`

- **Rôle** : Effet machine à écrire spécialisé
- **Contient** :
  - Styles du curseur clignotant
  - Animations de révélation de caractères
  - Indicateur de progression
  - Effets visuels avancés du typewriter

#### `components.css`

- **Rôle** : Styles spécifiques aux composants
- **Contient** :
  - Styles des cartes de projets
  - Animations de grille
  - Autres composants spécialisés

### 🔄 Import des styles

Le fichier principal `src/index.css` importe tous les modules :

```css
@import "tailwindcss";

/* Import all style modules */
@import "./styles/base.css";
@import "./styles/typography.css";
@import "./styles/animations.css";
@import "./styles/typewriter.css";
@import "./styles/components.css";
```

## Avantages de cette structure

### ✅ **Maintenabilité**

- Chaque fichier a une responsabilité claire
- Facilite la localisation et modification des styles
- Évite les fichiers CSS monolithiques

### ✅ **Performance**

- Possibilité de lazy-loading spécifique
- Tree-shaking potentiel des styles non utilisés
- Optimisation de cache par module

### ✅ **Organisation**

- Structure logique et prévisible
- Séparation des préoccupations
- Facilite la collaboration en équipe

### ✅ **Évolutivité**

- Ajout facile de nouveaux modules
- Refactoring sélectif par fonctionnalité
- Tests ciblés par module

## Conventions de nommage

### Classes CSS

- **Préfixe par fonctionnalité** : `.typewriter-*`, `.animate-*`
- **BEM pour les composants** : `.component__element--modifier`
- **Utilitaires descriptifs** : `.font-body`, `.text-content`

### Fichiers

- **Nom descriptif** : `typography.css`, `animations.css`
- **Lowercase avec tirets** : `typewriter.css`
- **Fonction claire** : chaque fichier = une responsabilité

## Maintenance

### Ajout d'un nouveau module

1. Créer le fichier dans `src/styles/`
2. Ajouter l'import dans `src/index.css`
3. Documenter le contenu et la responsabilité

### Modification de styles

1. Identifier le bon module selon la fonctionnalité
2. Modifier uniquement le fichier concerné
3. Tester l'impact sur les autres composants

### Débogage

- Inspecter l'élément pour identifier la classe CSS
- Localiser dans le bon module selon le préfixe
- Modifier et tester en isolation
