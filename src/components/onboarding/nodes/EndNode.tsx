import { Handle, Position } from 'reactflow';
import { CheckCircle2 } from 'lucide-react';

export function EndNode() {
  return (
    <div className="bg-primary text-primary-foreground px-4 py-3 rounded-lg shadow-lg border-2 border-primary/80 min-w-[120px]">
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-primary/80 !w-3 !h-3 !border-2 !border-white"
      />
      <div className="flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4" />
        <span className="font-semibold text-sm">Complete</span>
      </div>
    </div>
  );
}
