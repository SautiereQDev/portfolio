import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { AnimatedSection } from "./ui/animated-section";

interface CTASectionProps {
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
  className?: string;
}

/**
 * Reusable CTA Section Component
 * Standardizes call-to-action sections across pages
 */
export const CTASection = ({
  title,
  description,
  primaryCta,
  secondaryCta,
  className = "",
}: CTASectionProps) => {
  return (
    <AnimatedSection
      className={`bg-gradient-to-r from-blue-600 to-purple-600 py-24 ${className}`}
    >
      <div className="container mx-auto px-6 text-center lg:px-8">
        <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
          {description}
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-gray-50"
          >
            <Link to={primaryCta.href}>{primaryCta.text}</Link>
          </Button>
          {secondaryCta && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              <Link to={secondaryCta.href} className="flex items-center gap-2">
                {secondaryCta.text}
                {secondaryCta.icon || <ArrowRight className="h-4 w-4" />}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </AnimatedSection>
  );
};

export default CTASection;
