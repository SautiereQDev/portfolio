import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Button } from "./button";
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";
import { useState } from "react";

interface CustomAlertProps {
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
 * Custom Alert component using shadcn/ui
 * Provides additional features like different types, icons, and dismissible alerts
 */
export const CustomAlert = ({
  variant = "default",
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
    <Alert
      variant={variant}
      className={cn(
        "relative",
        type !== "error" && alertColors[type],
        className
      )}
    >
      <div className="flex items-start space-x-3">
        <Icon className="mt-0.5 h-5 w-5 flex-shrink-0" />
        <div className="min-w-0 flex-1">
          {title && <AlertTitle className="mb-1">{title}</AlertTitle>}
          <AlertDescription className="text-sm">{description}</AlertDescription>
          {action && (
            <div className="mt-3">
              <Button
                size="sm"
                variant="outline"
                onClick={action.onClick}
                className="h-8"
              >
                {action.label}
              </Button>
            </div>
          )}
        </div>
        {dismissible && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Alert>
  );
};

export default CustomAlert;
