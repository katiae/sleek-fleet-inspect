
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Columns } from "lucide-react";
import { CaseTable } from "@/components/CaseTable";

export const CaseList = () => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Cases</h1>
          <p className="text-gray-500 mt-1">Track, manage and progress cases.</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Plus className="mr-2 h-4 w-4" /> Create new case
        </Button>
      </div>
      
      <div className="flex justify-end space-x-2 mb-4">
        <Button variant="outline" size="sm" className="h-9">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
        <Button variant="outline" size="sm" className="h-9">
          <Columns className="mr-2 h-4 w-4" /> Columns
        </Button>
      </div>
      
      <CaseTable />
    </div>
  );
};
