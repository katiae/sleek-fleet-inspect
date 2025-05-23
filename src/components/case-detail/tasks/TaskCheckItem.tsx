
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

interface TaskCheckItemProps {
  id: string;
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (id: string, checked: boolean) => void;
}

export const TaskCheckItem: React.FC<TaskCheckItemProps> = ({
  id,
  title,
  description,
  checked,
  onCheckedChange,
}) => {
  return (
    <div className="flex items-start gap-3.5 text-sm">
      <Checkbox 
        size="large" 
        checked={checked} 
        onCheckedChange={(checked) => onCheckedChange(id, checked as boolean)}
        className="mt-0.5"
      />
      <div className="flex flex-col gap-1 flex-1">
        <span className={`relative inline-block transition-colors duration-200 w-fit ${
          checked 
            ? 'text-gray-400 after:content-[""] after:absolute after:left-0 after:right-0 after:top-1/2 after:h-[1px] after:bg-gray-400 after:animate-[strikethrough_0.3s_ease-out_forwards] after:w-full' 
            : 'text-gray-900'
        }`}>
          {title}
        </span>
        <span className={`text-xs inline-block transition-colors duration-200 relative w-fit ${
          checked 
            ? 'text-gray-400 after:content-[""] after:absolute after:left-0 after:right-0 after:top-1/2 after:h-[1px] after:bg-gray-400 after:animate-[strikethrough_0.3s_ease-out_forwards] after:w-full' 
            : 'text-gray-500'
        }`}>
          {description}
        </span>
      </div>
    </div>
  );
};
