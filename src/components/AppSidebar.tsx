
import React, { useEffect, useState } from "react";
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, useSidebar, SidebarSeparator, SidebarGroupLabel, SidebarFooter } from "@/components/ui/sidebar";
import { Folder, FileText, CheckSquare, Calendar, Users, CircleDollarSign, PanelLeft, HelpCircle, Plus, Plug, List } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCapabilities } from "@/context/CapabilitiesContext";
import { useMenu } from "@/context/MenuContext";

export const AppSidebar = () => {
  const {
    toggleSidebar,
    state
  } = useSidebar();
  
  const location = useLocation();
  const currentPath = location.pathname;
  
  const { capabilities } = useCapabilities();
  const { menuItems } = useMenu();
  const [animatedItems, setAnimatedItems] = useState<Set<string>>(new Set());
  
  // Filter menu items by section
  const mainItems = menuItems.filter(item => item.section === "Main");
  const adminItems = menuItems.filter(item => item.section === "Administration");
  const resourceItems = menuItems.filter(item => item.section === "Resources");
  
  // Mark analytics item as animated after it's been displayed once
  useEffect(() => {
    const analyticsItem = menuItems.find(item => item.id === 'analytics' && item.isNew);
    
    if (analyticsItem && !animatedItems.has('analytics')) {
      // Wait for animation to complete before adding to animated items
      const timer = setTimeout(() => {
        setAnimatedItems(prev => new Set(prev).add('analytics'));
      }, 1000); // Animation duration
      
      return () => clearTimeout(timer);
    }
  }, [menuItems, animatedItems]);

  // Function to determine if an item should be animated
  const shouldAnimate = (itemId: string) => {
    if (itemId !== 'analytics') return false;
    const item = menuItems.find(item => item.id === itemId);
    return item?.isNew === true && !animatedItems.has(itemId);
  };

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
          
          {/* Render Main section items with conditional animation */}
          {mainItems.map((item) => (
            <SidebarMenuItem 
              key={item.id} 
              className={shouldAnimate(item.id) ? "animate-gradient-pulse rounded-md" : ""}
            >
              <SidebarMenuButton tooltip={item.name} className="py-4">
                {React.isValidElement(item.icon) ? item.icon : null}
                <span>{item.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        {/* Separator between sections */}
        <SidebarSeparator className="my-4" />
        
        {/* Admin section */}
        <SidebarGroupLabel>Administration</SidebarGroupLabel>
        <SidebarMenu>
          {/* Render Administration section items with conditional animation */}
          {adminItems.map((item) => (
            <SidebarMenuItem 
              key={item.id} 
              className={shouldAnimate(item.id) ? "animate-gradient-pulse rounded-md" : ""}
            >
              <SidebarMenuButton tooltip={item.name} className="py-4">
                {React.isValidElement(item.icon) ? item.icon : null}
                <span>{item.name}</span>
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
          {resourceItems.map((item) => (
            <SidebarMenuItem 
              key={item.id} 
              className={shouldAnimate(item.id) ? "animate-gradient-pulse rounded-md" : ""}
            >
              <SidebarMenuButton 
                isActive={item.link && currentPath === item.link}
                tooltip={item.name} 
                className="py-4"
                asChild={!!item.link}
              >
                {item.link ? (
                  <Link to={item.link}>
                    {React.isValidElement(item.icon) ? item.icon : null}
                    <span>{item.name}</span>
                  </Link>
                ) : (
                  <>
                    {React.isValidElement(item.icon) ? item.icon : null}
                    <span>{item.name}</span>
                  </>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>;
};
