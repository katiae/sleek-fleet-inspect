
import React from "react";
import { Button } from "@/components/ui/button";
import { ActivityCard } from "@/components/shared/ActivityCard";
import { Case } from "@/lib/data";

interface ActivitySectionProps {
  caseItem: Case;
  onNavigateToTab: (tabValue: string) => void;
}

export const ActivitySection: React.FC<ActivitySectionProps> = ({ caseItem, onNavigateToTab }) => {
  const activityItems = [
    {
      action: "Appointment scheduled",
      case: `Appointment set for ${caseItem.appointment?.date}, ${caseItem.appointment?.time}`,
      time: "Today, 10:45 AM"
    },
    {
      action: "Mechanic assigned",
      case: `${caseItem.mechanic?.name} (${caseItem.mechanic?.specialization}) assigned to the case`,
      time: "Yesterday, 3:22 PM"
    },
    {
      action: "Customer confirmed availability",
      case: "",
      time: "Yesterday, 1:15 PM"
    },
    {
      action: "Initial assessment completed",
      case: "",
      time: "May 20, 2025, 9:30 AM"
    },
    {
      action: "Case created",
      case: "",
      time: "May 19, 2025, 4:15 PM"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium">
          Recent Activity
        </h2>
        <button className="view-all-button" onClick={() => onNavigateToTab("activity")}>
          View all activity
        </button>
      </div>
      
      <ActivityCard
        title=""
        activities={activityItems}
        className=""
        hideHeader={true}
      />
    </div>
  );
};
