
import React from "react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Folder, FileText, CheckSquare, Calendar, LayoutDashboard, UserPlus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCapabilities } from "@/context/CapabilitiesContext";

export const MainSection = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { capabilities } = useCapabilities();
  
  // Check if the current path is the home page or a case detail page
  const isCasesActive = currentPath === '/' || currentPath.startsWith('/case/');
  const isDashboardActive = currentPath === '/dashboard';
  
  // Filter active capabilities by section
  const mainCapabilities = capabilities.filter(cap => cap.active && cap.section === "Main");

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton 
          isActive={isDashboardActive} 
          tooltip="Dashboard" 
          className={`py-4 ${isDashboardActive ? "text-sidebar-foreground font-medium !bg-transparent" : ""}`}
          asChild
        >
          <Link to="/dashboard">
            <LayoutDashboard className={isDashboardActive ? "text-orange-500" : ""} />
            <span>Dashboard</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      
      <SidebarMenuItem>
        <SidebarMenuButton 
          isActive={isCasesActive} 
          tooltip="Cases" 
          className={`py-4 ${isCasesActive ? "text-sidebar-foreground font-medium !bg-transparent" : ""}`}
          asChild
        >
          <Link to="/">
            <Folder className={isCasesActive ? "text-orange-500" : ""} />
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
        <SidebarMenuButton 
          isActive={currentPath === '/onboarding'} 
          tooltip="Onboarding" 
          className={`py-4 ${currentPath === '/onboarding' ? "text-sidebar-foreground font-medium !bg-transparent" : ""}`}
          asChild
        >
          <Link to="/onboarding">
            <UserPlus className={currentPath === '/onboarding' ? "text-orange-500" : ""} />
            <span>Onboarding</span>
          </Link>
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
