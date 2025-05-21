
import React from "react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { FileText, Users, CircleDollarSign, ChevronDown } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useCapabilities } from "@/context/CapabilitiesContext";

export const AdminSection = () => {
  const [adminSectionOpen, setAdminSectionOpen] = React.useState(true);
  const { capabilities } = useCapabilities();
  
  // Filter active capabilities by section
  const adminCapabilities = capabilities.filter(cap => cap.active && cap.section === "Administration");

  return (
    <Collapsible open={adminSectionOpen} onOpenChange={setAdminSectionOpen} className="mt-4">
      <CollapsibleTrigger className="w-full flex items-center gap-2 px-2 text-xs font-medium text-sidebar-foreground/70">
        <ChevronDown className="h-4 w-4 transition-transform duration-200" 
          style={{ transform: adminSectionOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }} 
        />
        <span>Administration</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {/* Added mt-2 for extra spacing after the section title */}
        <SidebarMenu className="mt-2">
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
          
          {/* Render Administration section capabilities without animation */}
          {adminCapabilities.map((capability) => (
            <SidebarMenuItem key={capability.id}>
              <SidebarMenuButton tooltip={capability.name} className="py-4">
                {React.cloneElement(capability.icon as React.ReactElement, { className: "h-5 w-5" })}
                <span>{capability.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </CollapsibleContent>
    </Collapsible>
  );
};
