
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Activity } from "lucide-react";

interface ActivityItem {
  action: string;
  case: string;
  time: string;
}

interface ActivityCardProps {
  title?: string;
  activities: ActivityItem[];
  className?: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  title = "Recent activity",
  activities,
  className = ""
}) => {
  return (
    <Card className={`flex-1 ${className}`}>
      <CardHeader>
        <h3 className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          {title}
        </h3>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-3">
          {activities.map((activity, index) => (
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
