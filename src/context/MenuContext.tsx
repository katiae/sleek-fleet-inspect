
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
