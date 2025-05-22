
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
import { Check, GripVertical } from "lucide-react";
import { ColumnDefinition } from "@/components/CaseList";
import { 
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface SortableItemProps {
  id: string;
  label: string;
  visible: boolean;
  onToggle: () => void;
}

function SortableItem({ id, label, visible, onToggle }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      className="px-6 py-4 pl-10 flex items-center justify-between"
    >
      <div className="flex items-center space-x-2">
        <Checkbox 
          id={id} 
          checked={visible} 
          onCheckedChange={onToggle}
          className="rounded-sm border-gray-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
        />
        <label 
          htmlFor={id} 
          className="text-base font-normal cursor-pointer"
        >
          {label}
        </label>
      </div>
      <div 
        className="text-gray-400 cursor-move"
        {...attributes}
        {...listeners}
      >
        <GripVertical size={20} />
      </div>
    </div>
  );
}

interface ColumnsSelectionProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  columns: ColumnDefinition[];
  onColumnToggle: (columnId: string) => void;
  onSelectAll: () => void;
  onSave: () => void;
  onReset: () => void;
  onReorder: (columns: ColumnDefinition[]) => void;
}

export const ColumnsSelection: React.FC<ColumnsSelectionProps> = ({
  isOpen,
  onOpenChange,
  columns,
  onColumnToggle,
  onSelectAll,
  onSave,
  onReset,
  onReorder,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = columns.findIndex(item => item.id === active.id);
      const newIndex = columns.findIndex(item => item.id === over.id);
      const newOrder = arrayMove(columns, oldIndex, newIndex);
      onReorder(newOrder);
    }
  };

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
        <div className="px-6 py-4">
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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext 
              items={columns.map(col => col.id)}
              strategy={verticalListSortingStrategy}
            >
              {columns.map((column) => (
                <SortableItem
                  key={column.id}
                  id={column.id}
                  label={column.label}
                  visible={column.visible}
                  onToggle={() => onColumnToggle(column.id)}
                />
              ))}
            </SortableContext>
          </DndContext>
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
