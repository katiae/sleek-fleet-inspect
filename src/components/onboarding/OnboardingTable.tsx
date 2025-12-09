import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash2, FileX } from "lucide-react";
import { OnboardingFlow, availableTasks } from "@/lib/onboarding-data";

interface OnboardingTableProps {
  flows: OnboardingFlow[];
  onEdit?: (flow: OnboardingFlow) => void;
  onDelete?: (flowId: string) => void;
  onUnpublish?: (flowId: string) => void;
}

const getStatusBadgeStyles = (status: OnboardingFlow["status"]) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 border-green-200";
    case "Draft":
      return "bg-muted text-muted-foreground border-border";
    case "Archived":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const OnboardingTable = ({ flows, onEdit, onDelete, onUnpublish }: OnboardingTableProps) => {
  const getTaskNames = (taskIds: string[]) => {
    return taskIds
      .map(id => availableTasks.find(t => t.id === id)?.name || id)
      .join(", ");
  };

  return (
    <div className="border rounded-lg bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead>Name</TableHead>
            <TableHead>Product Type</TableHead>
            <TableHead>Tasks</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[70px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No onboarding flows created yet. Click "Create Onboarding" to get started.
              </TableCell>
            </TableRow>
          ) : (
            flows.map((flow) => (
              <TableRow key={flow.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">{flow.name}</TableCell>
                <TableCell>{flow.productType}</TableCell>
                <TableCell className="max-w-[300px] truncate">
                  {getTaskNames(flow.tasks)}
                </TableCell>
                <TableCell>{flow.createdAt}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={getStatusBadgeStyles(flow.status)}>
                    {flow.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit?.(flow)}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      {flow.status === "Active" && (
                        <DropdownMenuItem onClick={() => onUnpublish?.(flow.id)}>
                          <FileX className="h-4 w-4 mr-2" />
                          Unpublish
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        onClick={() => onDelete?.(flow.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
