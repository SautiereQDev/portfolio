import { lazy, Suspense } from "react";
import { cn } from "../../lib/utils";

interface OptimizedIllustrationProps {
  name: "about" | "home" | "projects" | "services";
  alt: string;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
}

// Lazy loading des SVG pour le code splitting
const illustrations = {
  about: lazy(() => import("../../assets/images/about_banner.svg?react")),
  home: lazy(() => import("../../assets/images/home_banner.svg?react")),
  projects: lazy(() => import("../../assets/images/project_banner.svg?react")),
  services: lazy(() => import("../../assets/images/services_banner.svg?react")),
};

// Skeleton de chargement adaptatif
const IllustrationSkeleton = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "animate-pulse rounded-lg bg-gradient-to-r from-gray-200 to-gray-300",
      className
    )}
    aria-hidden="true"
  >
    <div className="flex h-full items-center justify-center text-gray-400">
      <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  </div>
);

/**
 * Composant d'illustration optimisé avec SVG et lazy loading
 */
export const OptimizedIllustration = ({
  name,
  alt,
  className,
  priority = false,
  onLoad,
}: OptimizedIllustrationProps) => {
  const IllustrationComponent = illustrations[name];

  const handleLoad = () => {
    onLoad?.();
  };

  return (
    <figure
      className={cn("relative", className)}
      aria-labelledby={`illustration-${name}`}
    >
      <Suspense fallback={<IllustrationSkeleton className={className} />}>
        <IllustrationComponent
          className={cn(
            "h-full w-full transition-opacity duration-300",
            priority ? "opacity-100" : "opacity-90 hover:opacity-100"
          )}
          aria-labelledby={`illustration-${name}`}
          onLoad={handleLoad}
        />
        <figcaption id={`illustration-${name}`} className="sr-only">
          {alt}
        </figcaption>
      </Suspense>
    </figure>
  );
};

export default OptimizedIllustration;
