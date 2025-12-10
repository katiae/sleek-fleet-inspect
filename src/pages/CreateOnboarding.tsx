import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
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
import { toast } from "sonner";
import { 
  availableTasks, 
  productTypes, 
  OnboardingTaskType, 
  ProductType 
} from "@/lib/onboarding-data";
import { FlowCanvas } from "@/components/onboarding/FlowCanvas";
import { DraggableTaskItem } from "@/components/onboarding/DraggableTaskItem";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function CreateOnboarding() {
  const navigate = useNavigate();
  const [flowName, setFlowName] = useState("");
  const [productType, setProductType] = useState<ProductType | "">("");
  const [selectedTasks, setSelectedTasks] = useState<OnboardingTaskType[]>([]);

  const handleAddTask = (taskId: OnboardingTaskType) => {
    if (!selectedTasks.includes(taskId)) {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const handleCreate = () => {
    if (!flowName.trim()) {
      toast.error("Please enter a flow name");
      return;
    }
    if (!productType) {
      toast.error("Please select a job type");
      return;
    }
    if (selectedTasks.length === 0) {
      toast.error("Please add at least one task to the flow");
      return;
    }

    toast.success("Onboarding flow created successfully");
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/onboarding")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Create Onboarding Flow</h1>
              <p className="text-sm text-muted-foreground">
                Design the steps for your home mover onboarding
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate("/onboarding")}>
              Cancel
            </Button>
            <Button onClick={handleCreate}>Create Flow</Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Left Sidebar - Flow Details */}
        <div className="w-80 border-r border-border bg-card p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="flowName">Flow Name</Label>
              <Input
                id="flowName"
                placeholder="e.g., Standard Purchase Flow"
                value={flowName}
                onChange={(e) => setFlowName(e.target.value)}
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
            </div>

            <div className="pt-4 border-t border-border">
              <Label className="text-sm font-medium mb-3 block">
                Available Tasks
              </Label>
              <p className="text-xs text-muted-foreground mb-4">
                Drag tasks onto the canvas or click + to add
              </p>
              <ScrollArea className="h-[calc(100vh-380px)]">
                <div className="space-y-2 pr-4">
                  {availableTasks.map((task) => (
                    <DraggableTaskItem
                      key={task.id}
                      task={task}
                      isSelected={selectedTasks.includes(task.id)}
                      onAdd={() => handleAddTask(task.id)}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="flex-1 p-6 bg-muted/30">
          <div className="mb-4">
            <h2 className="text-lg font-medium">Flow Builder</h2>
            <p className="text-sm text-muted-foreground">
              {selectedTasks.length === 0
                ? "Drag tasks from the sidebar to build your flow"
                : `${selectedTasks.length} task${selectedTasks.length !== 1 ? "s" : ""} in flow`}
            </p>
          </div>
          <FlowCanvas
            selectedTasks={selectedTasks}
            availableTasks={availableTasks}
            onTasksChange={setSelectedTasks}
          />
        </div>
      </div>
    </div>
  );
}
