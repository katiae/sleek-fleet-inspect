import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Search, FileText, Database, Globe, Shield, Workflow, SearchIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Capability = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  active: boolean;
  bgColor: string;
  section?: "Administration" | "Main" | null;
};

export const CapabilitiesContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCapabilities = capabilities.filter((capability) =>
    capability.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToSection = (id: string, section: "Administration" | "Main") => {
    setCapabilities(
      capabilities.map((capability) => {
        if (capability.id === id) {
          const newState = true;
          const newSection = section;
          
          // Show toast notification
          toast({
            title: `${capability.name} added to ${section}`,
            description: `The capability is now available in the ${section} section`,
            duration: 3000,
          });
          
          return { ...capability, active: newState, section: newSection };
        }
        return capability;
      })
    );
  };

  const handleRemove = (id: string) => {
    setCapabilities(
      capabilities.map((capability) => {
        if (capability.id === id) {
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
  };

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Capabilities</h1>
        <p className="text-gray-500">Enhance your workflow with these powerful features</p>
      </div>
      
      <div className="relative mb-8 max-w-md mx-auto">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search capabilities..."
          className="pl-10 pr-4"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCapabilities.map((capability) => (
          <Card key={capability.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="p-6 flex flex-col h-full">
              <div className="mb-4">
                <div className={`${capability.bgColor} w-12 h-12 rounded-lg flex items-center justify-center shadow-sm`}>
                  {capability.icon}
                </div>
              </div>
              <h3 className="font-semibold text-lg mb-2">{capability.name}</h3>
              <p className="text-gray-500 text-sm flex-grow mb-4">{capability.description}</p>
              <Separator className="my-4" />
              <CardFooter className="p-0 flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {capability.section ? `In ${capability.section}` : "Not added"}
                </span>
                
                {capability.active ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleRemove(capability.id)}
                    className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                  >
                    Remove
                  </Button>
                ) : (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        size="sm" 
                        className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                      >
                        Add
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleAddToSection(capability.id, "Main")}>
                        Add to Main
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAddToSection(capability.id, "Administration")}>
                        Add to Administration
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </CardFooter>
            </div>
          </Card>
        ))}
        
        {filteredCapabilities.length === 0 && (
          <div className="col-span-3 text-center py-10 text-gray-500">
            No capabilities found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};
