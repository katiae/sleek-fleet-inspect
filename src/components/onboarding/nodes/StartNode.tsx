import { Handle, Position } from 'reactflow';
import { Play } from 'lucide-react';

export function StartNode() {
  return (
    <div className="bg-emerald-500 text-white px-4 py-3 rounded-lg shadow-lg border-2 border-emerald-600 min-w-[120px]">
      <div className="flex items-center gap-2">
        <Play className="h-4 w-4" />
        <span className="font-semibold text-sm">Start</span>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-emerald-700 !w-3 !h-3 !border-2 !border-white"
      />
    </div>
  );
}
