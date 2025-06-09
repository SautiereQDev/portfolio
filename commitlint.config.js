export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat", // Nouvelle fonctionnalité
        "fix", // Correction de bug
        "docs", // Documentation uniquement
        "style", // Changements qui n'affectent pas le sens du code (espaces, formatting, etc.)
        "refactor", // Changement de code qui ne corrige pas un bug ni n'ajoute une fonctionnalité
        "perf", // Changement de code qui améliore les performances
        "test", // Ajout de tests manquants ou correction de tests existants
        "build", // Changements qui affectent le système de build ou les dépendances externes
        "ci", // Changements aux fichiers et scripts de CI
        "chore", // Autres changements qui ne modifient pas src ou test
        "revert", // Annule un commit précédent
      ],
    ],
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    "scope-case": [2, "always", "lower-case"],
    "subject-case": [
      2,
      "never",
      ["sentence-case", "start-case", "pascal-case", "upper-case"],
    ],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "header-max-length": [2, "always", 100],
    "body-leading-blank": [1, "always"],
    "body-max-line-length": [2, "always", 100],
    "footer-leading-blank": [1, "always"],
    "footer-max-line-length": [2, "always", 100],
  },
};
