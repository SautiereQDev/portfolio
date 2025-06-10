import { useEffect, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ANIMATION_DURATIONS,
  ANIMATION_EASES,
  ANIMATION_DELAYS,
} from "../constants";

gsap.registerPlugin(ScrollTrigger);

interface HeroAnimationRefs {
  heroRef: RefObject<HTMLDivElement | null>;
  titleRef: RefObject<HTMLHeadingElement | null>;
  subtitleRef: RefObject<HTMLParagraphElement | null>;
  descriptionRef: RefObject<HTMLParagraphElement | null>;
  ctaRef: RefObject<HTMLAnchorElement | null>;
  imageRef: RefObject<HTMLImageElement | null>;
  chevronRef: RefObject<HTMLDivElement | null>;
  isAtTop: boolean;
}

/**
 * Custom hook for HeroSection GSAP animations
 * Handles entrance animations, parallax effects, and chevron re-animation
 */
export const useHeroAnimations = ({
  heroRef,
  titleRef,
  subtitleRef,
  descriptionRef,
  ctaRef,
  imageRef,
  chevronRef,
  isAtTop,
}: HeroAnimationRefs) => {
  useEffect(() => {
    // Initialize title for typewriter effect with smooth reveal
    if (titleRef.current) {
      gsap.set(titleRef.current, {
        autoAlpha: 1,
        y: 0,
        transform: "translateY(0px)",
      });
    }

    const tl = gsap.timeline();

    // Image entrance animation with enhanced effect
    tl.from(imageRef.current, {
      scale: 0.7,
      opacity: 0,
      rotation: -5,
      duration: ANIMATION_DURATIONS.NORMAL,
      ease: ANIMATION_EASES.POWER3_OUT,
    })
      // Title container reveal (sans contenu, préparé pour typewriter)
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: ANIMATION_EASES.POWER2_OUT,
        },
        0.8
      )
      // Subtitle animation (synchronized avec fin du typewriter)
      .fromTo(
        subtitleRef.current,
        { y: 25, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.5,
          ease: ANIMATION_EASES.POWER3_OUT,
        },
        "+=1.5" // Start après que le typewriter ait un bon progrès
      )
      // Description animation
      .fromTo(
        descriptionRef.current,
        { y: 25, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.4,
          ease: ANIMATION_EASES.POWER3_OUT,
        },
        "-=0.2"
      )
      // CTA button animation with rotation effect
      .fromTo(
        ctaRef.current,
        {
          y: 25,
          autoAlpha: 0,
          scale: 0.9,
          rotation: -3,
        },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          rotation: 0,
          duration: ANIMATION_DURATIONS.FAST,
          ease: ANIMATION_EASES.BACK_OUT,
        },
        "-=0.3"
      )
      // Chevron entrance animation
      .fromTo(
        chevronRef.current,
        {
          y: 10,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 0.8,
          duration: ANIMATION_DURATIONS.SLOW,
          ease: ANIMATION_EASES.POWER2_OUT,
          delay: ANIMATION_DELAYS.LONG,
        }
      );

    // Parallax effect for image
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 0.5,
      onUpdate: (self) => {
        if (imageRef.current) {
          gsap.to(imageRef.current, {
            y: self.progress * 80,
            duration: 0.1,
            ease: "power1.out",
          });
        }
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [
    heroRef,
    titleRef,
    subtitleRef,
    descriptionRef,
    ctaRef,
    imageRef,
    chevronRef,
  ]);

  // Re-animate chevron when returning to top
  useEffect(() => {
    if (isAtTop && chevronRef.current) {
      // Reset and re-animate chevron
      gsap.set(chevronRef.current, {
        y: 10,
        opacity: 0,
      });

      gsap.to(chevronRef.current, {
        y: 0,
        opacity: 0.8,
        duration: 0.8,
        ease: ANIMATION_EASES.POWER2_OUT,
        delay: ANIMATION_DELAYS.SHORT,
      });
    }
  }, [isAtTop, chevronRef]);
};
