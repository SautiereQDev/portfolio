import { useEffect } from "react";

interface UseScrollAnimationsOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Hook simple qui utilise Intersection Observer pour déclencher les animations CSS
 * Plus fiable que GSAP pour les animations de base
 */
export const useScrollAnimations = ({
  threshold = 0.1,
  rootMargin = "0px 0px -50px 0px",
  triggerOnce = true,
}: UseScrollAnimationsOptions = {}) => {
  useEffect(() => {
    // Set pour suivre les éléments déjà animés - empêche la réanimation
    const animatedElements = new WeakSet();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Si l'élément a déjà été animé et triggerOnce est true, ne rien faire
          if (triggerOnce && animatedElements.has(entry.target)) {
            return;
          }

          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // Marquer comme animé pour éviter la réanimation
            if (triggerOnce) {
              animatedElements.add(entry.target);
              observer.unobserve(entry.target);
            }
          } else if (!triggerOnce) {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Observer tous les éléments avec les classes d'animation
    const elementsToObserve = document.querySelectorAll(
      ".animate-on-scroll, .project-card, .stat-card, .filter-card"
    );

    elementsToObserve.forEach((element) => {
      observer.observe(element);
    });

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return {
    forceShow: () => {
      const allElements = document.querySelectorAll(
        ".animate-on-scroll, .project-card, .stat-card, .filter-card"
      );

      allElements.forEach((element) => {
        element.classList.add("visible", "force-visible");
      });
    },
  };
};

export default useScrollAnimations;
