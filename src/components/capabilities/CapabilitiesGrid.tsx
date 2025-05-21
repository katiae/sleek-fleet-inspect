
import React from "react";
import { CapabilityCard } from "./CapabilityCard";
import { Capability } from "@/context/CapabilitiesContext";

interface CapabilitiesGridProps {
  capabilities: Capability[];
  onRemove: (id: string) => void;
  onAddToSection: (id: string, section: "Main" | "Administration") => void;
}

export const CapabilitiesGrid: React.FC<CapabilitiesGridProps> = ({ 
  capabilities, 
  onRemove, 
  onAddToSection 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {capabilities.map((capability) => (
        <CapabilityCard 
          key={capability.id}
          capability={capability}
          onRemove={onRemove}
          onAddToSection={onAddToSection}
        />
      ))}
      
      {capabilities.length === 0 && (
        <div className="col-span-3 text-center py-10 text-gray-500">
          No capabilities found matching your search.
        </div>
      )}
    </div>
  );
};
