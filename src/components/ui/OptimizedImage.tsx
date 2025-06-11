import { useState } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

/**
 * Composant d'image optimisé avec support WebP et fallback automatique
 */
export const OptimizedImage = ({
  src,
  alt,
  className = "",
  fallbackSrc,
}: OptimizedImageProps) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    console.warn(`Échec du chargement de l'image: ${src}`);
    console.error("Détails de l'erreur:", event);
    setHasError(true);
    setIsLoading(false);
  };
  const handleImageLoad = () => {
    // eslint-disable-next-line no-console
    console.log(`✅ Image chargée avec succès: ${src}`);
    setIsLoading(false);
  };

  // Si erreur et pas de fallback, on affiche un placeholder
  if (hasError && !fallbackSrc) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-200 text-sm text-gray-500 ${className}`}
        aria-label={alt}
      >
        Image non disponible
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Skeleton de chargement */}
      {isLoading && (
        <div
          className={`absolute inset-0 animate-pulse bg-gray-200 ${className}`}
        />
      )}

      <img
        src={hasError && fallbackSrc ? fallbackSrc : src}
        alt={alt}
        className={`${className} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
      />
    </div>
  );
};

export default OptimizedImage;
