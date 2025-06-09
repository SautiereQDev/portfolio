import { ProjectCardProps } from "./ProjectCard.types.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ExternalLink, Github, CheckCircle } from "lucide-react";
import { AnimatedSection } from "../ui/animated-section";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export const ProjectCard = ({
  title,
  description,
  imageUrl,
  github_link,
  visit_link,
  key_points,
  technos,
}: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;

    if (!card || !image) return;

    // Animation au hover
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.02,
        y: -10,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(image, {
        scale: 1.1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(image, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <AnimatedSection animation="slideUp" className="w-full">

      <Card
        ref={cardRef}
        className="group overflow-hidden border-0 bg-gradient-to-br from-white to-gray-50/50 transition-all duration-300 hover:border-primary/20"
      >
        {/* Image avec overlay gradient */}
        <div className="relative overflow-hidden rounded-t-lg">
          <div className="aspect-video overflow-hidden">
            <img
              ref={imageRef}
              src={imageUrl}
              alt={`${title} screenshot`}
              className="h-full w-full object-cover transition-transform duration-300"
            />
          </div>
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Badges flottants */}
          <div className="absolute top-4 right-4 flex gap-2">

            {visit_link && (
              <Badge variant="secondary" className="bg-white/90 text-gray-900">
                Live
              </Badge>
            )}
            <Badge variant="outline" className="bg-white/90 border-white/50">
              {technos[0]}
            </Badge>
          </div>
        </div>

        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            {title}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed text-gray-600">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Points clés avec icônes */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              Points clés
            </h4>
            <ul className="space-y-2">
              {key_points.slice(0, 3).map((point, index) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm text-gray-600"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex-shrink-0" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {technos.slice(0, 6).map((tech, index) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 border border-blue-100 hover:border-blue-200 transition-colors duration-200"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {tech}
                </Badge>
              ))}
              {technos.length > 6 && (
                <Badge variant="outline" className="text-gray-500">
                  +{technos.length - 6}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-3 pt-6">
          {visit_link ? (
            <Button
              asChild
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <a
                href={visit_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Visiter
              </a>
            </Button>
          ) : (
            <Button disabled className="flex-1 opacity-50 cursor-not-allowed">
              <ExternalLink className="h-4 w-4 mr-2" />
              Visiter
            </Button>
          )}

          <Button
            asChild
            variant="outline"
            className="flex-1 border-gray-200 hover:bg-gray-50 transition-all duration-300 hover:border-gray-300"
          >
            <a
              href={github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
        </CardFooter>
      </Card>
    </AnimatedSection>
  );
};

export default ProjectCard;
