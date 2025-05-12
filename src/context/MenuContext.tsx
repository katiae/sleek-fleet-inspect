
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Folder, FileText, CheckSquare, Calendar, Users, CircleDollarSign, Plus, Plug, HelpCircle, List } from "lucide-react";

export type MenuItem = {
  id: string;
  name: string;
  icon: React.ReactNode;
  link?: string;
  section: "Main" | "Administration" | "Resources";
  order: number;
};

type MenuContextType = {
  menuItems: MenuItem[];
  updateMenuItems: (items: MenuItem[]) => void;
  resetMenuOrder: () => void;
};

// Create icon elements properly
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
  { id: "add-capabilities", name: "Add Capabilities", icon: <Plus className="text-orange-500" />, link: "/capabilities", section: "Resources", order: 1 },
  { id: "integrations", name: "Integrations", icon: <Plug />, section: "Resources", order: 2 },
  { id: "customize-menu", name: "Customise menu", icon: <List />, link: "/customize-menu", section: "Resources", order: 3 },
  { id: "help", name: "Help", icon: <HelpCircle />, section: "Resources", order: 4 },
];

// Function to convert serialized icons back to React elements
const reconstructIcons = (items: any[]): MenuItem[] => {
  return items.map(item => {
    // Find the matching default item to get its icon
    const defaultItem = defaultMenuItems.find(di => di.id === item.id);
    return {
      ...item,
      icon: defaultItem ? defaultItem.icon : null
    };
  });
};

const MenuContext = createContext<MenuContextType | null>(null);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const savedItems = localStorage.getItem('menuItems');
    return savedItems ? reconstructIcons(JSON.parse(savedItems)) : defaultMenuItems;
  });

  // Effect to refresh menuItems from localStorage when it changes
  useEffect(() => {
    const handleStorageChange = () => {
      const savedItems = localStorage.getItem('menuItems');
      if (savedItems) {
        setMenuItems(reconstructIcons(JSON.parse(savedItems)));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const updateMenuItems = (items: MenuItem[]) => {
    // Create a simplified version for storage without React elements
    const storageItems = items.map(item => ({
      id: item.id,
      name: item.name,
      link: item.link,
      section: item.section,
      order: item.order,
      // Don't store React elements
    }));
    
    setMenuItems(items);
    localStorage.setItem('menuItems', JSON.stringify(storageItems));
  };

  const resetMenuOrder = () => {
    setMenuItems(defaultMenuItems);
    localStorage.removeItem('menuItems');
  };

  return (
    <MenuContext.Provider value={{ menuItems, updateMenuItems, resetMenuOrder }}>
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
