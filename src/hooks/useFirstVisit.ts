import { useState, useEffect } from "react";

const FIRST_VISIT_KEY = "portfolio_first_visit";

export const useFirstVisit = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem(FIRST_VISIT_KEY);

    if (!hasVisited) {
      setIsFirstVisit(true);
      setShowIntro(true);
      localStorage.setItem(FIRST_VISIT_KEY, "true");

      // Auto-dismiss après 15 secondes
      const autoDismissTimer = setTimeout(() => {
        setShowIntro(false);
      }, 15000);

      return () => clearTimeout(autoDismissTimer);
    }
  }, []);

  const dismissIntro = () => {
    setShowIntro(false);
  };

  return {
    isFirstVisit,
    showIntro,
    dismissIntro,
  };
};
