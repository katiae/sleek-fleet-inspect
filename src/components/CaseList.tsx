
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Filter, Columns } from "lucide-react";
import { CaseTable } from "@/components/CaseTable";
import { ColumnsSelection } from "@/components/ColumnsSelection";

export const CaseList = () => {
  const [columnSelectorOpen, setColumnSelectorOpen] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState([
    { id: "id", label: "Inspection ID", visible: true },
    { id: "address", label: "Property address", visible: true },
    { id: "status", label: "Status", visible: true },
    { id: "type", label: "Job type", visible: true },
    { id: "owner", label: "Customer", visible: true },
    { id: "lastInspected", label: "Last updated", visible: true },
    { id: "inspectionDate", label: "Inspection date", visible: false },
    { id: "vehicle", label: "Vehicle", visible: false },
    { id: "vin", label: "VIN", visible: false },
    { id: "licensePlate", label: "License plate", visible: false },
    { id: "mechanic", label: "Mechanic", visible: false },
  ]);

  const handleColumnToggle = (columnId: string) => {
    setVisibleColumns(columns => 
      columns.map(col => 
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
    );
  };

  const handleSelectAll = () => {
    const areAllSelected = visibleColumns.every(col => col.visible);
    setVisibleColumns(columns => 
      columns.map(col => ({ ...col, visible: !areAllSelected }))
    );
  };

  const handleSave = () => {
    console.log("Saving columns configuration:", visibleColumns);
    setColumnSelectorOpen(false);
  };

  const handleReset = () => {
    setVisibleColumns(columns => 
      columns.map(col => {
        if (["id", "address", "status", "type", "owner", "lastInspected"].includes(col.id)) {
          return { ...col, visible: true };
        } else {
          return { ...col, visible: false };
        }
      })
    );
  };

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
        <Button 
          variant="outline" 
          size="sm" 
          className="h-9"
          onClick={() => setColumnSelectorOpen(true)}
        >
          <Columns className="mr-2 h-4 w-4" /> Columns
        </Button>
      </div>
      
      <CaseTable visibleColumns={visibleColumns} />

      <ColumnsSelection
        isOpen={columnSelectorOpen}
        onOpenChange={setColumnSelectorOpen}
        columns={visibleColumns}
        onColumnToggle={handleColumnToggle}
        onSelectAll={handleSelectAll}
        onSave={handleSave}
        onReset={handleReset}
      />
    </div>
  );
};
