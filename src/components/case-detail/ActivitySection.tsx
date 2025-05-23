
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Case } from "@/lib/data";

interface ActivitySectionProps {
  caseItem: Case;
  onNavigateToTab: (tabValue: string) => void;
}

export const ActivitySection: React.FC<ActivitySectionProps> = ({ caseItem, onNavigateToTab }) => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium">
          Recent Activity
        </h2>
        <Button variant="link" size="sm" className="text-sm text-orange-500" onClick={() => onNavigateToTab("activity")}>
          View all activity
        </Button>
      </div>
      
      <Card className="flex-1">
        <div className="p-4 pt-0 pb-4 h-full">
          <div className="space-y-6 relative pb-4">
            <div className="absolute left-[5px] top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            <div className="flex items-start">
              <div className="relative mr-4 flex-shrink-0 mt-1.5">
                <div className="w-3 h-3 rounded-full bg-gray-100 flex items-center justify-center z-10 relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="text-sm font-medium">Appointment scheduled</h4>
                <p className="text-sm text-gray-500 mt-0.5">Today, 10:45 AM</p>
                <p className="text-sm text-gray-600 mt-2">
                  Appointment set for {caseItem.appointment?.date}, {caseItem.appointment?.time}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="relative mr-4 flex-shrink-0 mt-1.5">
                <div className="w-3 h-3 rounded-full bg-gray-100 flex items-center justify-center z-10 relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="text-sm font-medium">Mechanic assigned</h4>
                <p className="text-sm text-gray-500 mt-0.5">Yesterday, 3:22 PM</p>
                <p className="text-sm text-gray-600 mt-2">
                  {caseItem.mechanic?.name} ({caseItem.mechanic?.specialization}) assigned to the case
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="relative mr-4 flex-shrink-0 mt-1.5">
                <div className="w-3 h-3 rounded-full bg-gray-100 flex items-center justify-center z-10 relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="text-sm font-medium">Customer confirmed availability</h4>
                <p className="text-sm text-gray-500 mt-0.5">Yesterday, 1:15 PM</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="relative mr-4 flex-shrink-0 mt-1.5">
                <div className="w-3 h-3 rounded-full bg-gray-100 flex items-center justify-center z-10 relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="text-sm font-medium">Initial assessment completed</h4>
                <p className="text-sm text-gray-500 mt-0.5">May 20, 2025, 9:30 AM</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="relative mr-4 flex-shrink-0 mt-1.5">
                <div className="w-3 h-3 rounded-full bg-gray-100 flex items-center justify-center z-10 relative">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="text-sm font-medium">Case created</h4>
                <p className="text-sm text-gray-500 mt-0.5">May 19, 2025, 4:15 PM</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
