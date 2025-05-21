
import React, { createContext, useContext, ReactNode } from "react";
import { Capability } from "@/data/capabilities";
import { useCapabilityOperations } from "@/hooks/useCapabilityOperations";

interface CapabilitiesContextType {
  capabilities: Capability[];
  setCapabilities: React.Dispatch<React.SetStateAction<Capability[]>>;
  addCapabilityToSection: (id: string, section: "Administration" | "Main") => void;
  removeCapability: (id: string) => void;
}

const CapabilitiesContext = createContext<CapabilitiesContextType | undefined>(undefined);

export const CapabilitiesProvider = ({ children }: { children: ReactNode }) => {
  const { capabilities, setCapabilities, addCapabilityToSection, removeCapability } = useCapabilityOperations();

  return (
    <CapabilitiesContext.Provider value={{ 
      capabilities, 
      setCapabilities,
      addCapabilityToSection,
      removeCapability
    }}>
      {children}
    </CapabilitiesContext.Provider>
  );
};

export const useCapabilities = () => {
  const context = useContext(CapabilitiesContext);
  if (context === undefined) {
    throw new Error("useCapabilities must be used within a CapabilitiesProvider");
  }
  return context;
};

// Re-export the types from data module for backward compatibility
export type { Capability, CapabilitySection } from "@/data/capabilities";
