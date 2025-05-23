
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { TaskList } from "./tasks/TaskList";
import { EmptyTasksState } from "./tasks/EmptyTasksState";

export const TasksSection: React.FC = () => {
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

  // For now, we'll assume there are always tasks, but in a real app
  // this would come from props or context based on the case data
  const hasTasks = true; // This would be dynamic based on case data
  const hasRemainingTasks = !isEmissionsExpanded; // This represents if there are more tasks after current ones

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium">
          Upcoming Tasks
        </h2>
        <Button variant="link" size="sm" className="text-sm text-orange-500">
          See all tasks
        </Button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex-1 flex flex-col">
        {hasTasks ? (
          <>
            <TaskList
              isEmissionsExpanded={isEmissionsExpanded}
              toggleEmissionsExpanded={toggleEmissionsExpanded}
              checkedTasks={checkedTasks}
              handleTaskCheck={handleTaskCheck}
            />
            
            <div className={`mt-auto transition-opacity duration-300 ${isEmissionsExpanded ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
              {hasRemainingTasks && <EmptyTasksState variant="no-more-tasks" />}
            </div>
          </>
        ) : (
          <EmptyTasksState variant="all-caught-up" />
        )}
      </div>
    </div>
  );
};
