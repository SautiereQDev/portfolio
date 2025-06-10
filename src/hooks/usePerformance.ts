import { useEffect, useRef } from "react";

interface PerformanceMetrics {
  renderTime: number;
  componentName: string;
  timestamp: number;
}

interface UsePerformanceOptions {
  enableMetrics?: boolean;
  componentName?: string;
  onMetrics?: (metrics: PerformanceMetrics) => void;
}

// Utility functions for debouncing and throttling (not hooks)
export const createDebounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
) => {
  let timeoutId: NodeJS.Timeout | undefined;

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const createThrottle = <T extends (...args: unknown[]) => unknown>(
  func: T,
  delay: number
) => {
  let lastRun = 0;

  return (...args: Parameters<T>) => {
    const now = Date.now();

    if (now - lastRun >= delay) {
      func(...args);
      lastRun = now;
    }
  };
};

/**
 * Hook for monitoring component performance
 * Tracks render times and provides optimization utilities
 */
export const usePerformance = (options: UsePerformanceOptions = {}) => {
  const {
    enableMetrics = process.env.NODE_ENV === "development",
    componentName = "Unknown",
    onMetrics,
  } = options;

  const renderStartTime = useRef<number | undefined>(undefined);
  const renderCount = useRef(0);

  // Measure render performance
  useEffect(() => {
    if (!enableMetrics) return;

    renderStartTime.current = performance.now();
    renderCount.current += 1;

    return () => {
      if (renderStartTime.current) {
        const renderTime = performance.now() - renderStartTime.current;
        const metrics: PerformanceMetrics = {
          renderTime,
          componentName,
          timestamp: Date.now(),
        };

        // Log performance metrics
        if (renderTime > 16) {
          // Flag slow renders (> 16ms for 60fps)
          console.warn(
            `Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`
          );
        }

        onMetrics?.(metrics);
      }
    };
  });

  return {
    renderCount: renderCount.current,
  };
};
