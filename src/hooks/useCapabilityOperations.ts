
import { useState } from "react";
import { Capability, initialCapabilities } from "@/data/capabilities";
import { toast } from "@/hooks/use-toast";

export const useCapabilityOperations = () => {
  const [capabilities, setCapabilities] = useState<Capability[]>(initialCapabilities);

  const addCapabilityToSection = (id: string, section: "Administration" | "Main") => {
    const capability = capabilities.find(cap => cap.id === id);
    
    if (!capability) return;
    
    setCapabilities(
      capabilities.map((cap) => {
        if (cap.id === id) {
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

  const removeCapability = (id: string) => {
    const capability = capabilities.find(cap => cap.id === id);
    
    if (!capability) return;
    
    setCapabilities(
      capabilities.map((cap) => {
        if (cap.id === id) {
          toast({
            title: `${cap.name} removed`,
            description: "The capability has been removed from all sections",
            duration: 3000,
          });
          
          return { ...cap, active: false, section: null };
        }
        return cap;
      })
    );
  };

  return {
    capabilities,
    setCapabilities,
    addCapabilityToSection,
    removeCapability
  };
};
