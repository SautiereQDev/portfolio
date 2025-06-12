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
import { Button } from "./button";
import { Badge } from "./badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";
import { Progress } from "./progress";
import { Separator } from "./separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./hover-card";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { useNavbarAnimations } from "../../hooks/useNavbarAnimations";
import { useScrollNavigation } from "../../hooks/useScrollNavigation";
import type { NavigationItem } from "../../types";

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
 * Enhanced Navigation Bar Component using shadcn/ui components
 * Features improved mobile experience, hover cards, and tooltips
 */
export const EnhancedNavBar = memo(() => {
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
  // Navigation animations
  useNavbarAnimations({ navRef, logoRef, menuRef });

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
    <TooltipProvider>
      <>
        <nav
          ref={navRef}
          className="fixed top-0 right-0 left-0 z-50 border-b border-gray-300/60 bg-white/95 font-[Manrope] shadow-lg shadow-black/5 backdrop-blur-xl"
        >
          {/* Scroll Progress Bar */}
          <Progress
            ref={progressRef}
            value={scrollProgress}
            className="absolute bottom-0 left-0 h-1 rounded-none border-0 bg-transparent"
            style={{
              background:
                "linear-gradient(to right, rgb(59 130 246), rgb(147 51 234))",
            }}
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
                  <HoverCard key={item.path} openDelay={200}>
                    <HoverCardTrigger asChild>
                      <Button
                        variant={
                          isActiveLink(item.path) ? "secondary" : "ghost"
                        }
                        size="sm"
                        className={`relative transition-all duration-200 ${
                          isActiveLink(item.path)
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                        }`}
                        asChild
                      >
                        <Link to={item.path}>
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.name}
                          {isActiveLink(item.path) && (
                            <div className="absolute -bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-blue-600" />
                          )}
                        </Link>
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent side="bottom" className="w-80">
                      <div className="flex space-x-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                          <item.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">{item.name}</h4>
                          <p className="text-muted-foreground text-sm">
                            {item.description}
                          </p>
                          {isActiveLink(item.path) && (
                            <Badge variant="secondary" className="text-xs">
                              Page actuelle
                            </Badge>
                          )}
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>

              {/* Mobile Menu */}
              <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                <SheetTrigger asChild>
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
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="flex items-center space-x-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600">
                        <span className="text-sm font-bold text-white">S</span>
                      </div>
                      Navigation
                    </SheetTitle>
                  </SheetHeader>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    {NAVIGATION_ITEMS.map((item) => (
                      <Button
                        key={item.path}
                        variant={
                          isActiveLink(item.path) ? "secondary" : "ghost"
                        }
                        className={`w-full justify-start ${
                          isActiveLink(item.path)
                            ? "bg-blue-50 text-blue-600"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                        onClick={closeMenu}
                        asChild
                      >
                        <Link to={item.path}>
                          <item.icon className="mr-3 h-5 w-5" />
                          <div className="flex-1 text-left">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-xs text-gray-500">
                              {item.description}
                            </div>
                          </div>
                          {isActiveLink(item.path) && (
                            <Badge
                              variant="secondary"
                              className="ml-auto text-xs"
                            >
                              Actuel
                            </Badge>
                          )}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>

        {/* Back to Top Button */}
        {showBackToTop && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={scrollToTop}
                size="icon"
                className="fixed right-6 bottom-6 z-40 h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
                aria-label="Retour en haut"
              >
                <ChevronUp className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Retour en haut</p>
            </TooltipContent>
          </Tooltip>
        )}
      </>
    </TooltipProvider>
  );
});

EnhancedNavBar.displayName = "EnhancedNavBar";

export default EnhancedNavBar;
