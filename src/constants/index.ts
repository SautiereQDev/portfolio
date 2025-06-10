// Animation constants
export const ANIMATION_DURATIONS = {
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 1.2,
} as const;

export const ANIMATION_EASES = {
  POWER2_OUT: "power2.out",
  POWER3_OUT: "power3.out",
  BACK_OUT: "back.out(1.4)",
  BOUNCE: "bounce.out",
} as const;

// Animation delays
export const ANIMATION_DELAYS = {
  INSTANT: 0,
  SHORT: 0.2,
  MEDIUM: 0.5,
  LONG: 1.5,
  CHEVRON: 2,
} as const;

// Scroll thresholds
export const SCROLL_THRESHOLDS = {
  TOP: 50,
  HERO_TOP: 50,
  BACK_TO_TOP: 500,
  SECTION_TRIGGER: 150,
} as const;

// Z-index layers
export const Z_INDEX = {
  BACKGROUND: 0,
  CONTENT: 10,
  NAVBAR: 50,
  DROPDOWN: 40,
  MODAL: 60,
  TOOLTIP: 70,
} as const;

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const;

// Storage keys
export const STORAGE_KEYS = {
  FIRST_VISIT: "portfolio_first_visit",
  THEME: "portfolio_theme",
  PREFERENCES: "portfolio_user_preferences",
} as const;
