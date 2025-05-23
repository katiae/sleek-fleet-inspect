
import React from "react";
import { FileCheck } from "lucide-react";
import { TaskItem } from "./TaskItem";
import { TaskCheckItem } from "./TaskCheckItem";

interface EmissionsTestingTaskProps {
  isExpanded: boolean;
  toggleExpanded: () => void;
  checkedTasks: Record<string, boolean>;
  handleTaskCheck: (taskId: string, checked: boolean) => void;
}

export const EmissionsTestingTask: React.FC<EmissionsTestingTaskProps> = ({
  isExpanded,
  toggleExpanded,
  checkedTasks,
  handleTaskCheck,
}) => {
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <TaskItem
      icon={<FileCheck className="h-7 w-7 text-purple-600" />}
      title="Emissions testing"
      badgeText="Pending"
      badgeVariant="purple"
      iconBgColor="bg-purple-50"
      buttons={
        <button 
          className="task-card-button"
          onClick={handleButtonClick}
        >
          Schedule
        </button>
      }
      isExpandable
      isExpanded={isExpanded}
      onToggleExpand={toggleExpanded}
    >
      <div className="mt-4 pt-3 border-t border-gray-100">
        <div className="space-y-4">
          <TaskCheckItem
            id="exhaust"
            title="Check exhaust system"
            description="Inspect exhaust pipes, muffler, and catalytic converter for leaks or damage"
            checked={checkedTasks.exhaust}
            onCheckedChange={handleTaskCheck}
          />
          <TaskCheckItem
            id="obd"
            title="OBD-II diagnostic scan"
            description="Connect scanner to check for engine error codes and system readiness"
            checked={checkedTasks.obd}
            onCheckedChange={handleTaskCheck}
          />
          <TaskCheckItem
            id="gasCap"
            title="Gas cap inspection"
            description="Verify proper seal and check for cracks or damage in the fuel cap"
            checked={checkedTasks.gasCap}
            onCheckedChange={handleTaskCheck}
          />
          <TaskCheckItem
            id="visual"
            title="Visual inspection"
            description="Perform overall visual check of vehicle exterior and engine bay"
            checked={checkedTasks.visual}
            onCheckedChange={handleTaskCheck}
          />
        </div>
      </div>
    </TaskItem>
  );
};
