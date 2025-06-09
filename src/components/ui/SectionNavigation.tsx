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
        const element = document.querySelector('[data-section-nav]');
        if (element) {
          element.animate([
            { transform: 'scale(1) translateY(-50%)', opacity: '1' },
            { transform: 'scale(1.05) translateY(-50%)', opacity: '1' },
            { transform: 'scale(1) translateY(-50%)', opacity: '1' }
          ], {
            duration: 800,
            easing: 'ease-in-out'
          });
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
  const progressPercentage = activeIndex >= 0 ? ((activeIndex + 1) / sections.length) * 100 : 0;
  return (
    <div
      className={cn(
        "fixed top-1/2 transform -translate-y-1/2 z-30 transition-all duration-500 ease-out",
        position === "left" ? "left-4 lg:left-6" : "right-3 lg:right-4",
        className,
      )}
      data-section-nav
    >
      <div className="relative">
        {/* Main Navigation Container */}
        <div
          className={cn(
            "bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/60 overflow-hidden transition-all duration-300 ease-out",
            isExpanded ? "shadow-2xl shadow-blue-500/10" : "shadow-lg hover:shadow-xl",
            !isExpanded && "animate-pulse-subtle"
          )}
        >          {/* Compact Toggle Button */}
          {!isExpanded && (
            <div className="group relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsExpanded(true);
                  setHasInteracted(true);
                }}
                className="w-14 h-14 p-0 flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <Menu className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300 relative z-10" />
              </Button>

              {/* Tooltip repositionné pour éviter le chevauchement */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
                <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Navigation
                </div>
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-900 mx-auto transform rotate-180"></div>
              </div>
            </div>
          )}

          {/* Expanded Navigation */}
          {isExpanded && (
            <div className="w-64">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50/50 to-purple-50/50">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
                  <span className="text-sm font-semibold text-gray-700">Navigation</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                  className="w-8 h-8 p-0 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                >
                  <X className="w-4 h-4" />
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
                        "group w-full p-3 text-left flex items-center space-x-3 transition-all duration-200 relative overflow-hidden",
                        isActive
                          ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                      )}
                    >
                      {/* Active indicator line */}
                      {isActive && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-purple-600" />
                      )}

                      {/* Icon */}
                      {Icon && (
                        <div className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200",
                          isActive
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                            : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"
                        )}>
                          <Icon className="w-4 h-4" />
                        </div>
                      )}

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <span className={cn(
                          "text-sm font-medium truncate block",
                          isActive ? "text-blue-700" : "text-gray-700"
                        )}>
                          {section.title}
                        </span>
                        <div className={cn(
                          "text-xs opacity-75 mt-0.5",
                          isActive ? "text-blue-600" : "text-gray-500"
                        )}>
                          Section {index + 1}
                        </div>
                      </div>

                      {/* Status dot */}
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full transition-all duration-200",
                          isActive
                            ? "bg-gradient-to-r from-blue-600 to-purple-600 shadow-sm"
                            : "bg-gray-300 group-hover:bg-gray-400",
                        )}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Progress Footer */}
              <div className="p-4 border-t border-gray-200/50 bg-gray-50/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-500">Progression</span>
                  <span className="text-xs font-semibold text-gray-700">
                    {activeIndex + 1}/{sections.length}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>        {/* Floating progress indicator (visible when collapsed) - repositionné */}
        {!isExpanded && (
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-10 h-1.5 bg-gray-200 rounded-full overflow-hidden shadow-sm">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            {/* Petit indicateur de progression */}
            <div className="text-center mt-1">
              <span className="text-xs text-gray-500 bg-white px-1 rounded shadow-sm">
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
