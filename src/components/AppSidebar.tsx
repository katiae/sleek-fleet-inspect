
import React from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar, SidebarSeparator, SidebarGroupLabel, SidebarFooter } from "@/components/ui/sidebar";
import { Folder, FileText, CheckSquare, Calendar, Users, CircleDollarSign, PanelLeft, HelpCircle, Plus, Plug } from "lucide-react";

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
        {/* Cases section */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive={true} tooltip="Cases" className="data-[active=true]:bg-white py-4">
              <Folder className="text-orange-500" />
              <span>Cases</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Reports" className="py-4">
              <FileText />
              <span>Reports</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Tasks" className="py-4">
              <CheckSquare />
              <span>Tasks</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Availability" className="py-4">
              <Calendar />
              <span>Availability</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        {/* Separator between sections */}
        <SidebarSeparator className="my-4" />
        
        {/* Admin section */}
        <SidebarGroupLabel>Administration</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Audit log" className="py-4">
              <FileText />
              <span>Audit log</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Users" className="py-4">
              <Users />
              <span>Users</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Clients" className="py-4">
              <Users />
              <span>Clients</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Templates" className="py-4">
              <FileText />
              <span>Templates</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Fees" className="py-4">
              <CircleDollarSign />
              <span>Fees</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      
      {/* Resources section - Fixed to bottom */}
      <SidebarFooter className="mt-auto p-4">
        <SidebarGroupLabel>Resources</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Add Capabilities" className="py-4">
              <Plus />
              <span>Add Capabilities</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Integrations" className="py-4">
              <Plug />
              <span>Integrations</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Help" className="py-4">
              <HelpCircle />
              <span>Help</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>;
};
