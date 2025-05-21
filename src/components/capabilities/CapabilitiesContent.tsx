
import React, { useState } from "react";
import { useCapabilities } from "@/context/CapabilitiesContext";
import { CapabilitiesHeader } from "./CapabilitiesHeader";
import { CapabilitySearch } from "./CapabilitySearch";
import { CapabilitiesGrid } from "./CapabilitiesGrid";
import { RemoveCapabilityDialog } from "./RemoveCapabilityDialog";

export const CapabilitiesContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { capabilities, addCapabilityToSection, removeCapability } = useCapabilities();
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCapabilities = capabilities.filter((capability) =>
    capability.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToSection = (id: string, section: "Administration" | "Main") => {
    addCapabilityToSection(id, section);
  };

  const openRemoveConfirmation = (id: string) => {
    setConfirmRemoveId(id);
  };

  const handleRemove = () => {
    if (!confirmRemoveId) return;
    removeCapability(confirmRemoveId);
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
