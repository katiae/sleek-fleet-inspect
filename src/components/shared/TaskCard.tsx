
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface TaskCardData {
  id: number | string;
  title: string;
  priority: "high" | "medium" | "low";
  dueTime?: string;
  status?: string;
  case?: string;
  badgeText?: string;
  badgeVariant?: "blue" | "amber" | "purple" | "default" | "secondary" | "destructive" | "outline" | "green";
  icon?: React.ReactNode;
  iconBgColor?: string;
  buttons?: React.ReactNode;
}

interface TaskCardProps {
  task: TaskCardData;
  className?: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, className = "" }) => {
  const getPriorityBadgeVariant = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'destructive' as const;
      case 'medium':
        return 'default' as const;
      case 'low':
        return 'secondary' as const;
      default:
        return 'secondary' as const;
    }
  };

  const getPriorityIconBg = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100';
      case 'medium':
        return 'bg-amber-100';
      case 'low':
        return 'bg-blue-100';
      default:
        return 'bg-blue-100';
    }
  };

  const iconBgColor = task.iconBgColor || getPriorityIconBg(task.priority);
  const badgeVariant = task.badgeVariant || getPriorityBadgeVariant(task.priority);
  const badgeText = task.badgeText || `${task.priority} priority`;

  return (
    <div className={`border rounded-md p-4 shadow-sm bg-white hover:shadow-md transition-shadow duration-200 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
            {task.icon}
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-medium text-sm">{task.title}</span>
            <Badge variant={badgeVariant} className="w-fit mt-0.5 text-xs px-2 py-0.5 rounded-sm">
              {badgeText}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {task.buttons || (
            task.dueTime && (
              <Button variant="outline" size="sm" className="task-card-button">
                {task.dueTime}
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
};
