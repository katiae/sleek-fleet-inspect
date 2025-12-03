import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export type RAGStatus = "Red" | "Amber" | "Green";

export interface RiskResult {
  type: string;
  ragStatus: RAGStatus;
  guidance: string;
}

interface RiskResultCardProps {
  title?: string;
  risks: RiskResult[];
}

const getRAGBadgeStyles = (status: RAGStatus) => {
  switch (status) {
    case "Red":
      return "bg-red-100 text-red-800";
    case "Amber":
      return "bg-amber-100 text-amber-800";
    case "Green":
      return "bg-green-100 text-green-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const RiskResultCard: React.FC<RiskResultCardProps> = ({ 
  title = "Risk results", 
  risks 
}) => {
  if (!risks || risks.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-medium">{title}</h3>
          </div>
          <p className="text-gray-500 text-center my-6">
            No risk results available.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-medium">{title}</h3>
        </div>
        <div className="space-y-6">
          {risks.map((risk, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Risk level:</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRAGBadgeStyles(risk.ragStatus)}`}>
                  {risk.ragStatus}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm text-gray-500">Guidance:</span>
                <span className="text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                  {risk.guidance}
                </span>
              </div>
              {index < risks.length - 1 && (
                <div className="border-t border-gray-100 pt-3" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
