import { useRef, memo, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { useScrollThreshold } from "../hooks/useScrollThreshold";
import { useHeroAnimations } from "../hooks/useHeroAnimations";
import { useScrollNavigation } from "../hooks/useScrollNavigation";
import { SCROLL_THRESHOLDS } from "../constants";
import type { HeroSectionProps } from "../types";

/**
 * Hero Section Component - Main landing section with CTA
 * Features parallax animations, scroll-triggered effects, and responsive design
 */
export const HeroSection = memo<HeroSectionProps>(
  ({ title, subtitle, description, ctaText, ctaLink, imageUrl }) => {
    // Refs for DOM elements
    const heroRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLAnchorElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const chevronRef = useRef<HTMLDivElement>(null);

    // Custom hooks
    const { isAtTop } = useScrollThreshold(SCROLL_THRESHOLDS.HERO_TOP);
    const { navigateToSection } = useScrollNavigation();

    // GSAP animations setup - moved to custom hook
    useHeroAnimations({
      heroRef,
      titleRef,
      subtitleRef,
      descriptionRef,
      ctaRef,
      imageRef,
      chevronRef,
      isAtTop,
    });

    // Handler for scroll to next section
    const handleScrollToNext = useCallback(() => {
      navigateToSection("features");
    }, [navigateToSection]);

    return (
      <section
        ref={heroRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.2)_1px,transparent_0)] bg-[length:25px_25px] sm:bg-[length:35px_35px] lg:bg-[length:50px_50px]"></div>
        </div>

        {/* Overlay for better readability */}
        <div className="absolute inset-0 bg-white/60"></div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Text Content */}
            <div className="order-2 space-y-6 lg:order-1 lg:space-y-8">
              <div className="space-y-3 lg:space-y-4">
                <h1
                  ref={titleRef}
                  className="text-3xl leading-tight font-extrabold break-words text-gray-900 drop-shadow-lg sm:text-4xl md:text-5xl lg:text-6xl"
                >
                  {title}
                </h1>
                <p
                  ref={subtitleRef}
                  className="text-lg font-bold text-black drop-shadow-md sm:text-xl md:text-2xl"
                >
                  {subtitle}
                </p>
              </div>
              <p
                ref={descriptionRef}
                className="font-body max-w-2xl text-base leading-relaxed font-medium text-black drop-shadow-sm sm:text-lg"
              >
                {description}
              </p>
              <div className="flex flex-col gap-3 sm:flex-row lg:gap-4">
                <a
                  ref={ctaRef}
                  href={ctaLink}
                  className="group relative inline-flex transform-gpu items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl sm:px-8 sm:py-4 sm:text-lg"
                >
                  <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                    {ctaText}
                  </span>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 blur-sm transition-all duration-500 group-hover:opacity-100"></div>
                </a>
                <a
                  href="/projects"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-800 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md sm:px-8 sm:py-4 sm:text-lg"
                >
                  Voir mes projets
                </a>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative order-1 mb-8 lg:order-2 lg:mb-0">
              <div className="relative z-10">
                <img
                  ref={imageRef}
                  src={imageUrl}
                  alt="Hero illustration"
                  className="mx-auto h-auto w-full max-w-sm object-contain sm:max-w-md lg:max-w-lg"
                />
              </div>
              {/* Decorative Elements */}
              <div className="animate-blob absolute -top-2 -left-2 h-32 w-32 rounded-full bg-blue-200 opacity-70 mix-blend-multiply blur-xl filter sm:-top-4 sm:-left-4 sm:h-48 sm:w-48 lg:h-72 lg:w-72"></div>
              <div className="animate-blob animation-delay-2000 absolute -right-2 -bottom-4 h-32 w-32 rounded-full bg-purple-200 opacity-70 mix-blend-multiply blur-xl filter sm:-right-4 sm:-bottom-8 sm:h-48 sm:w-48 lg:h-72 lg:w-72"></div>
            </div>
          </div>
        </div>

        {/* Animated Chevron - only shown when at top */}
        {isAtTop && (
          <div
            ref={chevronRef}
            className="absolute bottom-16 left-1/2 z-50 -translate-x-1/2 transform sm:bottom-20 lg:bottom-24"
          >
            <button
              onClick={handleScrollToNext}
              className="group flex cursor-pointer flex-col items-center space-y-1 transition-all duration-300 hover:scale-105 hover:space-y-3"
              aria-label="Défiler vers le bas"
            >
              {/* Indication Text */}
              <span className="text-xs font-normal text-gray-500 opacity-80 transition-all duration-300 group-hover:scale-105 group-hover:font-medium group-hover:text-blue-600 group-hover:opacity-100">
                Voir plus
              </span>

              {/* Animated Chevron */}
              <div className="relative flex h-10 w-10 items-center justify-center">
                {/* Background circle on hover */}
                <div className="absolute inset-0 rounded-full border-2 border-transparent bg-blue-500/0 transition-all duration-300 group-hover:scale-110 group-hover:border-blue-300/30 group-hover:bg-blue-500/10"></div>
                {/* Pulse effect on hover */}
                <div className="absolute inset-0 rounded-full bg-blue-400/0 transition-all duration-300 group-hover:animate-ping group-hover:bg-blue-400/20"></div>
                {/* Chevron icon with animations */}
                <ChevronDown
                  className="relative z-10 h-5 w-5 text-gray-600 drop-shadow-sm transition-all duration-300 group-hover:scale-125 group-hover:animate-bounce group-hover:text-blue-600 group-hover:drop-shadow-lg"
                  style={{
                    animation:
                      "chevron-float 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    animationDelay: "2s",
                    willChange: "transform, opacity",
                  }}
                />
              </div>
            </button>
          </div>
        )}
      </section>
    );
  }
);

HeroSection.displayName = "HeroSection";
