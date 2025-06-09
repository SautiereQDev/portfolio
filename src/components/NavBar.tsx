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
    { name: "Accueil", path: "/", icon: Home, description: "Page d&apos;accueil" },
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
      (item) => item.path === router.location.pathname,
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
        "-=0.4",
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
        "-=0.4",
      );

    // Animation au scroll et progress tracking
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

      // Animation de la navbar au scroll
      if (currentScroll > lastScroll && currentScroll > 100) {
        // Scroll vers le bas - cacher la navbar
        gsap.to(navRef.current, {
          y: -100,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // Scroll vers le haut - afficher la navbar
        gsap.to(navRef.current, {
          y: 0,
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
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200/50 font-[Manrope] shadow-sm"
      >
        {/* Barre de progression du scroll */}
        <div
          ref={progressRef}
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo avec indicateur de page */}
            <div ref={logoRef} className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-200"
              >
                Quentin Sautière
              </Link>
              {/* Breadcrumb simple */}
              <div className="hidden md:flex items-center text-sm text-gray-500">
                <ArrowRight className="w-4 h-4 mx-2" />
                <span>{getCurrentPageTitle()}</span>
              </div>
            </div>

            {/* Navigation Desktop avec icônes améliorées */}
            <div
              ref={menuRef}
              className="hidden md:flex items-center space-x-2"
            >
              {navigationItems.map((item) => {
                const isActive = router.location.pathname === item.path;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group relative flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 ${isActive
                      ? "text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                  >
                    <Icon
                      className={`w-4 h-4 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"
                        }`}
                    />
                    <span>{item.name}</span>

                    {/* Tooltip */}
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                      {item.description}
                    </div>
                  </Link>
                );
              })}

              <div className="ml-4 pl-4 border-l border-gray-200">
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Link to="/contact" className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Contactez-moi</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Menu Mobile avec compteur de pages */}
            <div className="md:hidden flex items-center space-x-4">
              <Badge variant="outline" className="text-xs">
                {navigationItems.findIndex(
                  (item) => item.path === router.location.pathname,
                ) + 1}
                /{navigationItems.length}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:bg-blue-50 transition-colors duration-200"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Menu Mobile Dropdown amélioré */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-lg">
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
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${isActive
                        ? "text-white bg-gradient-to-r from-blue-600 to-purple-600"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                        }`}
                    >
                      <Icon className="w-5 h-5" />
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

                <div className="pt-4 mt-4 border-t border-gray-200">
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                  >
                    <Link
                      to="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-center space-x-2"
                    >
                      <Mail className="w-4 h-4" />
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
          className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          size="icon"
        >
          <ChevronUp className="w-5 h-5" />
        </Button>
      )}
    </>
  );
};

export default NavBar;
