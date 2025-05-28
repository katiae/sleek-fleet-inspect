
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Activity } from "lucide-react";

interface ActivityItem {
  action: string;
  case: string;
  time: string;
}

const recentActivity: ActivityItem[] = [
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
    <Card className="flex-1">
      <CardHeader>
        <h3 className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Recent activity
        </h3>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start gap-3 text-sm">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="font-medium">{activity.action}</p>
                <p className="text-gray-600">{activity.case}</p>
                <p className="text-gray-500 text-xs">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
