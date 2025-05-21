
import React from "react";
import { 
  SidebarProvider, 
  SidebarInset,
} from "@/components/ui/sidebar";
import { Navbar } from "@/components/Navbar";
import { AppSidebar } from "@/components/AppSidebar";

interface CaseManagerProps {
  children?: React.ReactNode;
}

export const CaseManager: React.FC<CaseManagerProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-gray-50">
        <AppSidebar />
        <SidebarInset>
          <Navbar />
          <div className="px-8 py-6 max-w-7xl mx-auto">
            {children || <div>Loading...</div>}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};
