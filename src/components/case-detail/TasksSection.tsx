
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { TaskList } from "./tasks/TaskList";
import { EmptyTasksState } from "./tasks/EmptyTasksState";
import { Case } from "@/lib/data";

interface TasksSectionProps {
  caseItem: Case;
}

export const TasksSection: React.FC<TasksSectionProps> = ({ caseItem }) => {
  const [isEmissionsExpanded, setIsEmissionsExpanded] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState({
    exhaust: true,
    obd: false,
    gasCap: false,
    visual: false
  });

  const toggleEmissionsExpanded = () => {
    setIsEmissionsExpanded(!isEmissionsExpanded);
  };

  const handleTaskCheck = (taskId: string, checked: boolean) => {
    setCheckedTasks(prev => ({
      ...prev,
      [taskId]: checked
    }));
  };

  // Determine if this case has tasks - for demo purposes, only the first case has tasks
  const hasTasks = caseItem.address === "42 Baker Street, London, NW1 6XE";
  const hasRemainingTasks = !isEmissionsExpanded;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium">
          Upcoming Tasks
        </h2>
        <Button variant="link" size="sm" className="text-sm text-orange-500">
          See all tasks
        </Button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-col">
        {hasTasks ? (
          <>
            <TaskList
              isEmissionsExpanded={isEmissionsExpanded}
              toggleEmissionsExpanded={toggleEmissionsExpanded}
              checkedTasks={checkedTasks}
              handleTaskCheck={handleTaskCheck}
            />
            
            {hasRemainingTasks && (
              <div className="mt-3">
                <EmptyTasksState variant="no-more-tasks" className="w-full" />
              </div>
            )}
          </>
        ) : (
          <EmptyTasksState variant="all-caught-up" className="w-full" />
        )}
      </div>
    </div>
  );
};
