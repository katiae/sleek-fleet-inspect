
import React from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar, SidebarSeparator, SidebarGroupLabel, SidebarFooter } from "@/components/ui/sidebar";
import { Folder, FileText, CheckSquare, Calendar, Users, CircleDollarSign, PanelLeft, HelpCircle, Plus, Plug } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCapabilities } from "@/context/CapabilitiesContext";

export const AppSidebar = () => {
  const {
    toggleSidebar,
    state
  } = useSidebar();
  
  const location = useLocation();
  const currentPath = location.pathname;
  
  const { capabilities } = useCapabilities();
  
  // Filter active capabilities by section
  const mainCapabilities = capabilities.filter(cap => cap.active && cap.section === "Main");
  const adminCapabilities = capabilities.filter(cap => cap.active && cap.section === "Administration");

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
            <SidebarMenuButton 
              isActive={currentPath === '/'} 
              tooltip="Cases" 
              className="py-4"
              asChild
            >
              <Link to="/">
                <Folder />
                <span>Cases</span>
              </Link>
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
          
          {/* Render Main section capabilities with animation */}
          {mainCapabilities.map((capability) => (
            <SidebarMenuItem key={capability.id} className="animate-gradient-pulse">
              <SidebarMenuButton tooltip={capability.name} className="py-4">
                {React.cloneElement(capability.icon as React.ReactElement, { className: "h-5 w-5" })}
                <span>{capability.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
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
          
          {/* Render Administration section capabilities with animation */}
          {adminCapabilities.map((capability) => (
            <SidebarMenuItem key={capability.id} className="animate-gradient-pulse">
              <SidebarMenuButton tooltip={capability.name} className="py-4">
                {React.cloneElement(capability.icon as React.ReactElement, { className: "h-5 w-5" })}
                <span>{capability.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      
      {/* Resources section - Fixed to bottom */}
      <SidebarFooter className="mt-auto p-4">
        <SidebarSeparator className="mb-4" />
        <SidebarGroupLabel>Resources</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              isActive={currentPath === '/capabilities'} 
              tooltip="Add Capabilities" 
              className="data-[active=true]:bg-white py-4"
              asChild
            >
              <Link to="/capabilities">
                <Plus className="text-orange-500" />
                <span>Add Capabilities</span>
              </Link>
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
