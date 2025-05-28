
import React, { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Navbar } from "@/components/Navbar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { TodaysTasks } from "@/components/dashboard/TodaysTasks";
import { ActiveCases } from "@/components/dashboard/ActiveCases";
import { AIAssistant } from "@/components/dashboard/AIAssistant";
import { QuickNotes } from "@/components/dashboard/QuickNotes";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

const Dashboard = () => {
  const [aiQuery, setAiQuery] = useState("");
  const [notes, setNotes] = useState("");
  const [userName, setUserName] = useState("John");
  const [isEmissionsExpanded, setIsEmissionsExpanded] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState({
    exhaust: false,
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

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("AI Query:", aiQuery);
    setAiQuery("");
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative bg-gray-50">
        {/* Enhanced blob gradient background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-orange-300/80 via-pink-300/70 to-purple-300/60 rounded-full blur-3xl pointer-events-none z-0"></div>
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-tl from-coral-200/60 via-pink-200/50 to-purple-200/40 rounded-full blur-2xl pointer-events-none z-0"></div>
        
        <AppSidebar />
        <SidebarInset className="flex-1 relative z-10">
          <Navbar />
          <div className="px-11 py-6 space-y-6">
            <DashboardHeader userName={userName} />
            <StatsOverview />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              {/* Left Column */}
              <div className="flex flex-col space-y-6">
                <TodaysTasks
                  isEmissionsExpanded={isEmissionsExpanded}
                  toggleEmissionsExpanded={toggleEmissionsExpanded}
                  checkedTasks={checkedTasks}
                  handleTaskCheck={handleTaskCheck}
                />
                <ActiveCases />
              </div>

              {/* Right Column */}
              <div className="flex flex-col space-y-6">
                <AIAssistant
                  aiQuery={aiQuery}
                  setAiQuery={setAiQuery}
                  handleAiSubmit={handleAiSubmit}
                />
                <QuickNotes notes={notes} setNotes={setNotes} />
                <RecentActivity />
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
