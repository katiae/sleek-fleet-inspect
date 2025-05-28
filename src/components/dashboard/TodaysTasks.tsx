import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, CirclePlay, CircleDot, CheckSquare, Wrench } from "lucide-react";
import { TaskCard } from "@/components/shared/TaskCard";
import { ExpandableTaskCard, ExpandableTaskCardData } from "@/components/shared/ExpandableTaskCard";

interface TodaysTasksProps {
  isEmissionsExpanded: boolean;
  toggleEmissionsExpanded: () => void;
  checkedTasks: Record<string, boolean>;
  handleTaskCheck: (taskId: string, checked: boolean) => void;
}

export const TodaysTasks: React.FC<TodaysTasksProps> = ({
  isEmissionsExpanded,
  toggleEmissionsExpanded,
  checkedTasks,
  handleTaskCheck,
}) => {
  const upcomingTasks = [
    {
      id: 1,
      title: "Engine diagnostics check",
      priority: "high" as const,
      badgeText: "In progress",
      badgeVariant: "blue" as const,
      icon: <CirclePlay className="w-6 h-6 text-blue-600" />,
      iconBgColor: "bg-blue-100",
      buttons: <Button variant="outline" size="sm">Continue</Button>
    },
    {
      id: 2,
      title: "Brake system inspection",
      priority: "medium" as const,
      badgeText: "Priority",
      badgeVariant: "amber" as const,
      icon: <CircleDot className="w-6 h-6 text-green-600" />,
      iconBgColor: "bg-green-100",
      buttons: (
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Start</Button>
          <Button variant="outline" size="sm">Schedule</Button>
        </div>
      )
    },
    {
      id: 3,
      title: "Oil change service",
      priority: "low" as const,
      badgeText: "Scheduled",
      badgeVariant: "green" as const,
      icon: <Wrench className="w-6 h-6 text-orange-600" />,
      iconBgColor: "bg-orange-100",
      buttons: <Button variant="outline" size="sm">View details</Button>
    }
  ];

  const emissionsTask: ExpandableTaskCardData = {
    id: "emissions",
    title: "Emissions testing",
    badgeText: "Pending",
    badgeVariant: "purple" as const,
    icon: <CheckSquare className="w-6 h-6 text-purple-600" />,
    iconBgColor: "bg-purple-100",
    buttons: <Button variant="outline" size="sm">Schedule</Button>,
    subTasks: [
      {
        id: "exhaust",
        title: "Exhaust emissions check",
        description: "Check exhaust system for proper emissions levels",
        checked: checkedTasks.exhaust
      },
      {
        id: "obd",
        title: "OBD system verification",
        description: "Verify onboard diagnostics system functionality",
        checked: checkedTasks.obd
      },
      {
        id: "gasCap",
        title: "Gas cap pressure test",
        description: "Test gas cap seal and pressure retention",
        checked: checkedTasks.gasCap
      },
      {
        id: "visual",
        title: "Visual inspection",
        description: "Perform overall visual check of vehicle exterior",
        checked: checkedTasks.visual
      }
    ],
    isExpanded: isEmissionsExpanded,
    onToggleExpand: toggleEmissionsExpanded,
    onTaskCheck: handleTaskCheck
  };

  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Today's tasks
          </h3>
          <Button variant="outline" size="sm">View all tasks</Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          {upcomingTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
          <ExpandableTaskCard task={emissionsTask} />
        </div>
      </CardContent>
    </Card>
  );
};
