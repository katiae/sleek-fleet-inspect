
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CapabilitySearchProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CapabilitySearch: React.FC<CapabilitySearchProps> = ({ 
  searchQuery, 
  onSearchChange 
}) => {
  return (
    <div className="relative mb-8 max-w-md mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      <Input
        placeholder="Search capabilities..."
        className="pl-10 pr-4"
        value={searchQuery}
        onChange={onSearchChange}
      />
    </div>
  );
};
