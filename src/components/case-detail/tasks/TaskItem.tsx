
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TaskItemProps {
  icon: React.ReactNode;
  title: string;
  badgeText: string;
  badgeVariant: "blue" | "amber" | "purple" | "default" | "secondary" | "destructive" | "outline" | "green";
  buttons: React.ReactNode;
  isExpandable?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  children?: React.ReactNode;
  iconBgColor?: string; // Add an optional prop for custom background color
}

export const TaskItem: React.FC<TaskItemProps> = ({
  icon,
  title,
  badgeText,
  badgeVariant,
  buttons,
  isExpandable = false,
  isExpanded = false,
  onToggleExpand,
  children,
  iconBgColor = "bg-blue-100" // Default to blue-100 if no color is provided
}) => {
  return (
    <div className="border rounded-md p-4 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
      <div 
        className={`flex items-center justify-between ${isExpandable ? 'cursor-pointer' : ''}`}
        onClick={isExpandable ? onToggleExpand : undefined}
      >
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
            {icon}
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-medium text-sm">{title}</span>
            <Badge variant={badgeVariant} className="w-fit mt-0.5 text-xs px-2 py-0.5 rounded-sm">
              {badgeText}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {buttons}
          {isExpandable && (
            <div className="transition-transform duration-300 ease-in-out">
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-gray-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-400" />
              )}
            </div>
          )}
        </div>
      </div>
      
      {isExpandable && (
        <div 
          className={`overflow-hidden transition-all duration-700 ease-out ${
            isExpanded ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
};
