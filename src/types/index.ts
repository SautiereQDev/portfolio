import { LucideIcon } from "lucide-react";
import { RefObject, ReactNode } from "react";

// Base component types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Navigation types
export interface NavigationItem {
  name: string;
  path: string;
  icon: LucideIcon;
  description: string;
}

export interface SectionLink {
  id: string;
  title: string;
  icon?: LucideIcon;
}

// Animation types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  stagger?: number;
}

export interface ScrollPosition {
  x: number;
  y: number;
  isAtTop: boolean;
  isAtBottom: boolean;
  scrollProgress: number;
}

// Component state types
export interface MenuState {
  isOpen: boolean;
  isExpanded: boolean;
  hasInteracted: boolean;
}

export interface ScrollState {
  progress: number;
  showBackToTop: boolean;
  isAtTop: boolean;
}

// Hero section types
export interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  imageUrl?: string;
  illustrationName?: "about" | "home" | "projects" | "services";
}

// Error boundary types
export interface ErrorInfo {
  componentStack: string;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Enhanced page component types for modern architecture
 */

// Animation configuration types
export interface AnimationConfig {
  heroRef?: RefObject<HTMLElement>;
  enableHeroAnimations?: boolean;
  enableCardAnimations?: boolean;
  enableProcessAnimations?: boolean;
  customSelectors?: {
    selector: string;
    animation: gsap.TweenVars;
    scrollTriggerConfig?: ScrollTrigger.StaticVars;
  }[];
}

// Page section types
export interface PageSection {
  id: string;
  title: string;
  className?: string;
  animationDelay?: number;
}

// Hero section props
export interface PageHeroProps {
  title: string;
  subtitle: string;
  description: string;
  bannerSrc: string;
  bannerAlt: string;
  className?: string;
  children?: ReactNode;
}

// Section header props
export interface SectionHeaderProps {
  badge: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
    className?: string;
  };
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

// CTA section props
export interface CTASectionProps {
  title: string;
  description: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
    icon?: ReactNode;
  };
  className?: string;
}

// Service offering types
export interface ServiceOffering {
  id: string;
  title: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  icon: LucideIcon;
  gradient: string;
}

// Process step types
export interface ProcessStep {
  icon: LucideIcon;
  title: string;
  duration: string;
  description: string;
}

// Education item types (enhanced)
export interface EducationItem {
  title: string;
  school: string;
  date: string;
  mention?: string;
  description?: string;
  logo?: string;
}

// Skills category types
export interface SkillCategory {
  name: string;
  skills: string[];
  icon?: LucideIcon;
  color?: string;
}

// Project types
export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  visit_link?: string;
  github_link: string;
  key_points: string[];
  technos: string[];
}

export interface ProjectCategory {
  id: string;
  name: string;
  icon: LucideIcon;
  count: number;
  description: string;
}

export interface ProjectStats {
  value: number;
  label: string;
  color: string;
}

// Enhanced animation presets
export type AnimationPreset =
  | "fadeIn"
  | "slideUp"
  | "slideInLeft"
  | "slideInRight"
  | "scale"
  | "hero";

export type ScrollTriggerConfig = "default" | "viewport" | "immediate";

// Layout types
export type ContainerSize = "sm" | "md" | "lg" | "xl";
export type GridColumns = 1 | 2 | 3 | 4;

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
}

// Page metadata types
export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

// Enhanced component props with animation support
export interface AnimatedComponentProps {
  animation?: AnimationPreset;
  delay?: number;
  duration?: number;
  stagger?: number;
  scrollTrigger?: ScrollTriggerConfig;
}
