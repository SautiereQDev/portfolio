import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
}

export const HeroSection = ({
  title,
  subtitle,
  description,
  ctaText,
  ctaLink,
  imageUrl,
}: HeroSectionProps) => {
  const heroRef = useRef<HTMLDivElement>(null); const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const chevronRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tl = gsap.timeline(); // Animation d&apos;entrée plus rapide
    tl.from(imageRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    })
      .fromTo(
        titleRef.current,
        { y: 40, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.5, ease: "power3.out" },
        "-=0.4",
      )
      .fromTo(
        subtitleRef.current,
        { y: 25, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out" },
        "-=0.3",
      )
      .fromTo(
        descriptionRef.current,
        { y: 25, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out" },
        "-=0.2",
      )
      .fromTo(
        ctaRef.current,
        {
          y: 25,
          autoAlpha: 0,
          scale: 0.9,
          rotation: -3,
        },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: "back.out(1.4)",
        },
        "-=0.3",
      );    // Animation d'apparition du chevron - simple et élégante
    tl.fromTo(chevronRef.current, {
      y: 10,
      opacity: 0,
    }, {
      y: 0,
      opacity: 0.8, // Opacité légèrement augmentée pour plus de visibilité
      duration: 1.2,
      ease: "power2.out",
      delay: 1.5, // Apparaît après que tout le contenu soit visible
    });// Animation parallax sur l&apos;image - plus fluide
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      scrub: 0.5,
      onUpdate: (self) => {
        if (imageRef.current) {
          gsap.to(imageRef.current, {
            y: self.progress * 80,
            duration: 0.1,
            ease: "power1.out",
          });
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.2)_1px,transparent_0)] bg-[length:25px_25px] sm:bg-[length:35px_35px] lg:bg-[length:50px_50px]"></div>
      </div>

      {/* Overlay pour améliorer la lisibilité */}
      <div className="absolute inset-0 bg-white/60"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Contenu textuel */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div className="space-y-3 lg:space-y-4">
              <h1
                ref={titleRef}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight drop-shadow-lg break-words"
              >
                {title}
              </h1>
              <p
                ref={subtitleRef}
                className="text-lg sm:text-xl md:text-2xl text-black font-bold drop-shadow-md"
              >
                {subtitle}
              </p>
            </div>
            <p
              ref={descriptionRef}
              className="text-base sm:text-lg text-black leading-relaxed max-w-2xl font-body font-medium drop-shadow-sm"
            >
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">

              <a
                ref={ctaRef}
                href={ctaLink}
                className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden transform-gpu"
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:scale-105">
                  {ctaText}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
              </a>
              <a
                href="/projects"
                className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold text-gray-800 bg-white border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 hover:shadow-md"
              >
                Voir mes projets
              </a>
            </div>
          </div>
          {/* Image */}
          <div className="relative order-1 lg:order-2 mb-8 lg:mb-0">
            <div className="relative z-10">
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Hero illustration"
                className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto h-auto object-contain"
              />
            </div>
            {/* Éléments décoratifs */}
            <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>            <div className="absolute -bottom-4 -right-2 sm:-bottom-8 sm:-right-4 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>
        </div>
      </div>      {/* Chevron animé pour inviter au scroll - version discrète */}
      <div
        ref={chevronRef}
        className="absolute bottom-16 sm:bottom-20 lg:bottom-24 left-1/2 transform -translate-x-1/2 z-50"
        style={{ opacity: 0 }}
      >
        <button
          onClick={() => {
            const nextSection = document.getElementById('features');
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: 'smooth' });
            }
          }} className="group flex flex-col items-center cursor-pointer transition-all duration-300 hover:scale-105 hover:space-y-3 space-y-1"
          aria-label="Défiler vers le bas"
        >
          {/* Texte d'indication - avec effet hover plus impactant */}
          <span className="text-xs text-gray-500 opacity-80 group-hover:opacity-100 group-hover:text-blue-600 group-hover:font-medium transition-all duration-300 font-normal group-hover:scale-105">
            Voir plus
          </span>

          {/* Chevron animé - avec effets hover impactants et centrage amélioré */}
          <div className="relative flex items-center justify-center w-10 h-10">
            {/* Cercle de fond qui apparaît au hover - mieux centré */}
            <div className="absolute inset-0 rounded-full bg-blue-500/0 group-hover:bg-blue-500/10 border-2 border-transparent group-hover:border-blue-300/30 transition-all duration-300 group-hover:scale-110"></div>

            {/* Effet de pulsation au hover - mieux centré */}
            <div className="absolute inset-0 rounded-full bg-blue-400/0 group-hover:bg-blue-400/20 transition-all duration-300 group-hover:animate-ping"></div>            {/* Le chevron avec des effets améliorés - parfaitement centré */}            <ChevronDown
              className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-all duration-300 drop-shadow-sm group-hover:drop-shadow-lg group-hover:scale-125 relative z-10 group-hover:animate-bounce"
              style={{
                animation: 'chevron-float 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                animationDelay: '2s',
                willChange: 'transform, opacity'
              }}
            />
          </div>
        </button>
      </div>
    </section>
  );
};
