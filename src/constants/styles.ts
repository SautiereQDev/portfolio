/**
 * CSS Class Utilities
 * Centralizes common CSS classes for consistency and maintainability
 */

// Container and layout classes
export const LAYOUT_CLASSES = {
  container: "container mx-auto px-6 lg:px-8",
  maxWidth: {
    sm: "mx-auto max-w-2xl",
    md: "mx-auto max-w-4xl",
    lg: "mx-auto max-w-6xl",
    xl: "mx-auto max-w-7xl",
  },
  section: "py-24",
  sectionAlt: "py-24 bg-gray-50",
  grid: {
    base: "grid gap-8",
    responsive: "grid gap-8 md:grid-cols-2 lg:grid-cols-3",
    services: "grid gap-8 md:grid-cols-2 lg:max-w-5xl lg:mx-auto",
  },
} as const;

// Card classes
export const CARD_CLASSES = {
  base: "border-0 bg-white shadow-lg",
  interactive:
    "border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
  group:
    "group h-full border-0 bg-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]",
  content: "px-6 pb-6",
  contentLarge: "px-8 pb-8",
} as const;

// Icon container classes
export const ICON_CLASSES = {
  base: "flex h-16 w-16 items-center justify-center rounded-xl transition-transform duration-300",
  hover:
    "flex h-16 w-16 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
  small:
    "flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
  gradient: {
    blue: "bg-gradient-to-r from-blue-600 to-purple-600",
    cyan: "bg-gradient-to-r from-blue-600 to-cyan-600",
    purple: "bg-gradient-to-r from-purple-600 to-pink-600",
    indigo: "bg-gradient-to-r from-indigo-600 to-blue-600",
    green: "bg-gradient-to-r from-green-600 to-emerald-600",
  },
} as const;

// Badge classes
export const BADGE_CLASSES = {
  section: "mb-4 border-0",
  gradient: {
    blue: "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800",
    indigo: "bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-800",
    purple: "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800",
    pink: "bg-gradient-to-r from-pink-100 to-red-100 text-pink-800",
    green: "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800",
  },
} as const;

// Typography classes
export const TYPOGRAPHY_CLASSES = {
  heading: {
    hero: "mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold leading-tight text-transparent md:text-6xl",
    section: "mb-4 text-3xl font-bold text-gray-900 md:text-4xl",
    card: "text-xl font-bold text-gray-900",
    cardLarge: "text-2xl font-bold text-gray-900",
  },
  body: {
    hero: "mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl",
    section: "mx-auto max-w-2xl text-xl text-gray-600",
    card: "text-gray-700 leading-relaxed",
    description: "leading-relaxed text-gray-600",
  },
} as const;

// Button and CTA classes
export const CTA_CLASSES = {
  section: "flex flex-col justify-center gap-4 sm:flex-row",
  primary: "bg-white text-blue-600 hover:bg-gray-50",
  secondary: "border-white text-white hover:bg-white hover:text-blue-600",
} as const;

// Utility function to combine classes
export const cn = (...classes: (string | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// Utility function to get responsive grid classes
export const getGridClasses = (columns: 1 | 2 | 3 | 4) => {
  const baseClasses = LAYOUT_CLASSES.grid.base;

  switch (columns) {
    case 2:
      return `${baseClasses} md:grid-cols-2`;
    case 3:
      return `${baseClasses} md:grid-cols-2 lg:grid-cols-3`;
    case 4:
      return `${baseClasses} md:grid-cols-2 lg:grid-cols-4`;
    default:
      return baseClasses;
  }
};
