
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Folder, FileText, CheckSquare, Calendar, Users, CircleDollarSign, Plus, Plug, HelpCircle, List } from "lucide-react";

export type MenuItem = {
  id: string;
  name: string;
  icon: React.ReactNode;
  link?: string;
  section: "Main" | "Administration" | "Resources";
  order: number;
  isNew?: boolean; // Track if the item is newly added
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
    
    // Determine if this item is newly added
    const previousItems = localStorage.getItem('previousMenuItems');
    const prevItemsArray = previousItems ? JSON.parse(previousItems) : [];
    const isItemNew = item.id === 'analytics' && !prevItemsArray.some((prevItem: any) => prevItem.id === 'analytics');
    
    return {
      ...item,
      icon: defaultItem ? defaultItem.icon : null,
      isNew: isItemNew
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
    // Store current items as previous before updating
    const currentItems = localStorage.getItem('menuItems');
    if (currentItems) {
      localStorage.setItem('previousMenuItems', currentItems);
    }
    
    // Create a simplified version for storage without React elements
    const storageItems = items.map(item => ({
      id: item.id,
      name: item.name,
      link: item.link,
      section: item.section,
      order: item.order,
      // Don't store React elements
    }));
    
    // Mark the analytics item as new if it's being added
    const updatedItems = items.map(item => {
      if (item.id === 'analytics') {
        const prevItems = localStorage.getItem('previousMenuItems');
        const prevItemsArray = prevItems ? JSON.parse(prevItems) : [];
        const isNew = !prevItemsArray.some((prevItem: any) => prevItem.id === 'analytics');
        return { ...item, isNew };
      }
      return item;
    });
    
    setMenuItems(updatedItems);
    localStorage.setItem('menuItems', JSON.stringify(storageItems));
  };

  const resetMenuOrder = () => {
    localStorage.setItem('previousMenuItems', localStorage.getItem('menuItems') || '[]');
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
