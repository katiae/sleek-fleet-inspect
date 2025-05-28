
import React from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TaskCard, TaskCardData } from "@/components/shared/TaskCard";

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
  iconBgColor?: string;
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
  iconBgColor = "bg-blue-100"
}) => {
  const taskData: TaskCardData = {
    id: title,
    title,
    priority: "medium", // Default priority for case detail tasks
    badgeText,
    badgeVariant,
    icon,
    iconBgColor,
    buttons: (
      <div className="flex items-center gap-2">
        {buttons}
        {isExpandable && (
          <div className="transition-transform duration-700 ease-out">
            {isExpanded ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </div>
        )}
      </div>
    )
  };

  return (
    <div>
      <div 
        className={isExpandable ? 'cursor-pointer' : ''}
        onClick={isExpandable ? onToggleExpand : undefined}
      >
        <TaskCard task={taskData} />
      </div>
      
      {isExpandable && (
        <div 
          className={`overflow-hidden transition-all duration-700 ease-out ${
            isExpanded ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0 mt-0'
          }`}
        >
          {children}
        </div>
      )}
    </div>
  );
};
