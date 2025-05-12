
import React from "react";
import { 
  SidebarProvider, 
  SidebarInset,
} from "@/components/ui/sidebar";
import { Navbar } from "@/components/Navbar";
import { AppSidebar } from "@/components/AppSidebar";
import { CaseList } from "@/components/CaseList";

export const CaseManager = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-gray-50">
        <AppSidebar />
        <SidebarInset>
          <Navbar />
          <div className="p-6">
            <CaseList />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
