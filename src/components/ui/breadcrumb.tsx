import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";
import { cn } from "../../lib/utils";

interface BreadcrumbItem {
  name: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface BreadcrumbProps {
  className?: string;
  showHome?: boolean;
}

export const Breadcrumb = ({ className, showHome = true }: BreadcrumbProps) => {
  const router = useRouterState();

  const breadcrumbItems: BreadcrumbItem[] = [
    { name: "Accueil", path: "/", icon: Home },
    { name: "À propos", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projets", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const currentPath = router.location.pathname;
  const currentItem = breadcrumbItems.find((item) => item.path === currentPath);

  if (!currentItem || (currentPath === "/" && !showHome)) {
    return null;
  }

  const items =
    showHome && currentPath !== "/"
      ? [breadcrumbItems[0], currentItem]
      : [currentItem];

  return (
    <nav
      className={cn("flex items-center space-x-2 text-sm", className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const Icon = item.icon;

          return (
            <li key={item.path} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
              )}

              {isLast ? (
                <span className="flex items-center space-x-1 font-medium text-gray-900">
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{item.name}</span>
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="flex items-center space-x-1 text-gray-500 transition-colors duration-200 hover:text-blue-600"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{item.name}</span>
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
