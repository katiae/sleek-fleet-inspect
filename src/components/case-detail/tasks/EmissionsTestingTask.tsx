
import React from "react";
import { FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExpandableTaskCard, ExpandableTaskCardData } from "@/components/shared/ExpandableTaskCard";

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

  const emissionsTaskData: ExpandableTaskCardData = {
    id: "emissions",
    title: "Emissions testing",
    badgeText: "Pending",
    badgeVariant: "purple",
    icon: <FileCheck className="h-6 w-6 text-purple-600" />,
    iconBgColor: "bg-purple-100",
    buttons: (
      <Button 
        variant="outline" 
        size="sm"
        onClick={handleButtonClick}
      >
        Schedule
      </Button>
    ),
    subTasks: [
      {
        id: "exhaust",
        title: "Check exhaust system",
        description: "Inspect exhaust pipes, muffler, and catalytic converter for leaks or damage",
        checked: checkedTasks.exhaust
      },
      {
        id: "obd",
        title: "OBD-II diagnostic scan",
        description: "Connect scanner to check for engine error codes and system readiness",
        checked: checkedTasks.obd
      },
      {
        id: "gasCap",
        title: "Gas cap inspection",
        description: "Verify proper seal and check for cracks or damage in the fuel cap",
        checked: checkedTasks.gasCap
      },
      {
        id: "visual",
        title: "Visual inspection",
        description: "Perform overall visual check of vehicle exterior and engine bay",
        checked: checkedTasks.visual
      }
    ],
    isExpanded,
    onToggleExpand: toggleExpanded,
    onTaskCheck: handleTaskCheck
  };

  return <ExpandableTaskCard task={emissionsTaskData} />;
};
