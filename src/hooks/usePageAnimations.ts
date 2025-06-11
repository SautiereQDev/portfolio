import { useEffect, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimationConfig {
  heroRef?: RefObject<HTMLDivElement | null>;
  enableHeroAnimations?: boolean;
  enableCardAnimations?: boolean;
  enableProcessAnimations?: boolean;
  customSelectors?: {
    selector: string;
    animation: gsap.TweenVars;
    scrollTriggerConfig?: ScrollTrigger.StaticVars;
  }[];
}

/**
 * Custom hook for page-level GSAP animations
 * Centralizes animation logic and follows DRY principles
 */
export const usePageAnimations = ({
  heroRef,
  enableHeroAnimations = true,
  enableCardAnimations = true,
  enableProcessAnimations = false,
  customSelectors = [],
}: AnimationConfig = {}) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const animations: (gsap.core.Tween | gsap.core.Timeline)[] = [];

      // Hero section animations - uniquement si le ref existe et contient les éléments
      if (enableHeroAnimations && heroRef?.current) {
        const heroContainer = heroRef.current;
        const heroTitle = heroContainer.querySelector(".hero-title");
        const heroSubtitle = heroContainer.querySelector(".hero-subtitle");
        const heroDescription =
          heroContainer.querySelector(".hero-description");

        if (heroTitle || heroSubtitle || heroDescription) {
          const tl = gsap.timeline();

          if (heroTitle) {
            tl.from(heroTitle, {
              y: 50,
              opacity: 0,
              duration: 1,
              ease: "power3.out",
            });
          }

          if (heroSubtitle) {
            tl.from(
              heroSubtitle,
              {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
              },
              "-=0.6"
            );
          }

          if (heroDescription) {
            tl.from(
              heroDescription,
              {
                y: 20,
                opacity: 0,
                duration: 0.6,
                ease: "power3.out",
              },
              "-=0.4"
            );
          }

          animations.push(tl);
        }
      }

      // Card animations - seulement si les éléments existent et ne sont pas déjà animés par AnimatedSection
      if (enableCardAnimations) {
        // Profile/main cards
        const profileCards = document.querySelectorAll(
          ".profile-card:not([data-animated])"
        );
        if (profileCards.length > 0) {
          const profileAnimation = gsap.from(profileCards, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: profileCards[0],
              start: "top 80%",
              once: true,
            },
          });
          animations.push(profileAnimation);

          // Marquer comme animés
          profileCards.forEach((card) =>
            card.setAttribute("data-animated", "true")
          );
        }

        // Education/service cards
        const educationCards = document.querySelectorAll(
          ".education-card:not([data-animated]), .service-card:not([data-animated])"
        );
        if (educationCards.length > 0) {
          const educationAnimation = gsap.from(educationCards, {
            y: 30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: educationCards[0],
              start: "top 80%",
              once: true,
            },
          });
          animations.push(educationAnimation);

          // Marquer comme animés
          educationCards.forEach((card) =>
            card.setAttribute("data-animated", "true")
          );
        }
      }

      // Process animations
      if (enableProcessAnimations) {
        const processSteps = document.querySelectorAll(
          ".process-step:not([data-animated])"
        );
        if (processSteps.length > 0) {
          const processAnimation = gsap.from(processSteps, {
            x: -30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: processSteps[0],
              start: "top 80%",
              once: true,
            },
          });
          animations.push(processAnimation);

          // Marquer comme animés
          processSteps.forEach((step) =>
            step.setAttribute("data-animated", "true")
          );
        }
      }

      // Custom animations
      customSelectors.forEach(
        ({ selector, animation, scrollTriggerConfig }) => {
          const elements = document.querySelectorAll(
            `${selector}:not([data-animated])`
          );
          if (elements.length > 0) {
            const baseAnimation = {
              ...animation,
              scrollTrigger: scrollTriggerConfig || {
                trigger: elements[0],
                start: "top 80%",
                once: true,
              },
            };

            const customAnimation = gsap.from(elements, baseAnimation);
            animations.push(customAnimation);

            // Marquer comme animés
            elements.forEach((el) => el.setAttribute("data-animated", "true"));
          }
        }
      );

      // Cleanup function
      return () => {
        animations.forEach((animation) => {
          if (animation && animation.kill) {
            animation.kill();
          }
        });
      };
    });

    return () => ctx.revert();
  }, [
    heroRef,
    enableHeroAnimations,
    enableCardAnimations,
    enableProcessAnimations,
    customSelectors,
  ]);
};

export default usePageAnimations;
