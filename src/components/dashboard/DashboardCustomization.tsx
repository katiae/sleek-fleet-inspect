
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

export interface DashboardCard {
  id: string;
  label: string;
  visible: boolean;
  description?: string;
}

interface DashboardCustomizationProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  cards: DashboardCard[];
  onCardToggle: (cardId: string) => void;
  onSave: () => void;
  onReset: () => void;
}

export const DashboardCustomization: React.FC<DashboardCustomizationProps> = ({
  isOpen,
  onOpenChange,
  cards,
  onCardToggle,
  onSave,
  onReset,
}) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Customize dashboard</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Widgets</h3>
            <p className="text-sm text-gray-500 mb-4">
              Choose which cards to display on your dashboard. You can show or hide them as needed.
            </p>
          </div>

          <Card>
            <CardContent className="p-4 space-y-4">
              {cards.map((card) => (
                <div key={card.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {card.label}
                    </div>
                    {card.description && (
                      <div className="text-xs text-gray-500 mt-1">
                        {card.description}
                      </div>
                    )}
                  </div>
                  <Switch
                    checked={card.visible}
                    onCheckedChange={() => onCardToggle(card.id)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Separator />

          <div className="flex flex-col space-y-2">
            <Button onClick={onSave} className="w-full">
              Save changes
            </Button>
            <Button variant="outline" onClick={onReset} className="w-full">
              Reset to default
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
