import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Button } from "./button";
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";
import { useState } from "react";

interface EnhancedAlertProps {
  variant?: "default" | "destructive";
  type?: "success" | "warning" | "info" | "error";
  title?: string;
  description: string;
  dismissible?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

const alertIcons = {
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
  error: AlertCircle,
};

const alertColors = {
  success: "border-green-200 bg-green-50 text-green-800",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-800",
  info: "border-blue-200 bg-blue-50 text-blue-800",
  error: "border-red-200 bg-red-50 text-red-800",
};

/**
 * Enhanced Alert component using shadcn/ui
 * Provides additional features like different types, icons, and dismissible alerts
 */
export const EnhancedAlert = ({
  variant = "default",
  type = "info",
  title,
  description,
  dismissible = false,
  action,
  className,
}: EnhancedAlertProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = alertIcons[type];

  if (!isVisible) return null;

  return (
    <Alert
      variant={variant}
      className={cn(
        "relative w-full p-6",
        type !== "error" && alertColors[type],
        className
      )}
    >
      {/* Header avec icône et bouton de fermeture */}
      <div className="mb-3 flex w-full items-start justify-between">
        <div className="flex items-center space-x-3">
          <Icon className="h-6 w-6 flex-shrink-0" />
          {title && (
            <AlertTitle className="m-0 text-lg font-semibold">
              {title}
            </AlertTitle>
          )}
        </div>
        {dismissible && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 flex-shrink-0 p-0 text-gray-400 hover:text-gray-600"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Description qui prend toute la largeur */}
      <div className="w-full">
        <AlertDescription className="w-full text-base leading-relaxed text-gray-700">
          {description}
        </AlertDescription>
      </div>

      {/* Bouton d'action qui prend toute la largeur */}
      {action && (
        <div className="mt-4 w-full">
          <Button
            size="lg"
            variant="outline"
            onClick={action.onClick}
            className="h-12 w-full border-2 border-green-300 text-base font-medium text-green-700 transition-all duration-300 hover:border-green-400 hover:bg-green-100"
          >
            {action.label}
          </Button>
        </div>
      )}
    </Alert>
  );
};

export default EnhancedAlert;
