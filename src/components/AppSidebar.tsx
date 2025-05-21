
import React from "react";
import { Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar";
import { 
  MainSection, 
  AdminSection, 
  ResourcesSection 
} from "@/components/sidebar";
import { SidebarHeaderComponent } from "@/components/sidebar/SidebarHeader";

export const AppSidebar = () => {
  const { state } = useSidebar();
  
  return <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeaderComponent />
      <SidebarContent className="p-4">
        {/* Cases section */}
        <MainSection />
        
        {/* Admin section - Collapsible */}
        <AdminSection />
      
        {/* Resources section */}
        <ResourcesSection />
      </SidebarContent>
    </Sidebar>;
};
