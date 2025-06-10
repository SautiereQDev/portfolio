import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "portfolio_first_visit";
const AUTO_DISMISS_DELAY = 20000; // 20 seconds

interface UseFirstVisitOptions {
  autoDismissDelay?: number;
  autoDismissAfter?: number; // Alias for autoDismissDelay
  storageKey?: string;
}

interface FirstVisitState {
  isFirstVisit: boolean;
  showIntro: boolean;
  dismissIntro: () => void;
}

export const useFirstVisit = (
  options: UseFirstVisitOptions = {}
): FirstVisitState => {
  const {
    autoDismissDelay = AUTO_DISMISS_DELAY,
    autoDismissAfter = autoDismissDelay, // Use autoDismissAfter if provided, otherwise autoDismissDelay
    storageKey = STORAGE_KEY,
  } = options;

  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [showIntro, setShowIntro] = useState(false);

  const dismissIntro = useCallback(() => {
    setShowIntro(false);
  }, []);

  useEffect(() => {
    const checkFirstVisit = () => {
      try {
        const hasVisited = localStorage.getItem(storageKey);

        if (!hasVisited) {
          setIsFirstVisit(true);
          setShowIntro(true);
          localStorage.setItem(storageKey, "true");

          // Auto-dismiss timer
          const timer = setTimeout(dismissIntro, autoDismissAfter);
          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.warn("Failed to access localStorage:", error);
      }
    };

    return checkFirstVisit();
  }, [storageKey, autoDismissAfter, dismissIntro]);

  return {
    isFirstVisit,
    showIntro,
    dismissIntro,
  };
};
