
import React from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";

interface DashboardHeaderProps {
  userName: string;
  onCustomizeView: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ userName, onCustomizeView }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Welcome back, {userName}! 👋</h1>
        <p className="text-gray-500 mt-1">Here's what's on your schedule for today</p>
      </div>
      <Button variant="outline" className="gap-2" onClick={onCustomizeView}>
        <LayoutGrid className="w-4 h-4" />
        Customise view
      </Button>
    </div>
  );
};
