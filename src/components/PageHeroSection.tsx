import { forwardRef, ReactNode, useEffect } from "react";
import { AnimatedSection } from "./ui/animated-section";
import { FallbackVisibility } from "./ui/FallbackVisibility";
import { OptimizedImage } from "./ui/OptimizedImage";

interface HeroSectionProps {
  title: string;
  description: string;
  bannerSrc: string;
  bannerAlt: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Reusable Hero Section Component
 * Standardizes hero sections across pages following design system principles
 */
export const PageHeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(
  (
    { title, description, bannerSrc, bannerAlt, className = "", children },
    ref
  ) => {
    // S'assurer que les éléments hero sont visibles même si les animations échouent
    useEffect(() => {
      const timer = setTimeout(() => {
        const heroElements = document.querySelectorAll(
          ".hero-title, .hero-subtitle, .hero-description"
        );
        heroElements.forEach((el) => {
          const style = window.getComputedStyle(el);
          if (style.opacity === "0") {
            console.warn("Hero element not visible, forcing visibility:", el);
            (el as HTMLElement).style.opacity = "1";
            (el as HTMLElement).style.transform = "none";
          }
        });
      }, 2000);

      return () => clearTimeout(timer);
    }, []);

    return (
      <div id="hero" ref={ref}>
        <AnimatedSection
          className={`relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-24 lg:py-32 ${className}`}
          animation="fadeIn"
          duration={0.6}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
          <div className="relative z-10 container mx-auto px-6 lg:px-8">
            <div className="mx-auto max-w-4xl text-center">
              <FallbackVisibility className="hero-title mb-8">
                <OptimizedImage
                  src={bannerSrc}
                  alt={bannerAlt}
                  className="mx-auto mb-8 w-64 drop-shadow-2xl"
                />
              </FallbackVisibility>
              <FallbackVisibility>
                <h1 className="hero-subtitle mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl leading-tight font-bold text-transparent md:text-6xl">
                  {title}
                </h1>
              </FallbackVisibility>
              <FallbackVisibility>
                <p className="hero-description mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl">
                  {description}
                </p>
              </FallbackVisibility>
              {children}
            </div>
          </div>
        </AnimatedSection>
      </div>
    );
  }
);

PageHeroSection.displayName = "PageHeroSection";

export default PageHeroSection;
