import { memo, useState, useEffect, useRef, ReactNode } from "react";
import { cn } from "../../lib/utils";

interface LazySectionProps {
  children: ReactNode;
  className?: string;
  threshold?: number;
  fallback?: ReactNode;
  rootMargin?: string;
  onVisible?: () => void;
}

/**
 * Lazy Section Component
 * Renders children only when the section becomes visible in the viewport
 */
export const LazySection = memo<LazySectionProps>(
  ({
    children,
    className,
    threshold = 0.1,
    fallback,
    rootMargin = "50px",
    onVisible,
  }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [hasBeenVisible, setHasBeenVisible] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasBeenVisible) {
            setIsVisible(true);
            setHasBeenVisible(true);
            onVisible?.();
            // Disconnect after first visibility to prevent re-triggering
            observer.disconnect();
          }
        },
        {
          threshold,
          rootMargin,
        }
      );

      if (sectionRef.current) {
        observer.observe(sectionRef.current);
      }

      return () => observer.disconnect();
    }, [threshold, rootMargin, hasBeenVisible, onVisible]);

    return (
      <div ref={sectionRef} className={cn("min-h-[200px]", className)}>
        {isVisible
          ? children
          : fallback || (
              <div className="flex min-h-[200px] items-center justify-center">
                <div className="flex w-full max-w-md animate-pulse space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 rounded bg-gray-200"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2 h-2 rounded bg-gray-200"></div>
                        <div className="col-span-1 h-2 rounded bg-gray-200"></div>
                      </div>
                      <div className="h-2 rounded bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
      </div>
    );
  }
);

LazySection.displayName = "LazySection";
