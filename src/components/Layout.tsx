import { memo, ReactNode } from "react";
import { Footer } from "./Footer";
import { SectionNavigation } from "./ui/SectionNavigation";
import { ErrorBoundary } from "./ErrorBoundary";
import type { BaseComponentProps, SectionLink } from "../types";

interface LayoutProps extends BaseComponentProps {
  children: ReactNode;
  showSectionNav?: boolean;
  sections?: SectionLink[];
  sectionNavPosition?: "left" | "right";
}

/**
 * Layout Component
 * Provides consistent page structure with navbar, footer, and optional section navigation
 */
export const Layout = memo<LayoutProps>(
  ({
    children,
    className,
    showSectionNav = false,
    sections = [],
    sectionNavPosition = "right",
  }) => {
    return (
      <ErrorBoundary>
        <div
          className={`flex min-h-screen flex-col bg-white ${className ?? ""}`}
        >
          {/* Main Content */}
          <main className="flex-1">
            <ErrorBoundary
              fallback={
                <div className="flex min-h-screen items-center justify-center">
                  <div className="text-center">
                    <h2 className="mb-2 text-xl font-semibold text-gray-900">
                      Erreur de contenu
                    </h2>
                    <p className="text-gray-600">
                      Une erreur s&apos;est produite lors du chargement du
                      contenu.
                    </p>
                  </div>
                </div>
              }
            >
              {children}
            </ErrorBoundary>
          </main>

          {/* Footer */}
          <Footer />

          {/* Section Navigation */}
          {showSectionNav && sections.length > 0 && (
            <SectionNavigation
              sections={sections}
              position={sectionNavPosition}
            />
          )}
        </div>
      </ErrorBoundary>
    );
  }
);

Layout.displayName = "Layout";
