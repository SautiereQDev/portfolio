import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal, Home } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";

import { cn } from "../../lib/utils";

// Shadcn/ui base components
function Breadcrumb({ ...props }: React.ComponentProps<"nav">) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5",
        className
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
}

function BreadcrumbLink({
  asChild,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean;
}) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("hover:text-foreground transition-colors", className)}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("text-foreground font-normal", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

// Custom breadcrumb implementation using shadcn/ui components and Tanstack Router
interface BreadcrumbItem {
  name: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface CustomBreadcrumbProps {
  className?: string;
  showHome?: boolean;
}

export const CustomBreadcrumb = ({
  className,
  showHome = true,
}: CustomBreadcrumbProps) => {
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
    <Breadcrumb
      className={cn("flex items-center space-x-2 text-sm", className)}
    >
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const Icon = item.icon;

          return (
            <React.Fragment key={item.path}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="flex items-center space-x-1 font-medium text-gray-900">
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.name}</span>
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      to={item.path}
                      className="flex items-center space-x-1 text-gray-500 transition-colors duration-200 hover:text-blue-600"
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      <span>{item.name}</span>
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};

export default CustomBreadcrumb;
