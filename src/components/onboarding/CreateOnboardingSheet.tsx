
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { X, Plus } from "lucide-react";
import {
  OnboardingFlow,
  OnboardingTaskType,
  ProductType,
  availableTasks,
  productTypes,
} from "@/lib/onboarding-data";

interface CreateOnboardingSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateFlow: (flow: OnboardingFlow) => void;
}

export const CreateOnboardingSheet = ({
  open,
  onOpenChange,
  onCreateFlow,
}: CreateOnboardingSheetProps) => {
  const [name, setName] = useState("");
  const [productType, setProductType] = useState<ProductType | "">("");
  const [selectedTasks, setSelectedTasks] = useState<OnboardingTaskType[]>([]);
  const [documentChecklist, setDocumentChecklist] = useState<string[]>([]);
  const [newDocument, setNewDocument] = useState("");

  const handleTaskToggle = (taskId: OnboardingTaskType) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleAddDocument = () => {
    if (newDocument.trim()) {
      setDocumentChecklist([...documentChecklist, newDocument.trim()]);
      setNewDocument("");
    }
  };

  const handleRemoveDocument = (index: number) => {
    setDocumentChecklist(documentChecklist.filter((_, i) => i !== index));
  };

  const handleCreate = () => {
    if (!name || !productType || selectedTasks.length === 0) return;

    const newFlow: OnboardingFlow = {
      id: `onb-${Date.now()}`,
      name,
      productType: productType as ProductType,
      tasks: selectedTasks,
      documentChecklist: documentChecklist.length > 0 ? documentChecklist : undefined,
      createdAt: new Date().toISOString().split("T")[0],
      status: "Draft",
    };

    onCreateFlow(newFlow);
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setProductType("");
    setSelectedTasks([]);
    setDocumentChecklist([]);
    setNewDocument("");
  };

  const isDocumentUploadSelected = selectedTasks.includes("document_upload");

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Create Onboarding Flow</SheetTitle>
          <SheetDescription>
            Configure an onboarding flow that will be assigned as a "Start Onboarding" task to cases with the selected product type.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Flow Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Flow Name</Label>
            <Input
              id="name"
              placeholder="e.g., Standard Purchase Flow"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Product Type */}
          <div className="space-y-2">
            <Label htmlFor="productType">Product Type</Label>
            <Select value={productType} onValueChange={(value) => setProductType(value as ProductType)}>
              <SelectTrigger>
                <SelectValue placeholder="Select product type" />
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
              This flow will be auto-assigned to all cases with this product type.
            </p>
          </div>

          <Separator />

          {/* Tasks Selection */}
          <div className="space-y-3">
            <Label>Home Mover Tasks</Label>
            <p className="text-xs text-muted-foreground mb-3">
              Select the tasks required for the home mover to complete during onboarding.
            </p>
            <div className="space-y-3">
              {availableTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center space-x-3 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                >
                  <Checkbox
                    id={task.id}
                    checked={selectedTasks.includes(task.id)}
                    onCheckedChange={() => handleTaskToggle(task.id)}
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={task.id}
                      className="text-sm font-medium cursor-pointer"
                    >
                      {task.name}
                    </label>
                    <p className="text-xs text-muted-foreground">
                      {task.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Document Checklist - Only show when document_upload is selected */}
          {isDocumentUploadSelected && (
            <>
              <Separator />
              <div className="space-y-3">
                <Label>Document Checklist</Label>
                <p className="text-xs text-muted-foreground">
                  Specify the documents the home mover needs to upload.
                </p>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., Proof of ID"
                    value={newDocument}
                    onChange={(e) => setNewDocument(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddDocument()}
                  />
                  <Button type="button" variant="outline" onClick={handleAddDocument}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {documentChecklist.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {documentChecklist.map((doc, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1 py-1"
                      >
                        {doc}
                        <button
                          onClick={() => handleRemoveDocument(index)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          <Separator />

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => {
                resetForm();
                onOpenChange(false);
              }}
            >
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={handleCreate}
              disabled={!name || !productType || selectedTasks.length === 0}
            >
              Create Flow
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
