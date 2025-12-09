
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { OnboardingFlow, availableTasks } from "@/lib/onboarding-data";

interface OnboardingTableProps {
  flows: OnboardingFlow[];
}

const getStatusBadgeStyles = (status: OnboardingFlow["status"]) => {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 border-green-200";
    case "Draft":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "Archived":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

export const OnboardingTable = ({ flows }: OnboardingTableProps) => {
  const getTaskNames = (taskIds: string[]) => {
    return taskIds
      .map(id => availableTasks.find(t => t.id === id)?.name || id)
      .join(", ");
  };

  return (
    <div className="border rounded-lg bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Product Type</TableHead>
            <TableHead>Tasks</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {flows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
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
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
