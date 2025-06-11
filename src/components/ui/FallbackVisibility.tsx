import { useEffect, useRef, useState } from "react";

interface FallbackVisibilityProps {
  children: React.ReactNode;
  className?: string;
  timeout?: number;
}

/**
 * Composant de fallback qui s'assure que les éléments deviennent visibles
 * même si les animations GSAP échouent
 */
export const FallbackVisibility = ({
  children,
  className = "",
  timeout = 3000,
}: FallbackVisibilityProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [forceVisible, setForceVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Vérifier si l'élément est visible après le timeout
    const timeoutId = setTimeout(() => {
      const style = window.getComputedStyle(element);
      const isHidden = style.opacity === "0" || style.visibility === "hidden";

      if (isHidden) {
        console.warn(
          "Element not visible after timeout, forcing visibility:",
          element
        );
        setForceVisible(true);
      }
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [timeout]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={forceVisible ? { opacity: 1, transform: "none" } : undefined}
    >
      {children}
    </div>
  );
};

export default FallbackVisibility;
