
import React, { useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar, SidebarSeparator, SidebarGroupLabel, SidebarMenuAction } from "@/components/ui/sidebar";
import { Folder, FileText, CheckSquare, Calendar, Users, CircleDollarSign, PanelLeft, HelpCircle, Plus, Plug, List, Settings, ChevronDown, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCapabilities } from "@/context/CapabilitiesContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const AppSidebar = () => {
  const {
    toggleSidebar,
    state
  } = useSidebar();
  
  const location = useLocation();
  const currentPath = location.pathname;
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [adminSectionOpen, setAdminSectionOpen] = useState(true);
  const [solutionsSectionOpen, setSolutionsSectionOpen] = useState(true);
  
  const { capabilities } = useCapabilities();
  
  // Filter active capabilities by section
  const mainCapabilities = capabilities.filter(cap => cap.active && cap.section === "Main");
  const adminCapabilities = capabilities.filter(cap => cap.active && cap.section === "Administration");
  const solutionCapabilities = capabilities.filter(cap => cap.active && cap.section === "Solutions");

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
            <SidebarMenuItem key={capability.id} className="animate-gradient-pulse rounded-md">
              <SidebarMenuButton tooltip={capability.name} className="py-4">
                {React.cloneElement(capability.icon as React.ReactElement, { className: "h-5 w-5" })}
                <span>{capability.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        {/* Separator between sections */}
        <SidebarSeparator className="my-4" />
        
        {/* Admin section - Now collapsible */}
        <Collapsible open={adminSectionOpen} onOpenChange={setAdminSectionOpen}>
          <CollapsibleTrigger className="w-full flex items-center gap-2 px-2 text-xs font-medium text-sidebar-foreground/70">
            <ChevronDown className="h-4 w-4 transition-transform duration-200" 
              style={{ transform: adminSectionOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }} 
            />
            <span>Administration</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
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
                <SidebarMenuItem key={capability.id} className="animate-gradient-pulse rounded-md">
                  <SidebarMenuButton tooltip={capability.name} className="py-4">
                    {React.cloneElement(capability.icon as React.ReactElement, { className: "h-5 w-5" })}
                    <span>{capability.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </CollapsibleContent>
        </Collapsible>
        
        {/* Solutions section - Now collapsible */}
        <SidebarSeparator className="my-4" />
        <Collapsible open={solutionsSectionOpen} onOpenChange={setSolutionsSectionOpen}>
          <CollapsibleTrigger className="w-full flex items-center gap-2 px-2 text-xs font-medium text-sidebar-foreground/70">
            <ChevronDown className="h-4 w-4 transition-transform duration-200" 
              style={{ transform: solutionsSectionOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
            />
            <span>Solutions</span>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  isActive={currentPath === '/capabilities'} 
                  tooltip="Add Capabilities" 
                  className="py-4"
                  asChild
                >
                  <Link to="/capabilities">
                    <Plus className="text-orange-500" />
                    <span>Add Capabilities</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              {/* Render Solutions section capabilities with animation */}
              {solutionCapabilities.map((capability) => (
                <SidebarMenuItem key={capability.id} className="animate-gradient-pulse rounded-md">
                  <SidebarMenuButton tooltip={capability.name} className="py-4">
                    {React.cloneElement(capability.icon as React.ReactElement, { className: "h-5 w-5" })}
                    <span>{capability.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </CollapsibleContent>
        </Collapsible>
      
        {/* Resources section - No longer fixed to bottom */}
        <SidebarSeparator className="my-4" />
        <SidebarGroupLabel>Resources</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <Popover open={settingsOpen} onOpenChange={setSettingsOpen}>
              <PopoverTrigger asChild>
                <SidebarMenuButton tooltip="Settings" className="py-4">
                  <Settings />
                  <span>Settings</span>
                  <ChevronRight className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </PopoverTrigger>
              <PopoverContent side="right" align="start" sideOffset={5} className="p-2 w-56 shadow-lg bg-white border border-gray-200 rounded-md">
                <div className="flex flex-col gap-1">
                  <button className="flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors">
                    <Plug className="h-4 w-4" />
                    <span>Integrations</span>
                  </button>
                  <Link to="/customize-menu" className="flex items-center gap-2 px-2 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors">
                    <List className="h-4 w-4" />
                    <span>Customise menu</span>
                  </Link>
                </div>
              </PopoverContent>
            </Popover>
          </SidebarMenuItem>
          
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Help" className="py-4">
              <HelpCircle />
              <span>Help</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>;
};
