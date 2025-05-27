
import React, { useState } from "react";
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
import { ArrowDown, ArrowUp, ChevronUp } from "lucide-react";

interface ColumnDefinition {
  id: string;
  label: string;
  visible: boolean;
}

interface CaseTableProps {
  visibleColumns: ColumnDefinition[];
}

type SortDirection = "asc" | "desc" | null;

export const CaseTable: React.FC<CaseTableProps> = ({ visibleColumns }) => {
  const navigate = useNavigate();
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleRowClick = (caseId: string) => {
    navigate(`/case/${caseId}`);
  };

  const getVisibleColumns = () => {
    return visibleColumns.filter(column => column.visible);
  };

  const formatInspectionDate = (dateString?: string, timeString?: string) => {
    if (!dateString) return "";
    try {
      const formattedDate = format(new Date(dateString), "EEEE, d MMMM");
      return timeString ? `${formattedDate} at ${timeString}` : formattedDate;
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  const handleSort = (columnId: string) => {
    if (sortColumn === columnId) {
      // Toggle direction if clicking the same column
      setSortDirection(prev => prev === "asc" ? "desc" : prev === "desc" ? null : "asc");
      if (sortDirection === "desc") {
        setSortColumn(null);
      }
    } else {
      // Set new column and default to ascending
      setSortColumn(columnId);
      setSortDirection("asc");
    }
  };

  const getSortedCases = () => {
    if (!sortColumn || !sortDirection) {
      return cases;
    }

    return [...cases].sort((a, b) => {
      let valueA, valueB;

      // Extract the values to compare based on the column
      switch (sortColumn) {
        case 'id':
          valueA = a.id;
          valueB = b.id;
          break;
        case 'address':
          valueA = a.address;
          valueB = b.address;
          break;
        case 'status':
          valueA = a.status;
          valueB = b.status;
          break;
        case 'type':
          valueA = a.type;
          valueB = b.type;
          break;
        case 'owner':
          valueA = a.owner?.name || '';
          valueB = b.owner?.name || '';
          break;
        case 'lastInspected':
          valueA = a.lastInspected || '';
          valueB = b.lastInspected || '';
          break;
        case 'inspectionDate':
          valueA = a.appointment?.date || '';
          valueB = b.appointment?.date || '';
          break;
        case 'vehicle':
          valueA = a.vehicle ? `${a.vehicle.make} ${a.vehicle.model}` : '';
          valueB = b.vehicle ? `${b.vehicle.make} ${b.vehicle.model}` : '';
          break;
        case 'vin':
          valueA = a.vehicle?.vin || '';
          valueB = b.vehicle?.vin || '';
          break;
        case 'licensePlate':
          valueA = a.vehicle?.licensePlate || '';
          valueB = b.vehicle?.licensePlate || '';
          break;
        case 'mechanic':
          valueA = a.mechanic?.name || '';
          valueB = b.mechanic?.name || '';
          break;
        default:
          valueA = '';
          valueB = '';
      }

      // Compare the values
      if (valueA < valueB) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const renderSortIcon = (columnId: string) => {
    if (sortColumn === columnId) {
      return sortDirection === "asc" ? (
        <ArrowUp className="h-4 w-4 ml-1" />
      ) : (
        <ArrowDown className="h-4 w-4 ml-1" />
      );
    }
    
    // Show faded sort icons when not sorted
    return (
      <ChevronUp className="h-4 w-4 ml-1 text-gray-300" />
    );
  };

  const getColumnWidth = (columnId: string) => {
    const widths: Record<string, string> = {
      id: "140px",
      address: "200px", 
      status: "140px",
      type: "160px",
      owner: "180px",
      lastInspected: "140px",
      inspectionDate: "180px",
      vehicle: "160px",
      vin: "160px",
      licensePlate: "140px",
      mechanic: "140px",
    };
    return widths[columnId] || "140px";
  };

  const visibleCols = getVisibleColumns();
  const firstColumn = visibleCols[0];
  const remainingColumns = visibleCols.slice(1);

  return (
    <div className="bg-white border rounded-md">
      <div className="relative overflow-hidden">
        <div className="flex">
          {/* Fixed first column */}
          {firstColumn && (
            <div className="flex-shrink-0 bg-white border-r border-gray-200 z-10">
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    <TableHead 
                      onClick={() => handleSort(firstColumn.id)}
                      className="cursor-pointer hover:bg-gray-100"
                      style={{ width: getColumnWidth(firstColumn.id), minWidth: getColumnWidth(firstColumn.id) }}
                    >
                      <div className="flex items-center">
                        <span>{firstColumn.label}</span>
                        {renderSortIcon(firstColumn.id)}
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getSortedCases().map((caseItem, index) => (
                    <TableRow 
                      key={index} 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleRowClick(caseItem.id)}
                    >
                      <TableCell style={{ width: getColumnWidth(firstColumn.id), minWidth: getColumnWidth(firstColumn.id) }}>
                        {firstColumn.id === 'id' && caseItem.id}
                        {firstColumn.id === 'address' && caseItem.address}
                        {firstColumn.id === 'status' && (
                          <CaseStatusBadge status={caseItem.status} />
                        )}
                        {firstColumn.id === 'type' && caseItem.type}
                        {firstColumn.id === 'owner' && (
                          <>
                            <div className="text-sm text-gray-500">{caseItem.owner.type}</div>
                            <div>{caseItem.owner.name}</div>
                          </>
                        )}
                        {firstColumn.id === 'lastInspected' && caseItem.lastInspected}
                        {firstColumn.id === 'inspectionDate' && formatInspectionDate(caseItem.appointment?.date, caseItem.appointment?.time)}
                        {firstColumn.id === 'vehicle' && caseItem.vehicle && (
                          <>
                            <div>{caseItem.vehicle.make} {caseItem.vehicle.model}</div>
                            <div className="text-sm text-gray-500">{caseItem.vehicle.year}</div>
                          </>
                        )}
                        {firstColumn.id === 'vin' && caseItem.vehicle?.vin}
                        {firstColumn.id === 'licensePlate' && caseItem.vehicle?.licensePlate}
                        {firstColumn.id === 'mechanic' && caseItem.mechanic?.name}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Scrollable remaining columns */}
          {remainingColumns.length > 0 && (
            <div className="flex-1 overflow-x-auto relative">
              {/* Right shadow indicator */}
              <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white/80 to-transparent pointer-events-none z-10" />
              
              <Table>
                <TableHeader className="bg-gray-50">
                  <TableRow>
                    {remainingColumns.map(column => (
                      <TableHead 
                        key={column.id}
                        onClick={() => handleSort(column.id)}
                        className="cursor-pointer hover:bg-gray-100"
                        style={{ width: getColumnWidth(column.id), minWidth: getColumnWidth(column.id) }}
                      >
                        <div className="flex items-center">
                          <span>{column.label}</span>
                          {renderSortIcon(column.id)}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getSortedCases().map((caseItem, index) => (
                    <TableRow 
                      key={index} 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => handleRowClick(caseItem.id)}
                    >
                      {remainingColumns.map(column => (
                        <TableCell 
                          key={column.id}
                          style={{ width: getColumnWidth(column.id), minWidth: getColumnWidth(column.id) }}
                        >
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
                          {column.id === 'inspectionDate' && formatInspectionDate(caseItem.appointment?.date, caseItem.appointment?.time)}
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
          )}
        </div>
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
