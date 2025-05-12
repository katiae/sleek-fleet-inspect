
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Globe, FileText, Database, Shield, Workflow, Search as SearchIcon } from "lucide-react";

export type CapabilitySection = "Administration" | "Main" | null;

export type Capability = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  active: boolean;
  bgColor: string;
  section?: CapabilitySection;
};

interface CapabilitiesContextType {
  capabilities: Capability[];
  setCapabilities: React.Dispatch<React.SetStateAction<Capability[]>>;
}

const CapabilitiesContext = createContext<CapabilitiesContextType | undefined>(undefined);

export const CapabilitiesProvider = ({ children }: { children: ReactNode }) => {
  const [capabilities, setCapabilities] = useState<Capability[]>([
    {
      id: "api-integration",
      name: "API Integration",
      description: "Connect with external services through secure API endpoints",
      icon: <Globe className="h-6 w-6 text-gray-700" />,
      active: false,
      bgColor: "bg-blue-100",
      section: null,
    },
    {
      id: "document-processing",
      name: "Document Processing",
      description: "Automatic extraction and analysis from uploaded documents",
      icon: <FileText className="h-6 w-6 text-gray-700" />,
      active: false,
      bgColor: "bg-purple-100",
      section: null,
    },
    {
      id: "data-analytics",
      name: "Data Analytics",
      description: "Advanced analytics and insights for your case data",
      icon: <Database className="h-6 w-6 text-gray-700" />,
      active: true,
      bgColor: "bg-green-100",
      section: "Main",
    },
    {
      id: "security-compliance",
      name: "Security & Compliance",
      description: "Enhanced security protocols and compliance features",
      icon: <Shield className="h-6 w-6 text-gray-700" />,
      active: false,
      bgColor: "bg-red-100",
      section: null,
    },
    {
      id: "automated-workflows",
      name: "Automated Workflows",
      description: "Create and manage automated workflows for case processing",
      icon: <Workflow className="h-6 w-6 text-gray-700" />,
      active: false,
      bgColor: "bg-amber-100",
      section: null,
    },
    {
      id: "searches",
      name: "Searches",
      description: "Advanced search capabilities across all your case documents",
      icon: <SearchIcon className="h-6 w-6 text-gray-700" />,
      active: false,
      bgColor: "bg-indigo-100",
      section: null,
    },
  ]);

  return (
    <CapabilitiesContext.Provider value={{ capabilities, setCapabilities }}>
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
