
import React from "react";
import { 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { Folder } from "lucide-react";

export const AppSidebar = () => {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center p-2">
          <div className="flex items-center space-x-2 px-2">
            <div className="font-semibold text-orange-500">Vantage</div>
            <div className="text-xs text-muted-foreground">CaseManager</div>
          </div>
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
