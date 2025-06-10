// filepath: c:\Users\sauti\Workspace\Web\portfolio\src\components\NavBar.tsx
import { useState, useRef, memo, useCallback } from "react";
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
} from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { useNavbarAnimations } from "../hooks/useNavbarAnimations";
import { useScrollNavigation } from "../hooks/useScrollNavigation";
import type { NavigationItem } from "../types";

// Navigation items configuration
const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    name: "Accueil",
    path: "/",
    icon: Home,
    description: "Page d'accueil",
  },
  {
    name: "À propos",
    path: "/about",
    icon: User,
    description: "Mon profil",
  },
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

/**
 * Navigation Bar Component
 * Features scroll progress, mobile menu, back-to-top button, and smooth animations
 */
export const NavBar = memo(() => {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Refs
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Router state
  const router = useRouterState();

  // Custom hooks
  const { scrollProgress, showBackToTop } = useScrollPosition();
  const { scrollToTop } = useScrollNavigation();
  // Navbar animations
  useNavbarAnimations({
    navRef,
    logoRef,
    menuRef,
  });

  // Get current page title
  const getCurrentPageTitle = useCallback(() => {
    const currentItem = NAVIGATION_ITEMS.find(
      (item) => item.path === router.location.pathname
    );
    return currentItem?.name ?? "Portfolio";
  }, [router.location.pathname]);

  // Toggle mobile menu
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Close mobile menu
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Check if link is active
  const isActiveLink = useCallback(
    (path: string) => {
      return router.location.pathname === path;
    },
    [router.location.pathname]
  );

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 right-0 left-0 z-50 border-b border-gray-300/60 bg-white/95 font-[Manrope] shadow-lg shadow-black/5 backdrop-blur-xl"
      >
        {/* Scroll Progress Bar */}
        <div
          ref={progressRef}
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div ref={logoRef} className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                <span className="text-sm font-bold text-white">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">
                {getCurrentPageTitle()}
              </span>
            </div>

            {/* Desktop Navigation */}
            <div
              ref={menuRef}
              className="hidden items-center space-x-1 md:flex"
            >
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group relative rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActiveLink(item.path)
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </div>
                  {isActiveLink(item.path) && (
                    <div className="absolute -bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-blue-600" />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full right-0 left-0 border-b border-gray-200 bg-white/95 backdrop-blur-xl md:hidden">
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-2">
                {NAVIGATION_ITEMS.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeMenu}
                    className={`flex items-center space-x-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                      isActiveLink(item.path)
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-gray-500">
                        {item.description}
                      </div>
                    </div>
                    {isActiveLink(item.path) && (
                      <Badge variant="secondary" className="ml-auto">
                        Actuel
                      </Badge>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Back to Top Button */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          size="sm"
          className="fixed right-6 bottom-6 z-40 h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
          aria-label="Retour en haut"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
    </>
  );
});

NavBar.displayName = "NavBar";

// Export default for backward compatibility
export default NavBar;
