import { useEffect, RefObject } from "react";
import { gsap } from "gsap";
import { ANIMATION_DURATIONS, ANIMATION_EASES } from "../constants";

interface NavbarAnimationRefs {
  navRef: RefObject<HTMLElement | null>;
  logoRef: RefObject<HTMLDivElement | null>;
  menuRef: RefObject<HTMLDivElement | null>;
}

/**
 * Custom hook for Navbar GSAP animations
 * Handles entrance animations and scroll-based visibility changes
 */
export const useNavbarAnimations = ({
  navRef,
  logoRef,
  menuRef,
}: NavbarAnimationRefs) => {
  // Initial entrance animations
  useEffect(() => {
    const tl = gsap.timeline();

    // Navbar entrance from top
    tl.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: ANIMATION_EASES.POWER2_OUT,
    })
      // Logo entrance from left
      .from(
        logoRef.current,
        {
          x: -30,
          opacity: 0,
          duration: ANIMATION_DURATIONS.NORMAL,
          ease: ANIMATION_EASES.POWER2_OUT,
        },
        "-=0.4"
      )
      // Menu items staggered entrance
      .from(
        menuRef.current?.children || [],
        {
          y: -20,
          opacity: 0,
          duration: ANIMATION_DURATIONS.FAST,
          stagger: 0.1,
          ease: ANIMATION_EASES.POWER2_OUT,
        },
        "-=0.4"
      );

    return () => {
      tl.kill();
    };
  }, [navRef, logoRef, menuRef]);

  // Scroll-based animations
  useEffect(() => {
    let lastScroll = 0;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScroll = window.pageYOffset;

          // Navbar hide/show animation based on scroll direction
          if (currentScroll > lastScroll && currentScroll > 200) {
            // Scrolling down - slightly hide navbar
            gsap.to(navRef.current, {
              y: -20,
              opacity: 0.9,
              duration: 0.3,
              ease: ANIMATION_EASES.POWER2_OUT,
            });
          } else {
            // Scrolling up - show navbar fully
            gsap.to(navRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.3,
              ease: ANIMATION_EASES.POWER2_OUT,
            });
          }

          lastScroll = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navRef]);
};
