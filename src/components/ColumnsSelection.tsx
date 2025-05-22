
import React from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader,
  SheetTitle,
  SheetClose
} from "@/components/ui/sheet";
import { Check } from "lucide-react";

interface ColumnsSelectionProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  columns: { id: string; label: string; visible: boolean }[];
  onColumnToggle: (columnId: string) => void;
  onSelectAll: () => void;
  onSave: () => void;
  onReset: () => void;
}

export const ColumnsSelection: React.FC<ColumnsSelectionProps> = ({
  isOpen,
  onOpenChange,
  columns,
  onColumnToggle,
  onSelectAll,
  onSave,
  onReset,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md p-0 overflow-y-auto">
        <SheetHeader className="border-b p-6">
          <div className="flex items-center">
            <div className="flex items-center mr-auto">
              <Check className="h-5 w-5 mr-2 text-gray-900" />
              <SheetTitle>Columns</SheetTitle>
            </div>
            <SheetClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
              <span className="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </SheetClose>
          </div>
        </SheetHeader>
        <div className="px-6 py-4 border-b">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="show-all" 
              checked={columns.every(col => col.visible)} 
              onCheckedChange={onSelectAll}
              className="rounded-sm border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
            />
            <label 
              htmlFor="show-all" 
              className="text-base font-normal cursor-pointer"
            >
              Show all
            </label>
          </div>
        </div>
        <div className="overflow-y-auto max-h-[calc(100vh-200px)]">
          {columns.map((column) => (
            <div key={column.id}>
              <div className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id={column.id} 
                    checked={column.visible} 
                    onCheckedChange={() => onColumnToggle(column.id)}
                    className="rounded-sm border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
                  />
                  <label 
                    htmlFor={column.id} 
                    className="text-base font-normal cursor-pointer"
                  >
                    {column.label}
                  </label>
                </div>
                <div className="text-gray-400">
                  ⋮⋮⋮
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 border-t mt-auto flex justify-between">
          <Button 
            className="bg-orange-500 hover:bg-orange-600 px-8" 
            onClick={onSave}
          >
            Save columns
          </Button>
          <Button 
            variant="ghost" 
            onClick={onReset}
          >
            Reset columns
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
