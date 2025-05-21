
import React from "react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Plus, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useCapabilities } from "@/context/CapabilitiesContext";

export const SolutionsSection = () => {
  const [solutionsSectionOpen, setSolutionsSectionOpen] = React.useState(true);
  const location = useLocation();
  const currentPath = location.pathname;
  const { capabilities } = useCapabilities();
  
  // Filter active capabilities by section
  const solutionCapabilities = capabilities.filter(cap => cap.active && cap.section === "Solutions");

  return (
    <Collapsible open={solutionsSectionOpen} onOpenChange={setSolutionsSectionOpen}>
      <CollapsibleTrigger className="w-full flex items-center gap-2 px-2 text-xs font-medium text-sidebar-foreground/70">
        <ChevronDown className="h-4 w-4 transition-transform duration-200" 
          style={{ transform: solutionsSectionOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }}
        />
        <span>Solutions</span>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {/* Added mt-2 for extra spacing after the section title */}
        <SidebarMenu className="mt-2">
          {/* Render Solutions section capabilities without animation */}
          {solutionCapabilities.map((capability) => (
            <SidebarMenuItem key={capability.id}>
              <SidebarMenuButton tooltip={capability.name} className="py-4">
                {React.cloneElement(capability.icon as React.ReactElement, { className: "h-5 w-5" })}
                <span>{capability.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          
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
        </SidebarMenu>
      </CollapsibleContent>
    </Collapsible>
  );
};
