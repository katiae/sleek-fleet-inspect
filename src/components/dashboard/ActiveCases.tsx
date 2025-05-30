
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
  jobType?: string;
  customer?: string;
  customerType?: string;
}

const casesSummary: CaseItem[] = [
  {
    id: 1,
    address: "42 Westminster Gardens Mews, London",
    status: "NEW",
    tasksCount: 3,
    priority: "high",
    jobType: "Maintenance",
    customer: "Jane Smith",
    customerType: "Private"
  },
  {
    id: 2,
    address: "Rosewood House, 156 Manchester Residential Park Lane, Manchester",
    status: "PENDING",
    tasksCount: 2,
    priority: "medium",
    jobType: "Full Inspection",
    customer: "John Doe",
    customerType: "Business"
  },
  {
    id: 3,
    address: "789 Birmingham Private Estate Drive, Birmingham",
    status: "UNDER REVIEW",
    tasksCount: 1,
    priority: "low",
    jobType: "Diagnostic",
    customer: "Sarah Wilson",
    customerType: "Private"
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
          <Button variant="outline" size="sm">View all cases</Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-3">
          {casesSummary.map(caseItem => (
            <div key={caseItem.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium mb-2">{caseItem.address}</p>
                <p className="text-sm text-gray-600">{caseItem.tasksCount} tasks remaining • {caseItem.jobType} • {caseItem.customer} ({caseItem.customerType})</p>
              </div>
              <div className="flex items-center">
                <CaseStatusBadge status={caseItem.status} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
