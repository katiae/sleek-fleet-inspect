import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Plus, GripVertical, X, Check } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  OnboardingFlow,
  OnboardingTaskType,
  ProductType,
  availableTasks,
  productTypes,
} from "@/lib/onboarding-data";

interface SortableTaskProps {
  id: OnboardingTaskType;
  name: string;
  description: string;
  onRemove: (id: OnboardingTaskType) => void;
}

const SortableTask = ({ id, name, description, onRemove }: SortableTaskProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-4 rounded-lg border bg-card ${
        isDragging ? "opacity-50 shadow-lg" : ""
      }`}
    >
      <button
        className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-5 w-5" />
      </button>
      <div className="flex-1">
        <p className="font-medium text-sm">{name}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <button
        onClick={() => onRemove(id)}
        className="text-muted-foreground hover:text-destructive transition-colors"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default function CreateOnboarding() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [productType, setProductType] = useState<ProductType | "">("");
  const [selectedTasks, setSelectedTasks] = useState<OnboardingTaskType[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSelectedTasks((items) => {
        const oldIndex = items.indexOf(active.id as OnboardingTaskType);
        const newIndex = items.indexOf(over.id as OnboardingTaskType);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddTask = (taskId: OnboardingTaskType) => {
    if (!selectedTasks.includes(taskId)) {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const handleRemoveTask = (taskId: OnboardingTaskType) => {
    setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
  };

  const handleCreate = () => {
    if (!name || !productType || selectedTasks.length === 0) return;

    const newFlow: OnboardingFlow = {
      id: `onb-${Date.now()}`,
      name,
      productType: productType as ProductType,
      tasks: selectedTasks,
      createdAt: new Date().toISOString().split("T")[0],
      status: "Draft",
    };

    // TODO: Save to state/backend
    console.log("Created flow:", newFlow);
    navigate("/onboarding");
  };

  const availableToAdd = availableTasks.filter(
    (task) => !selectedTasks.includes(task.id)
  );

  const isValid = name && productType && selectedTasks.length > 0;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 p-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/onboarding")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-semibold">Create Onboarding Flow</h1>
                <p className="text-muted-foreground text-sm">
                  Configure an automated onboarding flow for home movers
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Flow Configuration */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Flow Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Flow Name</Label>
                      <Input
                        id="name"
                        placeholder="e.g., Standard Purchase Flow"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="productType">Job Type</Label>
                      <Select
                        value={productType}
                        onValueChange={(value) => setProductType(value as ProductType)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent>
                          {productTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        This flow will be auto-assigned to all cases with this job type.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Task Flow Builder */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Flow Steps</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Add and reorder the tasks that home movers need to complete. Drag to reorder.
                    </p>
                  </CardHeader>
                  <CardContent>
                    {selectedTasks.length === 0 ? (
                      <div className="border-2 border-dashed rounded-lg p-8 text-center text-muted-foreground">
                        <p className="text-sm">No steps added yet</p>
                        <p className="text-xs mt-1">
                          Add tasks from the panel on the right to build your flow
                        </p>
                      </div>
                    ) : (
                      <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                      >
                        <SortableContext
                          items={selectedTasks}
                          strategy={verticalListSortingStrategy}
                        >
                          <div className="space-y-2">
                            {selectedTasks.map((taskId, index) => {
                              const task = availableTasks.find((t) => t.id === taskId);
                              if (!task) return null;
                              return (
                                <div key={taskId} className="flex items-center gap-2">
                                  <Badge
                                    variant="outline"
                                    className="w-6 h-6 p-0 flex items-center justify-center text-xs shrink-0"
                                  >
                                    {index + 1}
                                  </Badge>
                                  <div className="flex-1">
                                    <SortableTask
                                      id={taskId}
                                      name={task.name}
                                      description={task.description}
                                      onRemove={handleRemoveTask}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </SortableContext>
                      </DndContext>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Available Tasks */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Available Tasks</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Click to add a task to your flow
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {availableToAdd.length === 0 ? (
                        <p className="text-sm text-muted-foreground text-center py-4">
                          All tasks have been added
                        </p>
                      ) : (
                        availableToAdd.map((task) => (
                          <button
                            key={task.id}
                            onClick={() => handleAddTask(task.id)}
                            className="w-full flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors text-left"
                          >
                            <Plus className="h-4 w-4 text-muted-foreground shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm truncate">{task.name}</p>
                              <p className="text-xs text-muted-foreground truncate">
                                {task.description}
                              </p>
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Separator />

                {/* Actions */}
                <div className="space-y-3">
                  <Button
                    className="w-full"
                    onClick={handleCreate}
                    disabled={!isValid}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Create Flow
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/onboarding")}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
