import { Handle, Position, NodeProps } from 'reactflow';
import { X, Shield, UserCheck, Home, Wallet, FileUp, PenTool, CreditCard, GripVertical } from 'lucide-react';
import { OnboardingTaskType } from '@/lib/onboarding-data';

const taskIcons: Record<OnboardingTaskType, React.ElementType> = {
  aml: Shield,
  identity_check: UserCheck,
  ownership_check: Home,
  source_of_funds: Wallet,
  document_upload: FileUp,
  e_signatures: PenTool,
  complete_payment: CreditCard,
};

type TaskNodeData = {
  label: string;
  description: string;
  taskType: OnboardingTaskType;
  onDelete?: (id: string) => void;
};

export function TaskNode({ id, data }: NodeProps<TaskNodeData>) {
  const Icon = taskIcons[data.taskType] || Shield;

  return (
    <div className="bg-card text-card-foreground px-4 py-3 rounded-lg shadow-lg border border-border min-w-[200px] group">
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-muted-foreground !w-3 !h-3 !border-2 !border-background"
      />
      <div className="flex items-start gap-3">
        <div className="flex items-center gap-2 flex-1">
          <div className="p-2 rounded-md bg-muted">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-sm">{data.label}</p>
            <p className="text-xs text-muted-foreground">{data.description}</p>
          </div>
        </div>
        <button
          onClick={() => data.onDelete?.(id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/10 rounded"
        >
          <X className="h-4 w-4 text-destructive" />
        </button>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-muted-foreground !w-3 !h-3 !border-2 !border-background"
      />
    </div>
  );
}
