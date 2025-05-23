
import React from "react";
import { PartyPopper } from "lucide-react";

interface EmptyTasksStateProps {
  variant?: "no-more-tasks" | "all-caught-up";
  className?: string;
}

export const EmptyTasksState: React.FC<EmptyTasksStateProps> = ({ 
  variant = "no-more-tasks",
  className = ""
}) => {
  const isAllCaughtUp = variant === "all-caught-up";
  
  return (
    <div className={`flex flex-col items-center justify-center w-full h-full bg-gray-100 rounded-md py-3 text-gray-400 animate-fade-in ${className}`}>
      <PartyPopper className="h-6 w-6 text-gray-600 mb-2" />
      <p className="text-sm text-gray-600 text-center">
        {isAllCaughtUp 
          ? "You're all caught up! No tasks to complete right now" 
          : "You don't have any more upcoming tasks"
        }
      </p>
    </div>
  );
};
