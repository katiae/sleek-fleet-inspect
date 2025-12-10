import { useCallback, useMemo } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Connection,
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  NodeTypes,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { StartNode, EndNode, TaskNode } from './nodes';
import { OnboardingTask, OnboardingTaskType } from '@/lib/onboarding-data';

const nodeTypes: NodeTypes = {
  start: StartNode,
  end: EndNode,
  task: TaskNode,
};

type FlowCanvasProps = {
  selectedTasks: OnboardingTaskType[];
  availableTasks: OnboardingTask[];
  onTasksChange: (tasks: OnboardingTaskType[]) => void;
};

export function FlowCanvas({ selectedTasks, availableTasks, onTasksChange }: FlowCanvasProps) {
  const handleDeleteNode = useCallback((nodeId: string) => {
    const taskIndex = parseInt(nodeId.replace('task-', ''));
    if (!isNaN(taskIndex)) {
      const newTasks = selectedTasks.filter((_, i) => i !== taskIndex);
      onTasksChange(newTasks);
    }
  }, [selectedTasks, onTasksChange]);

  const initialNodes: Node[] = useMemo(() => {
    const nodes: Node[] = [
      {
        id: 'start',
        type: 'start',
        position: { x: 50, y: 200 },
        data: {},
        draggable: false,
      },
    ];

    selectedTasks.forEach((taskType, index) => {
      const task = availableTasks.find(t => t.id === taskType);
      if (task) {
        nodes.push({
          id: `task-${index}`,
          type: 'task',
          position: { x: 250 + index * 280, y: 200 },
          data: {
            label: task.name,
            description: task.description,
            taskType: task.id,
            onDelete: handleDeleteNode,
          },
        });
      }
    });

    nodes.push({
      id: 'end',
      type: 'end',
      position: { x: 250 + selectedTasks.length * 280, y: 200 },
      data: {},
      draggable: false,
    });

    return nodes;
  }, [selectedTasks, availableTasks, handleDeleteNode]);

  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];
    const nodeIds = ['start', ...selectedTasks.map((_, i) => `task-${i}`), 'end'];

    for (let i = 0; i < nodeIds.length - 1; i++) {
      edges.push({
        id: `e-${nodeIds[i]}-${nodeIds[i + 1]}`,
        source: nodeIds[i],
        target: nodeIds[i + 1],
        type: 'smoothstep',
        animated: true,
        style: { stroke: 'hsl(var(--muted-foreground))', strokeWidth: 2 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: 'hsl(var(--muted-foreground))',
        },
      });
    }

    return edges;
  }, [selectedTasks]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes when selectedTasks changes
  useMemo(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const taskType = event.dataTransfer.getData('application/reactflow') as OnboardingTaskType;
      if (!taskType) return;

      // Add task to the end of the flow
      if (!selectedTasks.includes(taskType)) {
        onTasksChange([...selectedTasks, taskType]);
      }
    },
    [selectedTasks, onTasksChange]
  );

  return (
    <div className="h-[500px] w-full border border-border rounded-lg bg-muted/20">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDragOver={onDragOver}
        onDrop={onDrop}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="hsl(var(--muted-foreground))" gap={20} size={1} />
        <Controls className="bg-card border border-border rounded-lg" />
      </ReactFlow>
    </div>
  );
}
