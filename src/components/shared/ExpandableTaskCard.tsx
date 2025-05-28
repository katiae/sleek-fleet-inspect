import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TaskCheckItem } from "@/components/case-detail/tasks/TaskCheckItem";
import { Separator } from "@/components/ui/separator";

export interface SubTask {
  id: string;
  title: string;
  description: string;
  checked: boolean;
}

export interface ExpandableTaskCardData {
  id: number | string;
  title: string;
  badgeText: string;
  badgeVariant: "blue" | "amber" | "purple" | "default" | "secondary" | "destructive" | "outline" | "green";
  icon: React.ReactNode;
  iconBgColor: string;
  buttons: React.ReactNode;
  subTasks: SubTask[];
  isExpanded: boolean;
  onToggleExpand: () => void;
  onTaskCheck: (taskId: string, checked: boolean) => void;
}

interface ExpandableTaskCardProps {
  task: ExpandableTaskCardData;
  className?: string;
}

export const ExpandableTaskCard: React.FC<ExpandableTaskCardProps> = ({ 
  task, 
  className = "" 
}) => {
  return (
    <div className={`border rounded-md p-4 shadow-sm bg-white hover:shadow-md transition-shadow duration-200 ${className}`}>
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={task.onToggleExpand}
      >
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 ${task.iconBgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
            {task.icon}
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-medium text-sm">{task.title}</span>
            <Badge variant={task.badgeVariant} className="w-fit mt-0.5 text-xs px-2 py-0.5 rounded-sm">
              {task.badgeText}
            </Badge>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {task.buttons}
          <div className="transition-transform duration-700 ease-out">
            {task.isExpanded ? (
              <ChevronUp className="h-4 w-4 text-gray-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </div>
        </div>
      </div>
      
      {/* Expandable content within the same card */}
      <div 
        className={`overflow-hidden transition-all duration-700 ease-out ${
          task.isExpanded ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0 mt-0'
        }`}
      >
        <Separator className="mb-4" />
        <div className="pl-[60px] space-y-3">
          {task.subTasks.map((subTask) => (
            <TaskCheckItem
              key={subTask.id}
              id={subTask.id}
              title={subTask.title}
              description={subTask.description}
              checked={subTask.checked}
              onCheckedChange={task.onTaskCheck}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
