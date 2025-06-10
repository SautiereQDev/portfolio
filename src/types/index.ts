import { LucideIcon } from "lucide-react";

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
  imageUrl: string;
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
