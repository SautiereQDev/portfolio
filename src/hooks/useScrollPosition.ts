import { useState, useEffect } from "react";

interface UseScrollPositionOptions {
  threshold?: number;
  throttleMs?: number;
}

interface ScrollPosition {
  x: number;
  y: number;
  isAtTop: boolean;
  isAtBottom: boolean;
  scrollProgress: number;
  showBackToTop: boolean;
}

export const useScrollPosition = ({
  threshold = 50,
  throttleMs = 16,
}: UseScrollPositionOptions = {}): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    isAtTop: true,
    isAtBottom: false,
    scrollProgress: 0,
    showBackToTop: false,
  });

  useEffect(() => {
    let ticking = false;

    const updateScrollPosition = () => {
      const x = window.pageXOffset;
      const y = window.pageYOffset;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = documentHeight > 0 ? (y / documentHeight) * 100 : 0;
      setScrollPosition({
        x,
        y,
        isAtTop: y <= threshold,
        isAtBottom: y >= documentHeight - threshold,
        scrollProgress: progress,
        showBackToTop: y > 500,
      });

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    // Throttle the scroll event
    let lastTime = 0;
    const throttledScroll = () => {
      const now = Date.now();
      if (now - lastTime >= throttleMs) {
        handleScroll();
        lastTime = now;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    updateScrollPosition(); // Initial call

    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, [threshold, throttleMs]);

  return scrollPosition;
};
