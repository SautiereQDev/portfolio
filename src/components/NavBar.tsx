import { useState, useEffect, useRef } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  FolderOpen,
  Mail,
  ChevronUp,
  ArrowRight,
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { gsap } from "gsap";

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const router = useRouterState();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const navigationItems = [
    {
      name: "Accueil",
      path: "/",
      icon: Home,
      description: "Page d&apos;accueil",
    },
    { name: "À propos", path: "/about", icon: User, description: "Mon profil" },
    {
      name: "Services",
      path: "/services",
      icon: Briefcase,
      description: "Mes prestations",
    },
    {
      name: "Projets",
      path: "/projects",
      icon: FolderOpen,
      description: "Mon portfolio",
    },
    {
      name: "Contact",
      path: "/contact",
      icon: Mail,
      description: "Me contacter",
    },
  ];

  // Fonction pour obtenir le titre de la page courante
  const getCurrentPageTitle = () => {
    const currentItem = navigationItems.find(
      (item) => item.path === router.location.pathname
    );
    return currentItem?.name ?? "Portfolio";
  };

  // Fonction de scroll vers le haut
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // Animation d&apos;entrée de la navbar
    const tl = gsap.timeline();

    tl.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
    })
      .from(
        logoRef.current,
        {
          x: -30,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .from(
        menuRef.current?.children || [],
        {
          y: -20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4"
      ); // Animation au scroll et progress tracking
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        documentHeight > 0 ? (currentScroll / documentHeight) * 100 : 0;

      // Mise à jour du progress
      setScrollProgress(progress);

      // Affichage du bouton back-to-top
      setShowBackToTop(currentScroll > 500);

      // Animation de la navbar au scroll - plus conservatrice pour garder la visibilité
      if (currentScroll > lastScroll && currentScroll > 200) {
        // Scroll vers le bas - réduire légèrement l'opacité au lieu de cacher complètement
        gsap.to(navRef.current, {
          y: -20,
          opacity: 0.9,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // Scroll vers le haut - restaurer complètement
        gsap.to(navRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {" "}
      <nav
        ref={navRef}
        className="fixed top-0 right-0 left-0 z-50 border-b border-gray-300/60 bg-white/95 font-[Manrope] shadow-lg shadow-black/5 backdrop-blur-xl"
      >
        {" "}
        {/* Barre de progression du scroll */}
        <div
          ref={progressRef}
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 shadow-md transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo avec indicateur de page */}
            <div ref={logoRef} className="flex items-center space-x-4">
              <Link
                to="/"
                className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent transition-transform duration-200 hover:scale-105"
              >
                Quentin Sautière
              </Link>
              {/* Breadcrumb simple */}
              <div className="hidden items-center text-sm text-gray-500 md:flex">
                <ArrowRight className="mx-2 h-4 w-4" />
                <span>{getCurrentPageTitle()}</span>
              </div>
            </div>

            {/* Navigation Desktop avec icônes améliorées */}
            <div
              ref={menuRef}
              className="hidden items-center space-x-2 md:flex"
            >
              {navigationItems.map((item) => {
                const isActive = router.location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group relative flex items-center space-x-2 rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
                      isActive
                        ? "border-transparent bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                        : "border-transparent text-gray-700 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 transition-transform duration-300 ${
                        isActive ? "scale-110" : "group-hover:scale-110"
                      }`}
                    />
                    <span>{item.name}</span>

                    {/* Tooltip */}
                    <div className="pointer-events-none absolute -bottom-10 left-1/2 -translate-x-1/2 transform rounded bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      {item.description}
                    </div>
                  </Link>
                );
              })}

              <div className="ml-4 border-l border-gray-200 pl-4">
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
                >
                  <Link to="/contact" className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>Contactez-moi</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Menu Mobile avec compteur de pages */}
            <div className="flex items-center space-x-4 md:hidden">
              <Badge variant="outline" className="text-xs">
                {navigationItems.findIndex(
                  (item) => item.path === router.location.pathname
                ) + 1}
                /{navigationItems.length}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 transition-colors duration-200 hover:bg-blue-50"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>{" "}
        {/* Menu Mobile Dropdown amélioré */}
        {isMenuOpen && (
          <div className="border-t border-gray-300/60 bg-white/98 shadow-lg backdrop-blur-xl md:hidden">
            <div className="container mx-auto px-6 py-6">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const isActive = router.location.pathname === item.path;
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <div className="flex-1">
                        <div>{item.name}</div>
                        <div className="text-xs opacity-75">
                          {item.description}
                        </div>
                      </div>
                      {isActive && (
                        <Badge variant="secondary" className="text-xs">
                          Actuel
                        </Badge>
                      )}
                    </Link>
                  );
                })}

                <div className="mt-4 border-t border-gray-200 pt-4">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                  >
                    <Link
                      to="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center space-x-2"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Contactez-moi</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Bouton Back to Top */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed right-8 bottom-8 z-40 h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
          size="icon"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
    </>
  );
};

export default NavBar;
