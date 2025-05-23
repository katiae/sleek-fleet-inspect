
import React from "react";
import { EngineDiagnosticsTask } from "./EngineDiagnosticsTask";
import { BrakeInspectionTask } from "./BrakeInspectionTask";
import { EmissionsTestingTask } from "./EmissionsTestingTask";

interface TaskListProps {
  isEmissionsExpanded: boolean;
  toggleEmissionsExpanded: () => void;
  checkedTasks: Record<string, boolean>;
  handleTaskCheck: (taskId: string, checked: boolean) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  isEmissionsExpanded,
  toggleEmissionsExpanded,
  checkedTasks,
  handleTaskCheck,
}) => {
  return (
    <div className="space-y-3 mb-3">
      <EngineDiagnosticsTask />
      <BrakeInspectionTask />
      <EmissionsTestingTask
        isExpanded={isEmissionsExpanded}
        toggleExpanded={toggleEmissionsExpanded}
        checkedTasks={checkedTasks}
        handleTaskCheck={handleTaskCheck}
      />
    </div>
  );
};
