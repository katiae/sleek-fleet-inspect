import React from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { Folder, PanelLeft } from "lucide-react";
export const AppSidebar = () => {
  const {
    toggleSidebar,
    state
  } = useSidebar();
  return <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader>
        <div className={`flex ${state === "collapsed" ? "flex-col" : ""} items-center p-2 ${state === "collapsed" ? "gap-2" : "justify-between"}`}>
          <div className={`flex items-center ${state === "expanded" ? "space-x-2 px-2" : "justify-center"}`}>
            {state === "expanded" ? <>
                <div className="font-semibold text-orange-500">Velocity</div>
                <div className="text-xs text-muted-foreground">InspectPro</div>
              </> : <div className="font-semibold text-orange-500">V</div>}
          </div>
          <button onClick={toggleSidebar} className="rounded-md p-1 hover:bg-gray-100" aria-label="Toggle Sidebar">
            <PanelLeft size={18} className={state === "collapsed" ? "rotate-180" : ""} />
          </button>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive={true} tooltip="Cases" className="data-[active=true]:bg-white">
              <Folder className="text-orange-500" />
              <span>Cases</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>;
};