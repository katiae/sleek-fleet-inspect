
import React, { useState } from "react";
import { useCapabilities } from "@/context/CapabilitiesContext";
import { toast } from "@/hooks/use-toast";
import { CapabilitiesHeader } from "./CapabilitiesHeader";
import { CapabilitySearch } from "./CapabilitySearch";
import { CapabilitiesGrid } from "./CapabilitiesGrid";
import { RemoveCapabilityDialog } from "./RemoveCapabilityDialog";

export const CapabilitiesContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { capabilities, setCapabilities } = useCapabilities();
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCapabilities = capabilities.filter((capability) =>
    capability.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToSection = (id: string, section: "Administration" | "Main") => {
    const capability = capabilities.find(cap => cap.id === id);
    
    if (!capability) return;
    
    setCapabilities(
      capabilities.map((cap) => {
        if (cap.id === id) {
          // Show toast notification
          toast({
            title: `${cap.name} added to ${section}`,
            description: `The capability is now available in the ${section} section`,
            duration: 3000,
          });
          
          return { ...cap, active: true, section: section };
        }
        return cap;
      })
    );
  };

  const openRemoveConfirmation = (id: string) => {
    setConfirmRemoveId(id);
  };

  const handleRemove = () => {
    if (!confirmRemoveId) return;
    
    const capabilityToRemove = capabilities.find(c => c.id === confirmRemoveId);
    
    setCapabilities(
      capabilities.map((capability) => {
        if (capability.id === confirmRemoveId) {
          // Show toast notification
          toast({
            title: `${capability.name} removed`,
            description: "The capability has been removed from all sections",
            duration: 3000,
          });
          
          return { ...capability, active: false, section: null };
        }
        return capability;
      })
    );
    
    // Close the dialog
    setConfirmRemoveId(null);
  };

  const cancelRemove = () => {
    setConfirmRemoveId(null);
  };

  return (
    <div className="container mx-auto max-w-6xl">
      <CapabilitiesHeader />
      <CapabilitySearch 
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
      />
      <CapabilitiesGrid
        capabilities={filteredCapabilities}
        onRemove={openRemoveConfirmation}
        onAddToSection={handleAddToSection}
      />

      <RemoveCapabilityDialog
        isOpen={!!confirmRemoveId}
        onCancel={cancelRemove}
        onConfirm={handleRemove}
      />
    </div>
  );
};
