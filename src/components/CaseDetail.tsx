
import React from "react";
import { Case } from "@/lib/data";
import { CaseStatusBadge } from "@/components/CaseStatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  List,
  FileText,
  Clipboard,
  FileBarChart
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";

interface CaseDetailProps {
  caseItem: Case;
}

export const CaseDetail: React.FC<CaseDetailProps> = ({ caseItem }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">{caseItem.address}</h1>
          <div className="flex items-center gap-3 mt-2">
            <CaseStatusBadge status={caseItem.status} />
            <span className="text-gray-500">ID: {caseItem.id}</span>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Actions <MoreHorizontal className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Schedule Inspection</DropdownMenuItem>
            <DropdownMenuItem>Assign Inspector</DropdownMenuItem>
            <DropdownMenuItem>Change Status</DropdownMenuItem>
            <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Tabs defaultValue="overview" className="mt-6">
        <TabsList className="w-full border-b pb-0 mb-4">
          <TabsTrigger value="overview" className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500">
            <FileText className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="details" className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500">
            <List className="mr-2 h-4 w-4" />
            Case Details
          </TabsTrigger>
          <TabsTrigger value="tasks" className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500">
            <Clipboard className="mr-2 h-4 w-4" />
            Tasks
          </TabsTrigger>
          <TabsTrigger value="files" className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500">
            <FileText className="mr-2 h-4 w-4" />
            Files
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:border-b-2 data-[state=active]:border-orange-500">
            <FileBarChart className="mr-2 h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Case Information</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Address:</span>
                      <span className="font-medium">{caseItem.address}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Case Type:</span>
                      <span className="font-medium">{caseItem.type}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span><CaseStatusBadge status={caseItem.status} /></span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Last Inspected:</span>
                      <span className="font-medium">{caseItem.lastInspected}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Owner Information</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-500">Name:</span>
                      <span className="font-medium">{caseItem.owner.name}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <span className="font-medium">{caseItem.owner.type}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="details">
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              Detailed case information will appear here
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tasks">
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              Tasks related to this case will appear here
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="files">
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              Files associated with this case will appear here
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardContent className="p-6 text-center text-gray-500">
              Reports for this case will appear here
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
