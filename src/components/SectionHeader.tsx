import { ReactNode } from "react";
import { Badge } from "./ui/badge";

interface SectionHeaderProps {
  badge: {
    text: string;
    variant?: "default" | "secondary" | "destructive" | "outline";
    className?: string;
  };
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
}

/**
 * Reusable Section Header Component
 * Standardizes section headers with badge, title, and description
 */
export const SectionHeader = ({
  badge,
  title,
  description,
  className = "",
  children,
}: SectionHeaderProps) => {
  return (
    <div className={`mb-16 text-center ${className}`}>
      <Badge
        variant={badge.variant}
        className={`mb-4 border-0 ${badge.className || "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800"}`}
      >
        {badge.text}
      </Badge>
      <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mx-auto max-w-2xl text-xl text-gray-600">{description}</p>
      )}
      {children}
    </div>
  );
};

export default SectionHeader;
