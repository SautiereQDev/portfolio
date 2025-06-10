import { useCallback } from "react";

/**
 * Hook for scroll-based navigation functions
 * Used for components that need to navigate to sections without full navigation context
 */
export const useScrollNavigation = () => {
  const navigateToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const scrollToBottom = useCallback(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, []);

  return {
    navigateToSection,
    scrollToTop,
    scrollToBottom,
  };
};
