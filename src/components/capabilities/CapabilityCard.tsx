
import React from "react";
import { Card, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { Capability } from "@/context/CapabilitiesContext";
import { Crown } from "lucide-react";

interface CapabilityCardProps {
  capability: Capability;
  onRemove: (id: string) => void;
  onAddToSection: (id: string, section: "Main" | "Administration") => void;
}

export const CapabilityCard: React.FC<CapabilityCardProps> = ({ 
  capability, 
  onRemove, 
  onAddToSection 
}) => {
  const handlePremiumClick = () => {
    toast({
      title: "Premium Solution",
      description: "Contact us to add this premium solution to your account",
      duration: 5000,
    });
  };

  return (
    <Card 
      key={capability.id} 
      className={`overflow-hidden transition-shadow duration-200 ${
        capability.premium 
          ? "border-dashed border-gray-300 bg-gray-50/50 opacity-85" 
          : "hover:shadow-md"
      }`}
    >
      <div className={`p-6 flex flex-col h-full ${capability.premium ? "opacity-80" : ""}`}>
        <div className="mb-4 relative">
          <div className={`${capability.bgColor} w-12 h-12 rounded-lg flex items-center justify-center shadow-sm ${
            capability.premium ? "opacity-70" : ""
          }`}>
            {capability.icon}
          </div>
          {capability.premium && (
            <div className="absolute -top-1 -right-1 bg-amber-500 text-white p-1 rounded-full">
              <Crown className="h-4 w-4" />
            </div>
          )}
        </div>
        <h3 className="font-semibold text-lg mb-2 flex items-center">
          {capability.name}
        </h3>
        <p className={`text-gray-500 text-sm flex-grow mb-4 ${capability.premium ? "text-gray-400" : ""}`}>
          {capability.description}
        </p>
        <Separator className="my-4" />
        <CardFooter className="p-0 flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {capability.premium ? "Contact us to unlock" : capability.section ? `In ${capability.section}` : "Not added"}
          </span>
          
          {capability.active ? (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onRemove(capability.id)}
              className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              Remove
            </Button>
          ) : !capability.premium && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  size="sm" 
                  className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                >
                  Add
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="p-2">
                <DropdownMenuItem 
                  onClick={() => onAddToSection(capability.id, "Main")}
                  className="py-2.5 px-4 cursor-pointer"
                >
                  Add to Main
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onAddToSection(capability.id, "Administration")}
                  className="py-2.5 px-4 cursor-pointer"
                >
                  Add to Administration
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </CardFooter>
      </div>
    </Card>
  );
};
