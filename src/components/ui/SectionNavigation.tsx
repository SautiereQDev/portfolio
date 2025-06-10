import { useState, useEffect, useCallback, memo, useRef } from "react";
import { Menu, X, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "./button";
import { cn } from "../../lib/utils";
import { useSectionNavigation } from "../../hooks/useSectionNavigation";
import { useFirstVisit } from "../../hooks/useFirstVisit";
import type { SectionLink, BaseComponentProps } from "../../types";

interface SectionNavigationProps extends BaseComponentProps {
  sections: SectionLink[];
  position?: "left" | "right";
}

/**
 * Section Navigation Component
 * Features section-based navigation with modern architecture
 * Uses custom hooks and component composition
 */
export const SectionNavigation = memo<SectionNavigationProps>(
  ({ sections, className, position = "right" }) => {
    // State
    const [isExpanded, setIsExpanded] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    // Refs
    const navRef = useRef<HTMLDivElement>(null);

    // Custom hooks
    const {
      activeSection,
      isVisible,
      scrollToSection: navigateToSection,
      progressPercentage,
    } = useSectionNavigation(sections);

    const { showIntro, dismissIntro } = useFirstVisit({
      autoDismissDelay: 15000, // 15 secondes pour laisser le temps de lire
      storageKey: "portfolio_section_nav_intro",
    });

    // Handlers
    const handleToggleExpanded = useCallback(() => {
      setIsExpanded((prev) => !prev);
      setHasInteracted(true);
      // Fermer l'intro si elle est visible
      if (showIntro) {
        dismissIntro();
      }
    }, [showIntro, dismissIntro]);

    const handleCloseExpanded = useCallback(() => {
      setIsExpanded(false);
    }, []);

    const handleDismissIntro = useCallback(() => {
      dismissIntro();
      setHasInteracted(true);
    }, [dismissIntro]);

    const handleSectionClick = useCallback(
      (sectionId: string) => {
        navigateToSection(sectionId);
        setIsExpanded(false);
        setHasInteracted(true);
        // Fermer l'intro lors de la navigation
        if (showIntro) {
          dismissIntro();
        }
      },
      [navigateToSection, showIntro, dismissIntro]
    );

    // Attention animation for first-time users
    useEffect(() => {
      if (!hasInteracted && isVisible && navRef.current) {
        const timer = setTimeout(() => {
          navRef.current?.animate(
            [
              { transform: "scale(1) translateY(-50%)", opacity: "1" },
              { transform: "scale(1.05) translateY(-50%)", opacity: "1" },
              { transform: "scale(1) translateY(-50%)", opacity: "1" },
            ],
            {
              duration: 800,
              easing: "ease-in-out",
            }
          );
        }, 2000);

        return () => clearTimeout(timer);
      }
    }, [isVisible, hasInteracted]);

    if (!isVisible) return null;

    const activeIndex = sections.findIndex((s) => s.id === activeSection);

    return (
      <div
        ref={navRef}
        className={cn(
          "font-body fixed top-1/2 z-30 -translate-y-1/2 transform transition-all duration-500 ease-out",
          position === "left" ? "left-4 lg:left-6" : "right-3 lg:right-4",
          className
        )}
        data-section-nav
      >
        <div className="relative">
          {/* First Visit Intro */}
          {showIntro && (
            <FirstVisitIntro
              onDismiss={handleDismissIntro}
              position={position}
            />
          )}

          {/* Main Navigation Container */}
          <div
            className={cn(
              "overflow-hidden rounded-2xl border border-gray-200/60 bg-white/95 shadow-xl backdrop-blur-xl transition-all duration-300 ease-out",
              isExpanded
                ? "shadow-2xl shadow-blue-500/10"
                : "shadow-lg hover:shadow-xl",
              !isExpanded && "animate-pulse-subtle",
              // Ajouter une pulsation plus visible si l'intro est affichée
              showIntro &&
                !isExpanded &&
                "ring-2 ring-blue-500/30 ring-offset-2"
            )}
          >
            {/* Compact Toggle Button */}
            {!isExpanded && (
              <CompactToggleButton
                onClick={handleToggleExpanded}
                showBadge={showIntro}
              />
            )}

            {/* Expanded Navigation */}
            {isExpanded && (
              <ExpandedNavigation
                sections={sections}
                activeSection={activeSection}
                progressPercentage={progressPercentage}
                onClose={handleCloseExpanded}
                onSectionClick={handleSectionClick}
              />
            )}
          </div>

          {/* Floating progress indicator (visible when collapsed) */}
          {!isExpanded && (
            <ProgressIndicator
              progressPercentage={progressPercentage}
              activeIndex={activeIndex}
              totalSections={sections.length}
            />
          )}
        </div>
      </div>
    );
  }
);

/**
 * First Visit Intro Component
 * Affiche un encadré informatif pour les nouveaux utilisateurs
 */
interface FirstVisitIntroProps {
  onDismiss: () => void;
  position: "left" | "right";
}

const FirstVisitIntro = memo<FirstVisitIntroProps>(
  ({ onDismiss, position }) => (
    <div
      className={cn(
        "animate-in fade-in slide-in-from-right-4 absolute z-40 w-72 duration-500",
        position === "left" ? "top-0 left-20" : "top-0 right-20"
      )}
    >
      <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 p-4 shadow-xl backdrop-blur-sm">
        {/* Header avec icône */}
        <div className="mb-3 flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <Lightbulb className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                Bienvenue ! 👋
              </h3>
              <p className="text-xs text-gray-600">Première visite</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>

        {/* Contenu */}
        <div className="space-y-3">
          <p className="text-sm text-gray-700">
            Utilisez cette navigation pour explorer les différentes sections de
            la page.
          </p>

          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span>Cliquez sur l&apos;icône menu pour naviguer</span>
            </div>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <div className="h-2 w-2 rounded-full bg-purple-500" />
              <span>Suivez votre progression en temps réel</span>
            </div>
          </div>

          <Button
            onClick={onDismiss}
            size="sm"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
          >
            Compris !
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>

        {/* Flèche pointant vers la navigation */}
        <div
          className={cn(
            "absolute top-4 h-0 w-0",
            position === "left"
              ? "-right-2 border-t-8 border-r-0 border-b-8 border-l-8 border-transparent border-l-blue-200"
              : "-left-2 border-t-8 border-r-8 border-b-8 border-l-0 border-transparent border-r-blue-200"
          )}
        />
      </div>
    </div>
  )
);

/**
 * Compact Toggle Button Component
 */
interface CompactToggleButtonProps {
  onClick: () => void;
  showBadge?: boolean;
}

const CompactToggleButton = memo<CompactToggleButtonProps>(
  ({ onClick, showBadge = false }) => (
    <div className="group relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={onClick}
        className={cn(
          "relative flex h-14 w-14 items-center justify-center overflow-hidden p-0 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50",
          showBadge && "ring-2 ring-blue-500/50 ring-offset-1"
        )}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <Menu className="relative z-10 h-5 w-5 text-gray-600 transition-colors duration-300 group-hover:text-blue-600" />

        {/* Badge pour indiquer la première visite */}
        {showBadge && (
          <div className="absolute -top-1 -right-1 h-3 w-3">
            <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
            <div className="absolute inset-0 animate-ping rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
          </div>
        )}
      </Button>

      {/* Tooltip repositionné pour éviter le chevauchement */}
      <div className="pointer-events-none absolute top-full left-1/2 z-30 mt-2 -translate-x-1/2 transform opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="rounded bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white">
          Navigation
        </div>
        <div className="mx-auto h-0 w-0 rotate-180 transform border-r-4 border-b-4 border-l-4 border-transparent border-b-gray-900"></div>
      </div>
    </div>
  )
);

/**
 * Expanded Navigation Component
 */
interface ExpandedNavigationProps {
  sections: SectionLink[];
  activeSection: string;
  progressPercentage: number;
  onClose: () => void;
  onSectionClick: (sectionId: string) => void;
}

const ExpandedNavigation = memo<ExpandedNavigationProps>(
  ({
    sections,
    activeSection,
    progressPercentage,
    onClose,
    onSectionClick,
  }) => (
    <div className="w-64">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50 p-4">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
          <span className="text-sm font-semibold text-gray-700">
            Navigation
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Section Links */}
      <div className="py-2">
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;
          const Icon = section.icon;

          return (
            <button
              key={section.id}
              onClick={() => onSectionClick(section.id)}
              className={cn(
                "group relative flex w-full items-center space-x-3 overflow-hidden p-3 text-left transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              {/* Active indicator line */}
              {isActive && (
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-blue-600 to-purple-600" />
              )}

              {/* Icon */}
              {Icon && (
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200",
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </div>
              )}

              {/* Text */}
              <div className="min-w-0 flex-1">
                <span
                  className={cn(
                    "block truncate text-sm font-medium",
                    isActive ? "text-blue-700" : "text-gray-700"
                  )}
                >
                  {section.title}
                </span>
                <div
                  className={cn(
                    "mt-0.5 text-xs opacity-75",
                    isActive ? "text-blue-600" : "text-gray-500"
                  )}
                >
                  Section {index + 1}
                </div>
              </div>

              {/* Status dot */}
              <div
                className={cn(
                  "h-2 w-2 rounded-full transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-sm"
                    : "bg-gray-300 group-hover:bg-gray-400"
                )}
              />
            </button>
          );
        })}
      </div>

      {/* Progress Footer */}
      <div className="border-t border-gray-200/50 bg-gray-50/50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-500">Progression</span>
          <span className="text-xs font-semibold text-gray-700">
            {sections.findIndex((s) => s.id === activeSection) + 1}/
            {sections.length}
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  )
);

/**
 * Progress Indicator Component
 */
interface ProgressIndicatorProps {
  progressPercentage: number;
  activeIndex: number;
  totalSections: number;
}

const ProgressIndicator = memo<ProgressIndicatorProps>(
  ({ progressPercentage, activeIndex, totalSections }) => (
    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 transform">
      <div className="h-1.5 w-10 overflow-hidden rounded-full bg-gray-200 shadow-sm">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      {/* Petit indicateur de progression */}
      <div className="mt-1 text-center">
        <span className="rounded bg-white px-1 text-xs text-gray-500 shadow-sm">
          {activeIndex + 1}/{totalSections}
        </span>
      </div>
    </div>
  )
);

// Display names for dev tools
FirstVisitIntro.displayName = "FirstVisitIntro";
CompactToggleButton.displayName = "CompactToggleButton";
ExpandedNavigation.displayName = "ExpandedNavigation";
ProgressIndicator.displayName = "ProgressIndicator";
SectionNavigation.displayName = "SectionNavigation";

export default SectionNavigation;
