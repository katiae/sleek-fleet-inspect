
import React from "react";
import { Input } from "@/components/ui/input";
import { Search, UserRound } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const Navbar = () => {
  return (
    <div className="border-b bg-white">
      <div className="flex h-16 items-center px-6">
        <SidebarTrigger className="mr-2" />
        <div className="ml-auto flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-[200px] pl-8 md:w-[300px] bg-gray-50"
            />
          </div>
          <div className="border border-gray-200 h-8 w-8 rounded-full flex items-center justify-center bg-blue-50 text-blue-700">
            <span className="text-xs font-medium">TM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
