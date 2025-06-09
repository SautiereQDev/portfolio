import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./button";
import { cn } from "../../lib/utils";

interface SectionLink {
  id: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface SectionNavigationProps {
  sections: SectionLink[];
  className?: string;
  position?: "left" | "right";
}

export const SectionNavigation = ({
  sections,
  className,
  position = "right",
}: SectionNavigationProps) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Animation d'apparition subtile après 2 secondes
    const introTimer = setTimeout(() => {
      if (!hasInteracted && isVisible) {
        // Légère animation d'attention
        const element = document.querySelector("[data-section-nav]");
        if (element) {
          element.animate(
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
        }
      }
    }, 2000);

    return () => clearTimeout(introTimer);
  }, [isVisible, hasInteracted]);
  useEffect(() => {
    const handleScroll = () => {
      // Afficher le composant après avoir scrollé un peu
      setIsVisible(window.scrollY > 150);

      // Déterminer la section active
      const sectionElements = sections
        .map((section) => document.getElementById(section.id))
        .filter(Boolean);

      const currentSection = sectionElements.find((element) => {
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100; // Account for fixed navbar
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
    }
    setIsExpanded(false);
    setHasInteracted(true);
  };

  if (!isVisible) return null;

  const activeIndex = sections.findIndex((s) => s.id === activeSection);
  const progressPercentage =
    activeIndex >= 0 ? ((activeIndex + 1) / sections.length) * 100 : 0;
  return (
    <div
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
          {" "}
          {/* Compact Toggle Button */}
          {!isExpanded && (
            <div className="group relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsExpanded(true);
                  setHasInteracted(true);
                }}
                className="relative flex h-14 w-14 items-center justify-center overflow-hidden p-0 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <Menu className="relative z-10 h-5 w-5 text-gray-600 transition-colors duration-300 group-hover:text-blue-600" />

                {/* Active section indicator - repositionné */}
                <div className="absolute -top-1 -right-1 z-20 flex h-4 w-4 animate-pulse items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
                  <div className="h-2 w-2 rounded-full bg-white" />
                </div>
              </Button>

              {/* Tooltip repositionné pour éviter le chevauchement */}
              <div className="pointer-events-none absolute top-full left-1/2 z-30 mt-2 -translate-x-1/2 transform opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="rounded bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white">
                  Navigation
                </div>
                <div className="mx-auto h-0 w-0 rotate-180 transform border-r-4 border-b-4 border-l-4 border-transparent border-b-gray-900"></div>
              </div>
            </div>
          )}
          {/* Expanded Navigation */}
          {isExpanded && (
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
                  onClick={() => setIsExpanded(false)}
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
                      onClick={() => scrollToSection(section.id)}
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
                  <span className="text-xs font-medium text-gray-500">
                    Progression
                  </span>
                  <span className="text-xs font-semibold text-gray-700">
                    {activeIndex + 1}/{sections.length}
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
          )}
        </div>{" "}
        {/* Floating progress indicator (visible when collapsed) - repositionné */}
        {!isExpanded && (
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
                {activeIndex + 1}/{sections.length}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionNavigation;
