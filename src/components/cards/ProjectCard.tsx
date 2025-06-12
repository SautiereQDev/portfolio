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
import { ExternalLink, CheckCircle } from "lucide-react";
import { GitHubIcon } from "../ui/icons";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  visit_link?: string;
  github_link: string;
  key_points: string[];
  technos: string[];
}

export const ProjectCard = ({
  title,
  description,
  imageUrl,
  github_link,
  visit_link,
  key_points,
  technos,
}: ProjectCardProps) => {
  return (
    <Card className="group relative overflow-hidden border-0 bg-white/70 shadow-lg backdrop-blur-xl backdrop-saturate-150 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:bg-white/80 hover:shadow-2xl hover:shadow-blue-500/10">
      {/* Glassmorphism effects overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/5 via-transparent to-purple-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Border gradient effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-blue-400/20 via-transparent to-purple-400/20 p-[1px] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="h-full w-full rounded-lg bg-white/70 backdrop-blur-xl" />
      </div>

      {/* Content wrapper */}
      <div className="relative z-10">
        {/* Image avec overlay glassmorphisme */}
        <div className="relative overflow-hidden rounded-t-lg">
          <div className="aspect-video overflow-hidden">
            <img
              src={imageUrl}
              alt={`${title} screenshot`}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
            />
          </div>

          {/* Glassmorphism overlay on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-0 opacity-0 backdrop-blur-[2px] transition-opacity duration-500 group-hover:opacity-30" />

          {/* Badges flottants avec effet glassmorphisme */}
          <div className="absolute top-4 right-4 flex gap-2">
            {visit_link && (
              <Badge className="border border-white/30 bg-white/80 text-gray-900 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/90">
                Live
              </Badge>
            )}
            <Badge className="border border-white/30 bg-white/70 text-gray-700 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-white/80">
              {technos[0]}
            </Badge>
          </div>
        </div>{" "}
        <CardHeader className="relative pb-4">
          <CardTitle className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 group-hover:from-blue-700 group-hover:to-purple-700">
            {title}
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed text-gray-600/90 transition-colors duration-300 group-hover:text-gray-700">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative space-y-6">
          {/* Points clés avec effet glassmorphisme */}
          <div className="space-y-3">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
              <CheckCircle className="h-4 w-4 text-emerald-500 transition-transform duration-300 group-hover:scale-110" />
              Points clés
            </h4>
            <ul className="space-y-2">
              {key_points.slice(0, 3).map((point, index) => (
                <li
                  key={point}
                  className="flex items-start gap-3 text-sm text-gray-600 transition-all duration-300 group-hover:text-gray-700"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-transform duration-300 group-hover:scale-150" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies avec effet glassmorphisme */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {technos.slice(0, 6).map((tech, index) => (
                <Badge
                  key={tech}
                  className="border border-blue-200/50 bg-gradient-to-r from-blue-50/80 to-purple-50/80 text-gray-700 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-blue-300/70 hover:from-blue-100/90 hover:to-purple-100/90"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {tech}
                </Badge>
              ))}
              {technos.length > 6 && (
                <Badge className="border border-gray-200/50 bg-gray-50/80 text-gray-500 backdrop-blur-sm transition-all duration-300 hover:bg-gray-100/90">
                  +{technos.length - 6}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>{" "}
        <CardFooter className="relative flex gap-3 pt-6">
          {visit_link ? (
            <Button
              asChild
              className="flex-1 bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white shadow-lg backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl hover:shadow-blue-500/25"
            >
              <a
                href={visit_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                Visiter
              </a>
            </Button>
          ) : (
            <Button
              disabled
              className="flex-1 cursor-not-allowed bg-gray-300/50 opacity-50 backdrop-blur-sm"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Visiter
            </Button>
          )}

          <Button
            asChild
            className="flex-1 border border-gray-200/50 bg-white/60 text-gray-700 shadow-lg backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-gray-300/70 hover:bg-white/80 hover:shadow-xl"
          >
            <a
              href={github_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <GitHubIcon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
              GitHub
            </a>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default ProjectCard;
