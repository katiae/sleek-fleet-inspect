
import React from "react";
import { Car } from "lucide-react";
import { TaskItem } from "./TaskItem";

export const BrakeInspectionTask: React.FC = () => {
  return (
    <TaskItem
      icon={<Car className="h-7 w-7 text-green-600" />}
      title="Brake system inspection"
      badgeText="Priority"
      badgeVariant="amber"
      iconBgColor="bg-green-50"
      buttons={
        <div className="flex gap-2">
          <button className="task-card-button">Start</button>
          <button className="task-card-button">Schedule</button>
        </div>
      }
    />
  );
};
