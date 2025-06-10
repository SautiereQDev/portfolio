import { memo, useState, useCallback, ImgHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

interface OptimizedImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "onLoad" | "onError"> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  placeholder?: string;
  aspectRatio?: string;
  lazy?: boolean;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Optimized Image Component
 * Features lazy loading, error handling, and placeholder support
 */
export const OptimizedImage = memo<OptimizedImageProps>(
  ({
    src,
    alt,
    fallbackSrc,
    placeholder,
    aspectRatio,
    lazy = true,
    onLoad,
    onError,
    className,
    ...props
  }) => {
    const [imageState, setImageState] = useState<
      "loading" | "loaded" | "error"
    >("loading");
    const [currentSrc, setCurrentSrc] = useState(src);

    const handleLoad = useCallback(() => {
      setImageState("loaded");
      onLoad?.();
    }, [onLoad]);

    const handleError = useCallback(() => {
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        return;
      }

      setImageState("error");
      onError?.(new Error(`Failed to load image: ${src}`));
    }, [fallbackSrc, currentSrc, src, onError]);

    return (
      <div
        className={cn("relative overflow-hidden bg-gray-100", className)}
        style={{ aspectRatio }}
      >
        {/* Placeholder */}
        {imageState === "loading" && placeholder && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-sm text-gray-400">{placeholder}</div>
          </div>
        )}

        {/* Loading skeleton */}
        {imageState === "loading" && !placeholder && (
          <div className="absolute inset-0 animate-pulse bg-gray-200" />
        )}

        {/* Error state */}
        {imageState === "error" && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-center text-gray-500">
              <svg
                className="mx-auto mb-2 h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div className="text-xs">Image non disponible</div>
            </div>
          </div>
        )}

        {/* Actual image */}
        <img
          src={currentSrc}
          alt={alt}
          loading={lazy ? "lazy" : "eager"}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-300",
            imageState === "loaded" ? "opacity-100" : "opacity-0"
          )}
          {...props}
        />
      </div>
    );
  }
);

OptimizedImage.displayName = "OptimizedImage";
