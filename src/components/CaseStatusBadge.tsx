
import React from "react";
import { CaseStatus } from "@/lib/data";

interface CaseStatusBadgeProps {
  status: CaseStatus;
}

export const CaseStatusBadge: React.FC<CaseStatusBadgeProps> = ({ status }) => {
  const getStatusStyle = () => {
    switch (status) {
      case "NEW":
        return "bg-blue-100 text-blue-700";
      case "PENDING":
        return "bg-purple-100 text-purple-700";
      case "APPROVED":
        return "bg-purple-100 text-purple-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      case "EXPIRED":
        return "bg-gray-100 text-gray-700";
      case "SUSPENDED":
        return "bg-amber-100 text-amber-700";
      case "UNDER REVIEW":
        return "bg-indigo-100 text-indigo-700";
      case "COMPLETED":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${getStatusStyle()}`}>
      {status}
    </span>
  );
};
