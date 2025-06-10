import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimationConfig {
  duration?: number;
  ease?: string;
  delay?: number;
  stagger?: number;
}

interface UseGSAPAnimationsOptions {
  enableScrollTrigger?: boolean;
  parallax?: boolean;
}

export const useGSAPAnimations = (options: UseGSAPAnimationsOptions = {}) => {
  const { enableScrollTrigger = false } = options;
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Animation de fade in depuis le bas
  const animateFromBottom = useCallback(
    (elements: (HTMLElement | null)[], config: AnimationConfig = {}) => {
      const {
        duration = 0.6,
        ease = "power2.out",
        delay = 0,
        stagger = 0.1,
      } = config;

      const validElements = elements.filter(Boolean);
      if (validElements.length === 0) return;

      if (stagger > 0 && validElements.length > 1) {
        gsap.fromTo(
          validElements,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration,
            ease,
            delay,
            stagger,
          }
        );
      } else {
        validElements.forEach((element, index) => {
          gsap.fromTo(
            element,
            { y: 50, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration,
              ease,
              delay: delay + index * stagger,
            }
          );
        });
      }
    },
    []
  );

  // Animation de fade in depuis la gauche
  const animateFromLeft = useCallback(
    (elements: (HTMLElement | null)[], config: AnimationConfig = {}) => {
      const { duration = 0.6, ease = "power2.out", delay = 0 } = config;

      const validElements = elements.filter(Boolean);
      if (validElements.length === 0) return;

      gsap.fromTo(
        validElements,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration,
          ease,
          delay,
        }
      );
    },
    []
  );

  // Animation de scale
  const animateScale = useCallback(
    (elements: (HTMLElement | null)[], config: AnimationConfig = {}) => {
      const { duration = 0.6, ease = "back.out(1.4)", delay = 0 } = config;

      const validElements = elements.filter(Boolean);
      if (validElements.length === 0) return;

      gsap.fromTo(
        validElements,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration,
          ease,
          delay,
        }
      );
    },
    []
  );

  // Timeline d'entrée
  const createEntranceTimeline = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.kill();
    }
    timelineRef.current = gsap.timeline();
    return timelineRef.current;
  }, []);

  // Parallax effect
  const createParallaxEffect = useCallback(
    (
      element: HTMLElement | null,
      trigger: HTMLElement | null,
      intensity = 50
    ) => {
      if (!element || !trigger || !enableScrollTrigger) return;

      ScrollTrigger.create({
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5,
        onUpdate: (self) => {
          gsap.to(element, {
            y: self.progress * intensity,
            duration: 0.1,
            ease: "power1.out",
          });
        },
      });
    },
    [enableScrollTrigger]
  );

  // Nettoyage
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      if (enableScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, [enableScrollTrigger]);

  return {
    animateFromBottom,
    animateFromLeft,
    animateScale,
    createEntranceTimeline,
    createParallaxEffect,
  };
};
