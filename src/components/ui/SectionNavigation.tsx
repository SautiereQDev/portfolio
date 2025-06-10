import { useState, useEffect, useCallback, memo, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./button";
import { cn } from "../../lib/utils";
import { useFirstVisit } from "../../hooks/useFirstVisit";
import { useSectionNavigation } from "../../hooks/useSectionNavigation";
import type { SectionLink, BaseComponentProps } from "../../types";

interface SectionNavigationProps extends BaseComponentProps {
  sections: SectionLink[];
  position?: "left" | "right";
}

/**
 * Section Navigation Component
 * Features section-based navigation with first-visit highlighting
 * Shows green badge and animations for new users
 */
export const SectionNavigation = memo<SectionNavigationProps>(
  ({ sections, className, position = "right" }) => {
    // State
    const [isExpanded, setIsExpanded] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    // Refs
    const navRef = useRef<HTMLDivElement>(null);

    // Custom hooks
    const { showIntro, dismissIntro } = useFirstVisit({
      storageKey: "sectionNavFirstVisit",
      autoDismissAfter: 20000,
    });

    const {
      activeSection,
      isVisible,
      scrollToSection: navigateToSection,
      progressPercentage,
    } = useSectionNavigation(sections);

    // Handlers
    const handleToggleExpanded = useCallback(() => {
      setIsExpanded((prev) => !prev);
      setHasInteracted(true);
      if (showIntro) {
        dismissIntro();
      }
    }, [showIntro, dismissIntro]);

    const handleCloseExpanded = useCallback(() => {
      setIsExpanded(false);
    }, []);

    const handleSectionClick = useCallback(
      (sectionId: string) => {
        navigateToSection(sectionId);
        setIsExpanded(false);
        setHasInteracted(true);
      },
      [navigateToSection]
    );

    // First visit attention animation
    useEffect(() => {
      if (!hasInteracted && isVisible && showIntro && navRef.current) {
        const timer = setTimeout(
          () => {
            navRef.current?.animate(
              [
                { transform: "scale(1) translateY(-50%)", opacity: "1" },
                { transform: "scale(1.1) translateY(-50%)", opacity: "1" },
                { transform: "scale(1) translateY(-50%)", opacity: "1" },
                { transform: "scale(1.05) translateY(-50%)", opacity: "1" },
                { transform: "scale(1) translateY(-50%)", opacity: "1" },
              ],
              {
                duration: 1200,
                easing: "ease-in-out",
              }
            );
          },
          showIntro ? 3000 : 2000
        );

        return () => clearTimeout(timer);
      }
    }, [isVisible, hasInteracted, showIntro]);

    if (!isVisible) return null;

    return (
      <div
        ref={navRef}
        className={cn(
          "fixed top-1/2 z-30 -translate-y-1/2 transform transition-all duration-500 ease-out",
          position === "left" ? "left-4 lg:left-6" : "right-3 lg:right-4",
          className
        )}
        data-section-nav
      >
        <div className="relative">
          {/* Main Navigation Container */}
          <div
            className={cn(
              "overflow-hidden rounded-2xl border border-gray-200/60 bg-white/95 shadow-xl backdrop-blur-xl transition-all duration-300 ease-out",
              isExpanded
                ? "shadow-2xl shadow-blue-500/10"
                : "shadow-lg hover:shadow-xl",
              !isExpanded && "animate-pulse-subtle"
            )}
          >
            {/* Compact Toggle Button */}
            {!isExpanded && (
              <CompactToggleButton
                showIntro={showIntro}
                onClick={handleToggleExpanded}
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

          {/* First Visit Help Messages */}
          {showIntro && !hasInteracted && (
            <FirstVisitMessages position={position} />
          )}
        </div>
      </div>
    );
  }
);

/**
 * Compact Toggle Button Component
 */
interface CompactToggleButtonProps {
  showIntro: boolean;
  onClick: () => void;
}

const CompactToggleButton = memo<CompactToggleButtonProps>(
  ({ showIntro, onClick }) => (
    <div className="group relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={onClick}
        className={cn(
          "relative flex h-14 w-14 items-center justify-center overflow-hidden p-0 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50",
          showIntro && "animate-pulse-intro"
        )}
      >
        {/* First visit background animation */}
        {showIntro && (
          <div className="animate-gradient-wave absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 bg-[length:200%_200%]" />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <Menu className="relative z-10 h-5 w-5 text-gray-600 transition-colors duration-300 group-hover:text-blue-600" />

        {/* Green badge for first visit */}
        {showIntro && (
          <div className="absolute -top-1 -right-1 z-20">
            <div className="relative">
              <div className="animate-bounce-gentle h-3 w-3 rounded-full bg-green-500 shadow-lg" />
              <div className="absolute inset-0 h-3 w-3 animate-ping rounded-full bg-green-400" />
            </div>
          </div>
        )}
      </Button>

      {/* Tooltip */}
      <div
        className={cn(
          "pointer-events-none absolute top-full left-1/2 z-30 mt-2 -translate-x-1/2 transform transition-opacity duration-300",
          showIntro ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      >
        <div
          className={cn(
            "rounded px-2 py-1 text-xs whitespace-nowrap text-white",
            showIntro ? "animate-pulse bg-green-600 shadow-lg" : "bg-gray-900"
          )}
        >
          {showIntro ? "✨ Cliquez pour naviguer !" : "Navigation"}
        </div>
        <div
          className={cn(
            "mx-auto h-0 w-0 rotate-180 transform border-r-4 border-b-4 border-l-4 border-transparent",
            showIntro ? "border-b-green-600" : "border-b-gray-900"
          )}
        />
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

      {/* Progress Bar */}
      <div className="bg-gray-50/50 px-4 py-2">
        <div className="mb-1 flex items-center justify-between text-xs text-gray-500">
          <span>Progression</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Section Links */}
      <div className="max-h-80 space-y-1 overflow-y-auto p-2">
        {" "}
        {sections.map((section) => {
          const isActive = activeSection === section.id;
          const IconComponent = section.icon;

          return (
            <button
              key={section.id}
              onClick={() => onSectionClick(section.id)}
              className={cn(
                "group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all duration-200",
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
              )}
            >
              <div className="flex items-center space-x-3">
                {IconComponent && (
                  <IconComponent
                    className={cn(
                      "h-4 w-4 transition-colors duration-200",
                      isActive
                        ? "text-white"
                        : "text-gray-500 group-hover:text-blue-600"
                    )}
                  />
                )}
                <span className="font-medium">{section.title}</span>
              </div>

              {isActive && (
                <div className="h-2 w-2 animate-pulse rounded-full bg-white/80" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  )
);

/**
 * First Visit Help Messages Component
 */
interface FirstVisitMessagesProps {
  position: "left" | "right";
}

const FirstVisitMessages = memo<FirstVisitMessagesProps>(({ position }) => (
  <>
    {/* Desktop Message */}
    <div className="hidden sm:block">
      <div
        className={cn(
          "pointer-events-none absolute top-1/2 z-20 -translate-y-1/2",
          position === "left" ? "left-full ml-4" : "right-full mr-4"
        )}
      >
        <div className="animate-fade-in-delayed max-w-xs rounded-lg bg-green-600 px-4 py-3 text-white shadow-lg">
          <div className="mb-1 text-sm font-medium">👋 Première visite ?</div>
          <div className="text-xs opacity-90">
            Utilisez ce menu pour naviguer rapidement entre les sections !
          </div>
          <div
            className={cn(
              "absolute top-1/2 h-0 w-0 -translate-y-1/2",
              position === "left"
                ? "right-full border-t-8 border-r-8 border-b-8 border-transparent border-r-green-600"
                : "left-full border-t-8 border-b-8 border-l-8 border-transparent border-l-green-600"
            )}
          />
        </div>
      </div>
    </div>

    {/* Mobile Message */}
    <div className="sm:hidden">
      <div className="pointer-events-none absolute -top-20 left-1/2 z-20 -translate-x-1/2">
        <div className="animate-fade-in-delayed max-w-48 rounded-lg bg-green-600 px-3 py-2 text-center text-white shadow-lg">
          <div className="text-xs font-medium">🎯 Menu de navigation</div>
          <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-t-4 border-r-4 border-l-4 border-transparent border-t-green-600" />
        </div>
      </div>
    </div>
  </>
));

CompactToggleButton.displayName = "CompactToggleButton";
ExpandedNavigation.displayName = "ExpandedNavigation";
FirstVisitMessages.displayName = "FirstVisitMessages";
SectionNavigation.displayName = "SectionNavigation";

// Export default for backward compatibility
export default SectionNavigation;
