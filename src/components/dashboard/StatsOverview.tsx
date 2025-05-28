
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckSquare, FileText, TrendingUp, AlertCircle, LucideIcon } from "lucide-react";

interface StatItem {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
}

const stats: StatItem[] = [
  {
    title: "Today's Tasks",
    value: "8",
    icon: CheckSquare,
    color: "text-blue-600"
  },
  {
    title: "Active Cases",
    value: "12",
    icon: FileText,
    color: "text-orange-600"
  },
  {
    title: "Completed This Week",
    value: "24",
    icon: TrendingUp,
    color: "text-green-600"
  },
  {
    title: "Pending Reviews",
    value: "5",
    icon: AlertCircle,
    color: "text-red-600"
  }
];

export const StatsOverview: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
