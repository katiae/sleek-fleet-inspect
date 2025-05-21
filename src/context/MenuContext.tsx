
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Folder, FileText, CheckSquare, Calendar, Users, CircleDollarSign, Plus, Plug, HelpCircle, List } from "lucide-react";

export type MenuItem = {
  id: string;
  name: string;
  icon: React.ReactNode;
  link?: string;
  section: "Main" | "Administration" | "Solutions" | "Resources";
  order: number;
};

type MenuContextType = {
  menuItems: MenuItem[];
  updateMenuItems: (items: MenuItem[]) => void;
  resetMenuOrder: () => void;
  addMenuItem: (item: MenuItem) => void;
};

const defaultMenuItems: MenuItem[] = [
  { id: "cases", name: "Cases", icon: <Folder />, link: "/", section: "Main", order: 1 },
  { id: "reports", name: "Reports", icon: <FileText />, section: "Main", order: 2 },
  { id: "tasks", name: "Tasks", icon: <CheckSquare />, section: "Main", order: 3 },
  { id: "availability", name: "Availability", icon: <Calendar />, section: "Main", order: 4 },
  { id: "audit-log", name: "Audit log", icon: <FileText />, section: "Administration", order: 1 },
  { id: "users", name: "Users", icon: <Users />, section: "Administration", order: 2 },
  { id: "clients", name: "Clients", icon: <Users />, section: "Administration", order: 3 },
  { id: "templates", name: "Templates", icon: <FileText />, section: "Administration", order: 4 },
  { id: "fees", name: "Fees", icon: <CircleDollarSign />, section: "Administration", order: 5 },
  { id: "add-capabilities", name: "Add Capabilities", icon: <Plus className="text-orange-500" />, link: "/capabilities", section: "Solutions", order: 1 },
  { id: "integrations", name: "Integrations", icon: <Plug />, section: "Resources", order: 1 },
  { id: "customize-menu", name: "Customise menu", icon: <List />, link: "/customize-menu", section: "Resources", order: 2 },
  { id: "help", name: "Help", icon: <HelpCircle />, section: "Resources", order: 3 },
];

const MenuContext = createContext<MenuContextType | null>(null);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const savedItems = localStorage.getItem('menuItems');
    return savedItems ? JSON.parse(savedItems) : defaultMenuItems;
  });

  const updateMenuItems = (items: MenuItem[]) => {
    setMenuItems(items);
    localStorage.setItem('menuItems', JSON.stringify(items));
  };

  const resetMenuOrder = () => {
    setMenuItems(defaultMenuItems);
    localStorage.removeItem('menuItems');
  };
  
  // Add a new menu item before "Add Capabilities" in Solutions section
  const addMenuItem = (item: MenuItem) => {
    const newItems = [...menuItems];
    
    // If adding to Solutions section, insert before "Add Capabilities"
    if (item.section === "Solutions") {
      // Find the index of "Add Capabilities" item
      const addCapabilitiesIndex = newItems.findIndex(i => i.id === "add-capabilities");
      
      if (addCapabilitiesIndex !== -1) {
        // Insert the new item before "Add Capabilities"
        newItems.splice(addCapabilitiesIndex, 0, item);
        
        // Update order values for all Solutions items
        const solutionsItems = newItems.filter(i => i.section === "Solutions");
        solutionsItems.forEach((item, index) => {
          item.order = index + 1;
        });
      } else {
        // If "Add Capabilities" not found, just add to end of array
        newItems.push(item);
      }
    } else {
      // For other sections, just add to the end of the section
      const sectionItems = newItems.filter(i => i.section === item.section);
      item.order = sectionItems.length + 1;
      newItems.push(item);
    }
    
    updateMenuItems(newItems);
  };

  return (
    <MenuContext.Provider value={{ menuItems, updateMenuItems, resetMenuOrder, addMenuItem }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
