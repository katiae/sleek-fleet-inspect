
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  showViewAllButton?: boolean;
  viewAllButtonText?: string;
  onViewAllClick?: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  title = "Recent activity",
  activities,
  className = "",
  showViewAllButton = false,
  viewAllButtonText = "View all",
  onViewAllClick
}) => {
  return (
    <Card className={`flex-1 ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            {title}
          </h3>
          {showViewAllButton && (
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs"
              onClick={onViewAllClick}
            >
              {viewAllButtonText}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-6 relative pb-4">
          <div className="absolute left-[5px] top-0 bottom-0 w-0.5 bg-gray-200"></div>
          
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start">
              <div className="relative mr-4 flex-shrink-0 mt-1.5">
                <div className="w-3 h-3 rounded-full bg-gray-100 flex items-center justify-center z-10 relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="text-sm font-medium">{activity.action}</h4>
                <p className="text-sm text-gray-500 mt-0.5">{activity.time}</p>
                <p className="text-sm text-gray-600 mt-2">{activity.case}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
