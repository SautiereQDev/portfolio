import { ArrowRight, Sparkles, Target } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "./button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Badge } from "./badge";
import { Separator } from "./separator";
import { AnimatedSection } from "./animated-section";
import type { CTASectionProps } from "../../types";

/**
 * Enhanced CTA Section Component using shadcn/ui components
 * Features improved visual hierarchy and multiple CTA styles
 */
export const EnhancedCTASection = ({
  title,
  description,
  primaryCta,
  secondaryCta,
  className = "",
}: CTASectionProps) => {
  return (
    <AnimatedSection
      className={`relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-700 py-24 ${className}`}
      animation="fadeIn"
      duration={0.8}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:25px_25px]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 animate-bounce delay-1000">
        <div className="h-2 w-2 rounded-full bg-white/30"></div>
      </div>
      <div className="absolute top-20 right-20 animate-bounce delay-2000">
        <div className="h-3 w-3 rounded-full bg-white/20"></div>
      </div>
      <div className="absolute bottom-20 left-20 animate-bounce delay-500">
        <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* CTA Card */}
          <Card className="border-0 bg-white/10 backdrop-blur-xl">
            <CardHeader className="pb-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                <Target className="h-8 w-8 text-white" />
              </div>
              <Badge className="mx-auto mb-4 bg-white/20 text-white hover:bg-white/30">
                <Sparkles className="mr-1 h-3 w-3" />
                Prêt à démarrer ?
              </Badge>
              <CardTitle className="text-3xl font-bold text-white md:text-4xl">
                {title}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-8 text-center">
              <CardDescription className="mx-auto max-w-2xl text-lg leading-relaxed text-white/90">
                {description}
              </CardDescription>

              <Separator className="bg-white/20" />

              {/* CTA Buttons */}
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="bg-white text-blue-600 transition-all duration-300 hover:scale-105 hover:bg-gray-50"
                >
                  <Link to={primaryCta.href}>
                    <Target className="mr-2 h-5 w-5" />
                    {primaryCta.text}
                  </Link>
                </Button>

                {secondaryCta && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/30 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20"
                  >
                    <Link
                      to={secondaryCta.href}
                      className="flex items-center gap-2"
                    >
                      {secondaryCta.text}
                      {secondaryCta.icon || <ArrowRight className="h-4 w-4" />}
                    </Link>
                  </Button>
                )}
              </div>

              {/* Additional Info */}
              <div className="flex flex-col items-center gap-4 pt-6 sm:flex-row sm:justify-center">
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                  <span>Disponible maintenant</span>
                </div>
                <Separator
                  orientation="vertical"
                  className="hidden h-4 bg-white/20 sm:block"
                />
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <Sparkles className="h-4 w-4" />
                  <span>Réponse sous 24h</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default EnhancedCTASection;
