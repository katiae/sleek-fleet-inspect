import React, { useState } from "react";
import { useCapabilities } from "@/context/CapabilitiesContext";
import { toast } from "@/hooks/use-toast";
import { CapabilitiesHeader } from "./CapabilitiesHeader";
import { CapabilitySearch } from "./CapabilitySearch";
import { CapabilitiesGrid } from "./CapabilitiesGrid";
import { RemoveCapabilityDialog } from "./RemoveCapabilityDialog";
import { Button } from "@/components/ui/button";
export const CapabilitiesContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    capabilities,
    setCapabilities
  } = useCapabilities();
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  const filteredCapabilities = capabilities.filter(capability => capability.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const handleAddToSection = (id: string, section: "Administration" | "Main") => {
    const capability = capabilities.find(cap => cap.id === id);
    if (!capability) return;
    setCapabilities(capabilities.map(cap => {
      if (cap.id === id) {
        // Show toast notification
        toast({
          title: `${cap.name} added to ${section}`,
          description: `The capability is now available in the ${section} section`,
          duration: 3000
        });
        return {
          ...cap,
          active: true,
          section: section
        };
      }
      return cap;
    }));
  };
  const openRemoveConfirmation = (id: string) => {
    setConfirmRemoveId(id);
  };
  const handleRemove = () => {
    if (!confirmRemoveId) return;
    const capabilityToRemove = capabilities.find(c => c.id === confirmRemoveId);
    setCapabilities(capabilities.map(capability => {
      if (capability.id === confirmRemoveId) {
        // Show toast notification
        toast({
          title: `${capability.name} removed`,
          description: "The capability has been removed from all sections",
          duration: 3000
        });
        return {
          ...capability,
          active: false,
          section: null
        };
      }
      return capability;
    }));

    // Close the dialog
    setConfirmRemoveId(null);
  };
  const cancelRemove = () => {
    setConfirmRemoveId(null);
  };
  const handleContactClick = () => {
    toast({
      title: "Contact Us",
      description: "Our team will reach out to discuss additional capabilities for your account.",
      duration: 5000
    });
  };
  return <div className="container mx-auto max-w-6xl">
      <CapabilitiesHeader />
      <CapabilitySearch searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      
      <div className="mb-6 mt-3 bg-gradient-to-r from-orange-50 to-white p-4 rounded-lg border border-orange-100">
        <div className="flex flex-row items-center justify-between">
          <div className="flex-grow">
            <h3 className="text-base font-medium text-gray-900 mb-1">Need more capabilities?</h3>
            <p className="text-sm text-slate-950">Contact our team to explore premium solutions tailored for your business needs.</p>
          </div>
          <Button onClick={handleContactClick} className="bg-orange-500 hover:bg-orange-600 text-white text-sm py-1 h-8 ml-4 whitespace-nowrap">
            Contact us for more options
          </Button>
        </div>
      </div>
      
      <CapabilitiesGrid capabilities={filteredCapabilities} onRemove={openRemoveConfirmation} onAddToSection={handleAddToSection} />

      <RemoveCapabilityDialog isOpen={!!confirmRemoveId} onCancel={cancelRemove} onConfirm={handleRemove} />
    </div>;
};