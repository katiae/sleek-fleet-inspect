
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare } from "lucide-react";

interface QuickNotesProps {
  notes: string;
  setNotes: (notes: string) => void;
}

export const QuickNotes: React.FC<QuickNotesProps> = ({
  notes,
  setNotes,
}) => {
  return (
    <Card className="flex-1">
      <CardHeader>
        <h3 className="flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Quick notes
        </h3>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="h-full flex flex-col">
          <Textarea 
            placeholder="Jot down quick notes, reminders, or observations..." 
            value={notes} 
            onChange={e => setNotes(e.target.value)} 
            className="flex-1 resize-none" 
          />
          <Button size="sm" className="mt-2 w-full" variant="outline">
            Save Notes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
