import { Button } from "./button";
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";
import { useState } from "react";

interface CustomAlertProps {
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

const alertStyles = {
  success: "bg-green-50 border-green-200 text-green-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
  error: "bg-red-50 border-red-200 text-red-800",
};

/**
 * Custom Alert component - Simple and robust design
 */
export const CustomAlert = ({
  type = "info",
  title,
  description,
  dismissible = false,
  action,
  className,
}: CustomAlertProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const Icon = alertIcons[type];

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "w-full rounded-lg border p-6",
        alertStyles[type],
        className
      )}
    >
      {/* Header avec icône et bouton de fermeture */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6 flex-shrink-0" />
          {title && (
            <h3 className="text-lg leading-tight font-semibold">{title}</h3>
          )}
        </div>
        {dismissible && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Description */}
      <div className="mb-6">
        <p className="text-base leading-relaxed">{description}</p>
      </div>

      {/* Bouton d'action */}
      {action && (
        <div className="w-full">
          <Button
            size="lg"
            variant="outline"
            onClick={action.onClick}
            className="h-12 w-full border-2 border-current bg-white/50 text-base font-medium transition-all duration-300 hover:bg-white/80"
          >
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomAlert;
