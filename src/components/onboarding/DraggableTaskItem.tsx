import { Shield, UserCheck, Home, Wallet, FileUp, PenTool, CreditCard, Plus } from 'lucide-react';
import { OnboardingTask, OnboardingTaskType } from '@/lib/onboarding-data';
import { Button } from '@/components/ui/button';

const taskIcons: Record<OnboardingTaskType, React.ElementType> = {
  aml: Shield,
  identity_check: UserCheck,
  ownership_check: Home,
  source_of_funds: Wallet,
  document_upload: FileUp,
  e_signatures: PenTool,
  complete_payment: CreditCard,
};

type DraggableTaskItemProps = {
  task: OnboardingTask;
  isSelected: boolean;
  onAdd: () => void;
};

export function DraggableTaskItem({ task, isSelected, onAdd }: DraggableTaskItemProps) {
  const Icon = taskIcons[task.id] || Shield;

  const onDragStart = (event: React.DragEvent) => {
    event.dataTransfer.setData('application/reactflow', task.id);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable={!isSelected}
      onDragStart={onDragStart}
      className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
        isSelected
          ? 'bg-muted/50 border-border opacity-50 cursor-not-allowed'
          : 'bg-card border-border hover:border-primary/50 cursor-grab active:cursor-grabbing hover:shadow-md'
      }`}
    >
      <div className="p-2 rounded-md bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm truncate">{task.name}</p>
        <p className="text-xs text-muted-foreground truncate">{task.description}</p>
      </div>
      {!isSelected && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={onAdd}
        >
          <Plus className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
