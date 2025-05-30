
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
import { WeeklyInspections } from "@/components/dashboard/WeeklyInspections";

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
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <Navbar />
          <div className="px-11 py-6 space-y-6">
            <DashboardHeader userName={userName} />
            <StatsOverview />

            {/* Grid Layout - Using same responsive approach as StatsOverview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TodaysTasks
                isEmissionsExpanded={isEmissionsExpanded}
                toggleEmissionsExpanded={toggleEmissionsExpanded}
                checkedTasks={checkedTasks}
                handleTaskCheck={handleTaskCheck}
              />
              <AIAssistant
                aiQuery={aiQuery}
                setAiQuery={setAiQuery}
                handleAiSubmit={handleAiSubmit}
              />
              <ActiveCases />
              <QuickNotes notes={notes} setNotes={setNotes} />
            </div>

            {/* Full Width Cards */}
            <div className="grid grid-cols-1 gap-6">
              <WeeklyInspections />
              <RecentActivity />
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
