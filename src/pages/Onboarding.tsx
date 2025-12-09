
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OnboardingTable } from "@/components/onboarding/OnboardingTable";
import { CreateOnboardingSheet } from "@/components/onboarding/CreateOnboardingSheet";
import { sampleOnboardingFlows, OnboardingFlow } from "@/lib/onboarding-data";

const Onboarding = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [flows, setFlows] = useState<OnboardingFlow[]>(sampleOnboardingFlows);

  const handleCreateFlow = (newFlow: OnboardingFlow) => {
    setFlows([...flows, newFlow]);
    setIsCreateOpen(false);
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Onboarding Flows</h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage onboarding flows that are automatically assigned to cases based on product type
                </p>
              </div>
              <Button onClick={() => setIsCreateOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Onboarding
              </Button>
            </div>
            
            <OnboardingTable flows={flows} />
          </main>
        </div>
      </div>
      
      <CreateOnboardingSheet 
        open={isCreateOpen} 
        onOpenChange={setIsCreateOpen}
        onCreateFlow={handleCreateFlow}
      />
    </SidebarProvider>
  );
};

export default Onboarding;
