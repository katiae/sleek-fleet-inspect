
import React from "react";
import { 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar";
import { ChevronLeft, Folder } from "lucide-react";

export const AppSidebar = () => {
  const { toggleSidebar } = useSidebar();
  
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-2 px-2">
            <div className="font-semibold text-orange-500">Velocity</div>
            <div className="text-xs text-muted-foreground">InspectPro</div>
          </div>
          <button 
            onClick={toggleSidebar}
            className="rounded-md p-1 hover:bg-gray-100"
            aria-label="Toggle Sidebar"
          >
            <ChevronLeft size={18} />
          </button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive={true}>
              <Folder className="text-orange-500" />
              <span>Cases</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};
