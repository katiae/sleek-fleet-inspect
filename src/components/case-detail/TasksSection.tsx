import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gauge, Car, FileCheck, PartyPopper } from "lucide-react";
export const TasksSection: React.FC = () => {
  return <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium">
          Upcoming Tasks
        </h2>
        <Button variant="link" size="sm" className="text-sm text-orange-500">
          See all tasks
        </Button>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 flex-1 flex flex-col">
        <div className="space-y-3 mb-3">
          <div className="border rounded-md p-4 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Gauge className="h-7 w-7 text-blue-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-sm">Engine diagnostics check</span>
                  <Badge variant="blue" className="w-fit mt-0.5 text-xs px-2 py-0.5 rounded-sm">In progress</Badge>
                </div>
              </div>
              <Button variant="secondary" size="sm" className="text-xs">Continue</Button>
            </div>
          </div>
          
          <div className="border rounded-md p-4 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Car className="h-7 w-7 text-green-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-sm">Brake system inspection</span>
                  <Badge variant="amber" className="w-fit mt-0.5 text-xs px-2 py-0.5 rounded-sm">Priority</Badge>
                </div>
              </div>
              <Button variant="secondary" size="sm" className="text-xs">Start</Button>
            </div>
          </div>
          
          <div className="border rounded-md p-4 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileCheck className="h-7 w-7 text-purple-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-sm">Emissions testing</span>
                  <Badge variant="purple" className="w-fit mt-0.5 text-xs px-2 py-0.5 rounded-sm">Pending</Badge>
                </div>
              </div>
              <Button variant="secondary" size="sm" className="text-xs">Schedule</Button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center mt-auto bg-gray-100 rounded-md py-3">
          <PartyPopper className="h-6 w-6 text-gray-600 mb-2" />
          <p className="text-sm text-gray-600 text-center">You don't have any more upcoming tasks</p>
        </div>
      </div>
    </div>;
};