import { useState, useEffect, useCallback } from "react";
import type { SectionLink } from "../types";

interface UseSectionNavigationReturn {
  activeSection: string;
  isVisible: boolean;
  scrollToSection: (sectionId: string) => void;
  progressPercentage: number;
}

/**
 * Hook for managing section-based navigation
 * Tracks active section, visibility, and provides scroll functionality
 */
export const useSectionNavigation = (
  sections: SectionLink[]
): UseSectionNavigationReturn => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  // Calculate progress percentage based on active section
  const progressPercentage = activeSection
    ? ((sections.findIndex((s) => s.id === activeSection) + 1) /
        sections.length) *
      100
    : 0;

  // Scroll to section function
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 100; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  }, []);

  // Track scroll position and active section
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;

          // Show navigation after scrolling past threshold
          setIsVisible(scrollY > 150);

          // Find active section
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

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return {
    activeSection,
    isVisible,
    scrollToSection,
    progressPercentage,
  };
};
