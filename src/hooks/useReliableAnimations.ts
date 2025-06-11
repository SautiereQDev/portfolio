import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface UseReliableAnimationsOptions {
  enableHero?: boolean;
  enableCards?: boolean;
  enableStats?: boolean;
  fallbackTimeout?: number;
}

/**
 * Hook d'animations fiable qui s'assure que les éléments restent visibles
 * même en cas de problème avec GSAP
 */
export const useReliableAnimations = ({
  enableHero = true,
  enableCards = true,
  enableStats = true,
  fallbackTimeout = 3000,
}: UseReliableAnimationsOptions = {}) => {
  const animationsRef = useRef<gsap.core.Timeline[]>([]);
  const fallbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const animations: gsap.core.Timeline[] = [];

    // Hero animations
    if (enableHero) {
      const heroTitle = document.querySelector(".hero-title");
      const heroSubtitle = document.querySelector(".hero-subtitle");
      const heroDescription = document.querySelector(".hero-description");

      if (heroTitle || heroSubtitle || heroDescription) {
        const heroTimeline = gsap.timeline({ paused: false });

        // Animation immédiate pour le hero (pas de scroll trigger)
        if (heroTitle) {
          gsap.set(heroTitle, { opacity: 0, y: 30 });
          heroTimeline.to(heroTitle, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          });
        }

        if (heroSubtitle) {
          gsap.set(heroSubtitle, { opacity: 0, y: 20 });
          heroTimeline.to(
            heroSubtitle,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
            },
            "-=0.4"
          );
        }

        if (heroDescription) {
          gsap.set(heroDescription, { opacity: 0, y: 15 });
          heroTimeline.to(
            heroDescription,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power2.out",
            },
            "-=0.3"
          );
        }

        animations.push(heroTimeline);
      }
    }

    // Card animations avec ScrollTrigger
    if (enableCards) {
      const cards = document.querySelectorAll(
        ".project-card, .service-card, .stat-card"
      );

      cards.forEach((card, index) => {
        if (card.hasAttribute("data-animated")) return;

        const cardTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true,
            onEnter: () => {
              card.setAttribute("data-animated", "true");
            },
          },
        });

        gsap.set(card, { opacity: 0, y: 30, scale: 0.98 });
        cardTimeline.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
        });

        animations.push(cardTimeline);
      });
    }

    // Stats counter animations
    if (enableStats) {
      const statsCounters = document.querySelectorAll("[data-count]");

      if (statsCounters.length > 0) {
        const statsTimeline = gsap.timeline({
          scrollTrigger: {
            trigger:
              statsCounters[0].closest(".stats-section") || statsCounters[0],
            start: "top 80%",
            once: true,
          },
        });

        statsCounters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-count") || "0");
          const obj = { value: 0 };

          statsTimeline.to(
            obj,
            {
              value: target,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                counter.textContent = Math.floor(obj.value).toString();
              },
            },
            0
          );
        });

        animations.push(statsTimeline);
      }
    }

    animationsRef.current = animations;

    // Fallback pour s'assurer que tous les éléments deviennent visibles
    fallbackTimerRef.current = setTimeout(() => {
      const hiddenElements = document.querySelectorAll(
        ".hero-title, .hero-subtitle, .hero-description, .project-card, .service-card, .stat-card"
      );

      hiddenElements.forEach((element) => {
        const style = window.getComputedStyle(element);
        if (style.opacity === "0" || parseFloat(style.opacity) < 0.1) {
          console.warn("Forcing visibility for element:", element);
          gsap.set(element, { opacity: 1, y: 0, x: 0, scale: 1 });
        }
      });
    }, fallbackTimeout);

    return () => {
      // Cleanup animations
      animations.forEach((animation) => {
        if (animation && animation.kill) {
          animation.kill();
        }
      });

      // Clear fallback timer
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
      }

      // Kill all ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [enableHero, enableCards, enableStats, fallbackTimeout]);

  return {
    forceShow: () => {
      // Fonction d'urgence pour forcer l'affichage de tous les éléments
      const allElements = document.querySelectorAll(
        ".hero-title, .hero-subtitle, .hero-description, .project-card, .service-card, .stat-card"
      );

      allElements.forEach((element) => {
        gsap.set(element, { opacity: 1, y: 0, x: 0, scale: 1 });
      });
    },
  };
};

export default useReliableAnimations;
