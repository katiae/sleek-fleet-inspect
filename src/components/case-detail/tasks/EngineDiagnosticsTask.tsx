
import React from "react";
import { Gauge } from "lucide-react";
import { TaskItem } from "./TaskItem";

export const EngineDiagnosticsTask: React.FC = () => {
  return (
    <TaskItem
      icon={<Gauge className="h-7 w-7 text-blue-600" />}
      title="Engine diagnostics check"
      badgeText="In progress"
      badgeVariant="blue"
      buttons={
        <button className="task-card-button text-black bg-white rounded">Continue</button>
      }
    />
  );
};
