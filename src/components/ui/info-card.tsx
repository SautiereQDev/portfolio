import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { Progress } from "./progress";
import { Separator } from "./separator";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Calendar, MapPin, ExternalLink } from "lucide-react";
import { cn } from "../../lib/utils";

interface InfoCardProps {
  title: string;
  description: string;
  image?: string;
  initials: string;
  badges?: string[];
  progress?: {
    label: string;
    value: number;
    max: number;
  };
  location?: string;
  date?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

/**
 * Info Card Component using multiple shadcn/ui components
 * Demonstrates how to combine multiple components for complex layouts
 */
export const InfoCard = ({
  title,
  description,
  image,
  initials,
  badges = [],
  progress,
  location,
  date,
  actionLabel,
  actionHref,
  className,
}: InfoCardProps) => {
  return (
    <Card
      className={cn(
        "w-full max-w-md transition-all hover:shadow-lg",
        className
      )}
    >
      <CardHeader className="space-y-4">
        <div className="flex items-start space-x-4">
          <Avatar className="h-12 w-12">
            {image && <AvatarImage src={image} alt={title} />}
            <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <CardTitle className="text-lg leading-tight">{title}</CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
          </div>
        </div>

        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {badges.map((badge, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {badge}
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      {(progress || location || date) && (
        <>
          <Separator />
          <CardContent className="space-y-4 pt-6">
            {progress && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {progress.label}
                  </span>
                  <span className="font-medium">
                    {progress.value}/{progress.max}
                  </span>
                </div>
                <Progress
                  value={(progress.value / progress.max) * 100}
                  className="h-2"
                />
              </div>
            )}

            {(location || date) && (
              <div className="text-muted-foreground flex items-center justify-between text-sm">
                {location && (
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{location}</span>
                  </div>
                )}
                {date && (
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{date}</span>
                  </div>
                )}
              </div>
            )}

            {actionLabel && actionHref && (
              <>
                <Separator />
                <Button asChild variant="outline" className="w-full">
                  <a
                    href={actionHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {actionLabel}
                  </a>
                </Button>
              </>
            )}
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default InfoCard;
