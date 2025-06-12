import { ReactNode } from "react";
import { Badge } from "./badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Button } from "./button";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";

interface SectionHeaderProps {
  badge?: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
    className?: string;
    icon?: ReactNode;
  };
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  children?: ReactNode;
  actions?: {
    primary?: {
      text: string;
      href?: string;
      onClick?: () => void;
    };
    secondary?: {
      text: string;
      href?: string;
      onClick?: () => void;
    };
  };
  layout?: "default" | "centered" | "split" | "card";
}

/**
 * Enhanced Section Header Component using shadcn/ui
 * Provides multiple layouts and enhanced visual elements
 */
export const SectionHeader = ({
  badge,
  title,
  subtitle,
  description,
  className = "",
  children,
  actions,
  layout = "default",
}: SectionHeaderProps) => {
  const renderContent = () => (
    <>
      {badge && (
        <div className="mb-4 flex justify-center">
          <Badge
            variant={badge.variant ?? "secondary"}
            className={cn(
              "border-0 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800",
              badge.className
            )}
          >
            {badge.icon && <span className="mr-1">{badge.icon}</span>}
            {badge.text}
          </Badge>
        </div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <h3 className="text-xl font-semibold text-gray-700">{subtitle}</h3>
          )}
        </div>

        {description && (
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:justify-center">
          {actions.primary && (
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={actions.primary.onClick}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {actions.primary.text}
            </Button>
          )}
          {actions.secondary && (
            <Button
              variant="outline"
              size="lg"
              onClick={actions.secondary.onClick}
            >
              {actions.secondary.text}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      {children}
    </>
  );

  const baseClasses = cn("mb-16", className);

  switch (layout) {
    case "card":
      return (
        <div className={baseClasses}>
          <Card className="mx-auto max-w-4xl border-0 bg-white shadow-lg">
            <CardHeader className="pb-6 text-center">
              {badge && (
                <Badge
                  variant={badge.variant ?? "secondary"}
                  className={cn(
                    "mx-auto mb-4 border-0 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800",
                    badge.className
                  )}
                >
                  {badge.icon && <span className="mr-1">{badge.icon}</span>}
                  {badge.text}
                </Badge>
              )}
              <CardTitle className="text-3xl font-bold text-gray-900 md:text-4xl">
                {title}
              </CardTitle>
              {subtitle && (
                <h3 className="text-xl font-semibold text-gray-700">
                  {subtitle}
                </h3>
              )}
            </CardHeader>
            <CardContent className="text-center">
              {description && (
                <CardDescription className="mb-6 text-xl leading-relaxed text-gray-600">
                  {description}
                </CardDescription>
              )}
              {actions && (
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  {actions.primary && (
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      onClick={actions.primary.onClick}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      {actions.primary.text}
                    </Button>
                  )}
                  {actions.secondary && (
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={actions.secondary.onClick}
                    >
                      {actions.secondary.text}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
              {children}
            </CardContent>
          </Card>
        </div>
      );

    case "split":
      return (
        <div
          className={cn(
            baseClasses,
            "grid gap-8 lg:grid-cols-2 lg:items-center"
          )}
        >
          <div className="space-y-6">
            {badge && (
              <Badge
                variant={badge.variant ?? "secondary"}
                className={cn(
                  "border-0 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800",
                  badge.className
                )}
              >
                {badge.icon && <span className="mr-1">{badge.icon}</span>}
                {badge.text}
              </Badge>
            )}
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
                {title}
              </h2>
              {subtitle && (
                <h3 className="text-xl font-semibold text-gray-700">
                  {subtitle}
                </h3>
              )}
              {description && (
                <p className="text-xl leading-relaxed text-gray-600">
                  {description}
                </p>
              )}
            </div>
            {actions && (
              <div className="flex flex-col gap-3 sm:flex-row">
                {actions.primary && (
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    onClick={actions.primary.onClick}
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    {actions.primary.text}
                  </Button>
                )}
                {actions.secondary && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={actions.secondary.onClick}
                  >
                    {actions.secondary.text}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-center lg:justify-end">{children}</div>
        </div>
      );

    case "centered":
    default:
      return (
        <div className={cn(baseClasses, "text-center")}>{renderContent()}</div>
      );
  }
};

export default SectionHeader;
