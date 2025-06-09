import { useState, useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  User,
  Briefcase,
  FolderOpen,
  Mail,
} from "lucide-react";
import { Button } from "./button";
import { cn } from "../../lib/utils";

interface PageNavigationProps {
  className?: string;
  showLabels?: boolean;
}

export const PageNavigation = ({
  className,
  showLabels = true,
}: PageNavigationProps) => {
  const router = useRouterState();
  const [isVisible, setIsVisible] = useState(false);

  const pages = [
    { name: "Accueil", path: "/", icon: Home },
    { name: "À propos", path: "/about", icon: User },
    { name: "Services", path: "/services", icon: Briefcase },
    { name: "Projets", path: "/projects", icon: FolderOpen },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  const currentIndex = pages.findIndex(
    (page) => page.path === router.location.pathname,
  );
  const previousPage = currentIndex > 0 ? pages[currentIndex - 1] : null;
  const nextPage =
    currentIndex < pages.length - 1 ? pages[currentIndex + 1] : null;

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible || currentIndex === -1) return null;

  return (
    <div
      className={cn(
        "fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 bg-white/90 backdrop-blur-lg rounded-full shadow-lg border border-gray-200/50 px-4 py-2 transition-all duration-300 font-body",
        className,
      )}
    >
      <div className="flex items-center space-x-4">
        {/* Page précédente */}
        {previousPage ? (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          >
            <Link to={previousPage.path}>
              <ChevronLeft className="w-4 h-4" />
              {showLabels && (
                <span className="hidden sm:inline">{previousPage.name}</span>
              )}
            </Link>
          </Button>
        ) : (
          <div className="w-8 h-8" />
        )}

        {/* Indicateur de page actuelle */}
        <div className="flex items-center space-x-1">
          {pages.map((page, index) => {
            const Icon = page.icon;
            const isActive = index === currentIndex;

            return (
              <Link
                key={page.path}
                to={page.path}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-110"
                    : "text-gray-400 hover:text-blue-600 hover:bg-blue-50",
                )}
                title={page.name}
              >
                <Icon className="w-4 h-4" />
              </Link>
            );
          })}
        </div>

        {/* Page suivante */}
        {nextPage ? (
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
          >
            <Link to={nextPage.path}>
              {showLabels && (
                <span className="hidden sm:inline">{nextPage.name}</span>
              )}
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Button>
        ) : (
          <div className="w-8 h-8" />
        )}
      </div>
    </div>
  );
};

export default PageNavigation;
