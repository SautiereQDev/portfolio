/**
 * Animation Configuration Constants
 * Centralizes animation settings for consistency across the application
 */

// Duration constants
export const ANIMATION_DURATIONS = {
  fast: 0.3,
  normal: 0.6,
  slow: 1.0,
  hero: 1.2,
} as const;

// Easing constants
export const ANIMATION_EASINGS = {
  power3Out: "power3.out",
  power2Out: "power2.out",
  elastic: "elastic.out(1, 0.3)",
  back: "back.out(1.7)",
} as const;

// Stagger delays
export const STAGGER_DELAYS = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.2,
} as const;

// Common animation presets
export const ANIMATION_PRESETS = {
  fadeIn: {
    opacity: 0,
    duration: ANIMATION_DURATIONS.normal,
    ease: ANIMATION_EASINGS.power3Out,
  },
  slideUp: {
    y: 50,
    opacity: 0,
    duration: ANIMATION_DURATIONS.normal,
    ease: ANIMATION_EASINGS.power3Out,
  },
  slideInLeft: {
    x: -30,
    opacity: 0,
    duration: ANIMATION_DURATIONS.normal,
    ease: ANIMATION_EASINGS.power3Out,
  },
  slideInRight: {
    x: 30,
    opacity: 0,
    duration: ANIMATION_DURATIONS.normal,
    ease: ANIMATION_EASINGS.power3Out,
  },
  scale: {
    scale: 0.8,
    opacity: 0,
    duration: ANIMATION_DURATIONS.normal,
    ease: ANIMATION_EASINGS.back,
  },
  hero: {
    y: 50,
    opacity: 0,
    duration: ANIMATION_DURATIONS.hero,
    ease: ANIMATION_EASINGS.power3Out,
  },
} as const;

// ScrollTrigger configurations
export const SCROLL_TRIGGER_CONFIGS = {
  default: {
    start: "top 80%",
    once: true,
  },
  viewport: {
    start: "top 90%",
    end: "bottom 10%",
    once: true,
  },
  immediate: {
    start: "top 95%",
    once: true,
  },
} as const;

export type AnimationPreset = keyof typeof ANIMATION_PRESETS;
export type ScrollTriggerConfig = keyof typeof SCROLL_TRIGGER_CONFIGS;
