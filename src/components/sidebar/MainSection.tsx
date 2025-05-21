
import React from "react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Folder, FileText, CheckSquare, Calendar } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCapabilities } from "@/context/CapabilitiesContext";

export const MainSection = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { capabilities } = useCapabilities();
  
  // Filter active capabilities by section
  const mainCapabilities = capabilities.filter(cap => cap.active && cap.section === "Main");

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton 
          isActive={currentPath === '/'} 
          tooltip="Cases" 
          className={`py-4 ${currentPath === '/' ? "text-sidebar-foreground font-medium" : ""}`}
          asChild
        >
          <Link to="/">
            <Folder className={currentPath === '/' ? "text-orange-500" : ""} />
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
      
      {/* Render Main section capabilities without animation */}
      {mainCapabilities.map((capability) => (
        <SidebarMenuItem key={capability.id}>
          <SidebarMenuButton tooltip={capability.name} className="py-4">
            {React.cloneElement(capability.icon as React.ReactElement, { className: "h-5 w-5" })}
            <span>{capability.name}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
