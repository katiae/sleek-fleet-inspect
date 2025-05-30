
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { CaseStatusBadge } from "@/components/CaseStatusBadge";
import { CaseStatus } from "@/lib/data";

interface CaseItem {
  id: number;
  address: string;
  status: CaseStatus;
  tasksCount: number;
  priority: string;
  lastUpdate: string;
}

const casesSummary: CaseItem[] = [
  {
    id: 1,
    address: "42 Baker Street, London",
    status: "NEW",
    tasksCount: 3,
    priority: "high",
    lastUpdate: "2 hours ago"
  },
  {
    id: 2,
    address: "156 Oak Avenue, Manchester",
    status: "PENDING",
    tasksCount: 2,
    priority: "medium",
    lastUpdate: "1 day ago"
  },
  {
    id: 3,
    address: "789 Pine Road, Birmingham",
    status: "UNDER REVIEW",
    tasksCount: 1,
    priority: "low",
    lastUpdate: "3 days ago"
  }
];

export const ActiveCases: React.FC = () => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Active cases
          </h3>
          <Button variant="outline" size="sm">View All Cases</Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-3">
          {casesSummary.map(caseItem => (
            <div key={caseItem.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium">{caseItem.address}</p>
                <p className="text-sm text-gray-600">{caseItem.tasksCount} tasks remaining • Updated {caseItem.lastUpdate}</p>
              </div>
              <div className="flex items-center">
                <div className="scale-90">
                  <CaseStatusBadge status={caseItem.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
