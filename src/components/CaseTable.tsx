
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { cases } from "@/lib/data";
import { CaseStatusBadge } from "@/components/CaseStatusBadge";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

interface ColumnDefinition {
  id: string;
  label: string;
  visible: boolean;
}

interface CaseTableProps {
  visibleColumns: ColumnDefinition[];
}

export const CaseTable: React.FC<CaseTableProps> = ({ visibleColumns }) => {
  const navigate = useNavigate();

  const handleRowClick = (caseId: string) => {
    navigate(`/case/${caseId}`);
  };

  const getVisibleColumns = () => {
    return visibleColumns.filter(column => column.visible);
  };

  const formatInspectionDate = (dateString?: string) => {
    if (!dateString) return "";
    try {
      return format(new Date(dateString), "EEEE, d MMMM");
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  return (
    <div className="bg-white border rounded-md">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              {getVisibleColumns().map(column => (
                <TableHead key={column.id}>{column.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((caseItem, index) => (
              <TableRow 
                key={index} 
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => handleRowClick(caseItem.id)}
              >
                {getVisibleColumns().map(column => (
                  <TableCell key={column.id}>
                    {column.id === 'id' && caseItem.id}
                    {column.id === 'address' && caseItem.address}
                    {column.id === 'status' && (
                      <CaseStatusBadge status={caseItem.status} />
                    )}
                    {column.id === 'type' && caseItem.type}
                    {column.id === 'owner' && (
                      <>
                        <div className="text-sm text-gray-500">{caseItem.owner.type}</div>
                        <div>{caseItem.owner.name}</div>
                      </>
                    )}
                    {column.id === 'lastInspected' && caseItem.lastInspected}
                    {column.id === 'inspectionDate' && formatInspectionDate(caseItem.appointment?.date)}
                    {column.id === 'vehicle' && caseItem.vehicle && (
                      <>
                        <div>{caseItem.vehicle.make} {caseItem.vehicle.model}</div>
                        <div className="text-sm text-gray-500">{caseItem.vehicle.year}</div>
                      </>
                    )}
                    {column.id === 'vin' && caseItem.vehicle?.vin}
                    {column.id === 'licensePlate' && caseItem.vehicle?.licensePlate}
                    {column.id === 'mechanic' && caseItem.mechanic?.name}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-4 py-2 border-t">
        <div className="text-sm text-muted-foreground">
          Page <span className="font-medium">1</span> of <span className="font-medium">32</span>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

