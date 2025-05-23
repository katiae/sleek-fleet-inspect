
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Gauge, Car, FileCheck, PartyPopper, ChevronDown, ChevronUp } from "lucide-react";

export const TasksSection: React.FC = () => {
  const [isEmissionsExpanded, setIsEmissionsExpanded] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState({
    exhaust: true,
    obd: false,
    gasCap: false,
    visual: false
  });

  const toggleEmissionsExpanded = () => {
    setIsEmissionsExpanded(!isEmissionsExpanded);
  };

  const handleTaskCheck = (taskId: string, checked: boolean) => {
    setCheckedTasks(prev => ({
      ...prev,
      [taskId]: checked
    }));
  };

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
              <button className="task-card-button text-black bg-white rounded">Continue</button>
            </div>
          </div>
          
          <div className="border rounded-md p-4 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Car className="h-7 w-7 text-green-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-sm">Brake system inspection</span>
                  <Badge variant="amber" className="w-fit mt-0.5 text-xs px-2 py-0.5 rounded-sm">Priority</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="task-card-button">Start</button>
                <button className="task-card-button">Schedule</button>
              </div>
            </div>
          </div>
          
          <div className="border rounded-md p-4 shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={toggleEmissionsExpanded}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileCheck className="h-7 w-7 text-purple-600" />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-medium text-sm">Emissions testing</span>
                  <Badge variant="purple" className="w-fit mt-0.5 text-xs px-2 py-0.5 rounded-sm">Pending</Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  className="task-card-button"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  Schedule
                </button>
                <div className="transition-transform duration-300 ease-in-out">
                  {isEmissionsExpanded ? (
                    <ChevronUp className="h-4 w-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  )}
                </div>
              </div>
            </div>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isEmissionsExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="space-y-4">
                  <div className="flex items-center gap-3.5 text-sm">
                    <Checkbox 
                      size="large" 
                      checked={checkedTasks.exhaust} 
                      onCheckedChange={(checked) => handleTaskCheck('exhaust', checked as boolean)}
                    />
                    <span className={`relative transition-colors duration-200 ${
                      checkedTasks.exhaust 
                        ? 'text-gray-400 after:content-[""] after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-gray-400 after:w-full after:animate-[strikethrough_0.3s_ease-out_forwards]' 
                        : 'text-gray-900 after:content-[""] after:absolute after:right-0 after:top-1/2 after:h-[1px] after:bg-gray-400 after:animate-[unstrikethrough_0.3s_ease-out_forwards]'
                    }`}>
                      Check exhaust system
                    </span>
                  </div>
                  <div className="flex items-center gap-3.5 text-sm">
                    <Checkbox 
                      size="large" 
                      checked={checkedTasks.obd} 
                      onCheckedChange={(checked) => handleTaskCheck('obd', checked as boolean)}
                    />
                    <span className={`relative transition-colors duration-200 ${
                      checkedTasks.obd 
                        ? 'text-gray-400 after:content-[""] after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-gray-400 after:w-full after:animate-[strikethrough_0.3s_ease-out_forwards]' 
                        : 'text-gray-900 after:content-[""] after:absolute after:right-0 after:top-1/2 after:h-[1px] after:bg-gray-400 after:animate-[unstrikethrough_0.3s_ease-out_forwards]'
                    }`}>
                      OBD-II diagnostic scan
                    </span>
                  </div>
                  <div className="flex items-center gap-3.5 text-sm">
                    <Checkbox 
                      size="large" 
                      checked={checkedTasks.gasCap} 
                      onCheckedChange={(checked) => handleTaskCheck('gasCap', checked as boolean)}
                    />
                    <span className={`relative transition-colors duration-200 ${
                      checkedTasks.gasCap 
                        ? 'text-gray-400 after:content-[""] after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-gray-400 after:w-full after:animate-[strikethrough_0.3s_ease-out_forwards]' 
                        : 'text-gray-900 after:content-[""] after:absolute after:right-0 after:top-1/2 after:h-[1px] after:bg-gray-400 after:animate-[unstrikethrough_0.3s_ease-out_forwards]'
                    }`}>
                      Gas cap inspection
                    </span>
                  </div>
                  <div className="flex items-center gap-3.5 text-sm">
                    <Checkbox 
                      size="large" 
                      checked={checkedTasks.visual} 
                      onCheckedChange={(checked) => handleTaskCheck('visual', checked as boolean)}
                    />
                    <span className={`relative transition-colors duration-200 ${
                      checkedTasks.visual 
                        ? 'text-gray-400 after:content-[""] after:absolute after:left-0 after:top-1/2 after:h-[1px] after:bg-gray-400 after:w-full after:animate-[strikethrough_0.3s_ease-out_forwards]' 
                        : 'text-gray-900 after:content-[""] after:absolute after:right-0 after:top-1/2 after:h-[1px] after:bg-gray-400 after:animate-[unstrikethrough_0.3s_ease-out_forwards]'
                    }`}>
                      Visual inspection
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center mt-auto bg-gray-100 rounded-md py-3 text-gray-400">
          <PartyPopper className="h-6 w-6 text-gray-600 mb-2" />
          <p className="text-sm text-gray-600 text-center">You don't have any more upcoming tasks</p>
        </div>
      </div>
    </div>;
};
