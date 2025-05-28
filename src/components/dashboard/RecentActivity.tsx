
import React from "react";
import { Button } from "@/components/ui/button";
import { ActivityCard } from "@/components/shared/ActivityCard";

const recentActivity = [
  {
    action: "Completed brake inspection",
    case: "123 Main St",
    time: "1 hour ago"
  },
  {
    action: "Updated case notes",
    case: "456 Oak Ave",
    time: "3 hours ago"
  },
  {
    action: "Scheduled follow-up",
    case: "789 Pine Rd",
    time: "5 hours ago"
  }
];

export const RecentActivity: React.FC = () => {
  return (
    <ActivityCard
      title="Recent activity"
      activities={recentActivity}
      showViewAllButton={true}
      viewAllButtonText="View all activity"
    />
  );
};
