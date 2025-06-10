import { useState, useEffect } from "react";

/**
 * Simple hook to track if scroll position is above a threshold
 * @param threshold - The scroll threshold in pixels
 * @returns Object with isAtTop boolean
 */
export const useScrollThreshold = (threshold: number = 50) => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsAtTop(scrollY <= threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Check initial position
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return { isAtTop };
};
