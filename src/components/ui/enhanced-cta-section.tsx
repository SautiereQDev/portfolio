import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "./button";
import { Separator } from "./separator";
import { cn } from "../../lib/utils";

interface EnhancedCTASectionProps {
  title: string;
  description: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta?: {
    text: string;
    href: string;
    icon?: ReactNode;
  };
  badge?: {
    text: string;
    icon?: ReactNode;
  };
  variant?: "default" | "gradient" | "glass";
  showSeparator?: boolean;
  className?: string;
}

/**
 * Enhanced CTA Section Component
 * Reusable call-to-action section with shadcn/ui enhancements
 * Features: badges, multiple variants, separators, and enhanced styling
 */
export const EnhancedCTASection = ({
  title,
  description,
  primaryCta,
  secondaryCta,
  variant = "gradient",
  showSeparator = true,
  className = "",
}: EnhancedCTASectionProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "glass":
        return "bg-gradient-to-r from-slate-50 via-blue-50/50 to-purple-50/50 backdrop-blur-sm border border-blue-200/20";
      case "default":
        return "bg-white";
      case "gradient":
      default:
        return "bg-gradient-to-r from-blue-600 to-purple-600";
    }
  };

  const getTextClasses = () => {
    return variant === "gradient" ? "text-white" : "text-gray-900";
  };

  const getDescriptionClasses = () => {
    return variant === "gradient" ? "text-blue-100" : "text-gray-600";
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden py-24",
        getVariantClasses(),
        className
      )}
    >
      {/* Background decorations for glass variant */}
      {variant === "glass" && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />
          <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-96 w-96 rounded-full bg-purple-400/10 blur-3xl" />
        </>
      )}

      <div className="relative container mx-auto px-6 text-center lg:px-8">
        {/* Title */}
        <h2
          className={cn(
            "mb-6 text-3xl font-bold md:text-4xl",
            getTextClasses()
          )}
        >
          {title}
        </h2>

        {/* Separator */}
        {showSeparator && (
          <div className="mb-6 flex justify-center">
            <Separator
              className={cn(
                "w-24",
                variant === "gradient"
                  ? "bg-white/30"
                  : "bg-gradient-to-r from-blue-500 to-purple-500"
              )}
            />
          </div>
        )}

        {/* Description */}
        <p
          className={cn(
            "mx-auto mb-8 max-w-2xl text-xl",
            getDescriptionClasses()
          )}
        >
          {description}
        </p>

        {/* CTAs */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            variant={variant === "gradient" ? "secondary" : "default"}
            className={cn(
              "px-8 py-4 font-semibold transition-all duration-300 hover:scale-105",
              variant === "gradient"
                ? "bg-white text-blue-600 shadow-lg hover:bg-gray-50"
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
            )}
          >
            <Link to={primaryCta.href} className="flex items-center gap-2">
              {primaryCta.text}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          {secondaryCta && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className={cn(
                "px-8 py-4 font-semibold transition-all duration-300 hover:scale-105",
                variant === "gradient"
                  ? "border-white bg-transparent text-white hover:bg-white hover:text-blue-600"
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              )}
            >
              <Link to={secondaryCta.href} className="flex items-center gap-2">
                {secondaryCta.text}
                {secondaryCta.icon || <ArrowRight className="h-4 w-4" />}
              </Link>
            </Button>
          )}
        </div>

        {/* Enhanced decorative elements */}
        {variant === "gradient" && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2 text-white/60">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm">
                Commençons votre projet dès aujourd&apos;hui
              </span>
              <Sparkles className="h-4 w-4" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
