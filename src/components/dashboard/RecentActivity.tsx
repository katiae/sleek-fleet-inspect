
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
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium">Recent activity</h2>
        <Button variant="link" size="sm" className="text-sm text-orange-500">
          View all activity
        </Button>
      </div>
      
      <ActivityCard
        title=""
        activities={recentActivity}
        className="flex-1"
      />
    </div>
  );
};
