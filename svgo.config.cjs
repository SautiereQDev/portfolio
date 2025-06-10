// eslint-disable-next-line no-undef
module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          // Préserver les éléments visuels importants
          removeViewBox: false,
          cleanupIds: false,
          removeTitle: false,
          removeDesc: false,

          // PRÉSERVER LES COULEURS ET STYLES
          convertColors: false,           // Ne pas convertir les couleurs
          convertShapeToPath: false,      // Garder les formes originales
          mergeStyles: false,             // Ne pas fusionner les styles

          // Optimisations sûres seulement
          removeUselessDefs: true,
          removeEmptyAttrs: true,
          removeEmptyText: true,
          removeEmptyContainers: true,
          collapseGroups: false,          // Ne pas réorganiser les groupes
        },
      },
    },

    // Supprimer uniquement les dimensions fixes pour la responsivité
    'removeDimensions',

    // Optimisations très conservatrices
    {
      name: 'cleanupNumericValues',
      params: {
        floatPrecision: 3,  // Plus de précision pour préserver les détails
      },
    },
  ],
};
