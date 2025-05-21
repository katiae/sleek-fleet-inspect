
import React from "react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarGroupLabel } from "@/components/ui/sidebar";
import { Settings, HelpCircle, ChevronRight, Plug, List } from "lucide-react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export const ResourcesSection = () => {
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  return (
    <>
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
    </>
  );
};
