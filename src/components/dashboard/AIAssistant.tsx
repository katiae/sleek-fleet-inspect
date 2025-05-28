
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, MessageCircle } from "lucide-react";

interface AIAssistantProps {
  aiQuery: string;
  setAiQuery: (query: string) => void;
  handleAiSubmit: (e: React.FormEvent) => void;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  aiQuery,
  setAiQuery,
  handleAiSubmit,
}) => {
  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader>
        <h3 className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          AI assistant
        </h3>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col justify-between space-y-4">
          <div className="bg-purple-50 p-3 rounded-lg space-y-3 flex-1 flex flex-col justify-center">
            <div className="flex items-start gap-2">
              <span className="text-sm">💡</span>
              <p className="text-sm text-purple-800 flex-1">
                Based on your schedule, I recommend prioritizing the brake inspection at 156 Oak Avenue due to safety concerns.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-sm">🔧</span>
              <p className="text-sm text-purple-800 flex-1">
                Consider scheduling the emissions test for vehicle #A1234 this afternoon while the weather is clear.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-sm">⚡</span>
              <p className="text-sm text-purple-800 flex-1">
                You have 3 pending diagnostic reports that need review before end of day.
              </p>
            </div>
          </div>
          <form onSubmit={handleAiSubmit} className="space-y-2">
            <Input 
              placeholder="Ask me anything..." 
              value={aiQuery} 
              onChange={e => setAiQuery(e.target.value)} 
            />
            <button 
              type="submit" 
              className="ai-ask-button w-full"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              Ask AI
            </button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};
