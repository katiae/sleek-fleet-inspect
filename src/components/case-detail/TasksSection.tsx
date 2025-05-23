
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
        <TaskList
          isEmissionsExpanded={isEmissionsExpanded}
          toggleEmissionsExpanded={toggleEmissionsExpanded}
          checkedTasks={checkedTasks}
          handleTaskCheck={handleTaskCheck}
        />
        
        <div className={`mt-auto transition-opacity duration-300 ${isEmissionsExpanded ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          {!isEmissionsExpanded && <EmptyTasksState />}
        </div>
      </div>
    </div>
  );
};
