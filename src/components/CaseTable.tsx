
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

export const CaseTable = () => {
  return (
    <div className="bg-white border rounded-md">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Inspection ID</TableHead>
              <TableHead>Vehicle address</TableHead>
              <TableHead>Inspection Status</TableHead>
              <TableHead>Inspection Type</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Last Inspected</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((caseItem, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{caseItem.id}</TableCell>
                <TableCell>{caseItem.address}</TableCell>
                <TableCell>
                  <CaseStatusBadge status={caseItem.status} />
                </TableCell>
                <TableCell>{caseItem.type}</TableCell>
                <TableCell>
                  <div className="text-sm text-gray-500">{caseItem.owner.type}</div>
                  <div>{caseItem.owner.name}</div>
                </TableCell>
                <TableCell>{caseItem.lastInspected}</TableCell>
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
