
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
import { DashboardCustomization, DashboardCard } from "@/components/dashboard/DashboardCustomization";

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
  const [customizationOpen, setCustomizationOpen] = useState(false);
  const [dashboardCards, setDashboardCards] = useState<DashboardCard[]>([
    { id: "todaysTasks", label: "Today's tasks", visible: true, description: "View and manage your daily tasks" },
    { id: "aiAssistant", label: "AI assistant", visible: true, description: "Get help with inspections and diagnostics" },
    { id: "activeCases", label: "Active cases", visible: true, description: "Track ongoing inspection cases" },
    { id: "quickNotes", label: "Quick notes", visible: true, description: "Jot down important information" },
    { id: "weeklyInspections", label: "Weekly inspections", visible: true, description: "Overview of inspection trends" },
    { id: "recentActivity", label: "Recent activity", visible: true, description: "Latest updates and actions" }
  ]);

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

  const handleCustomizeView = () => {
    setCustomizationOpen(true);
  };

  const handleCardToggle = (cardId: string) => {
    setDashboardCards(cards => 
      cards.map(card => 
        card.id === cardId ? { ...card, visible: !card.visible } : card
      )
    );
  };

  const handleSaveCustomization = () => {
    console.log("Saving dashboard customization:", dashboardCards);
    setCustomizationOpen(false);
  };

  const handleResetCustomization = () => {
    setDashboardCards(cards => 
      cards.map(card => ({ ...card, visible: true }))
    );
  };

  const getCardVisibility = (cardId: string) => {
    const card = dashboardCards.find(c => c.id === cardId);
    return card?.visible ?? true;
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <Navbar />
          <div className="px-11 py-6 space-y-6">
            <DashboardHeader userName={userName} onCustomizeView={handleCustomizeView} />
            <StatsOverview />

            {/* Grid Layout - Full width on screens < 14inch (1440px), 2 columns on 14inch+ screens */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {getCardVisibility("todaysTasks") && (
                <TodaysTasks
                  isEmissionsExpanded={isEmissionsExpanded}
                  toggleEmissionsExpanded={toggleEmissionsExpanded}
                  checkedTasks={checkedTasks}
                  handleTaskCheck={handleTaskCheck}
                />
              )}
              {getCardVisibility("aiAssistant") && (
                <AIAssistant
                  aiQuery={aiQuery}
                  setAiQuery={setAiQuery}
                  handleAiSubmit={handleAiSubmit}
                />
              )}
              {getCardVisibility("activeCases") && <ActiveCases />}
              {getCardVisibility("quickNotes") && (
                <QuickNotes notes={notes} setNotes={setNotes} />
              )}
            </div>

            {/* Full Width Cards */}
            <div className="grid grid-cols-1 gap-6">
              {getCardVisibility("weeklyInspections") && <WeeklyInspections />}
              {getCardVisibility("recentActivity") && <RecentActivity />}
            </div>
          </div>
        </SidebarInset>
      </div>

      <DashboardCustomization
        isOpen={customizationOpen}
        onOpenChange={setCustomizationOpen}
        cards={dashboardCards}
        onCardToggle={handleCardToggle}
        onSave={handleSaveCustomization}
        onReset={handleResetCustomization}
      />
    </SidebarProvider>
  );
};

export default Dashboard;
