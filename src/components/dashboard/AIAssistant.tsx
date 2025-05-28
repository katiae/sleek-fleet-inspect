
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send } from "lucide-react";

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
    <Card className="flex-1">
      <CardHeader>
        <h3 className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          AI assistant
        </h3>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-4 h-full flex flex-col">
          <div className="bg-purple-50 p-3 rounded-lg">
            <p className="text-sm text-purple-800">
              💡 Based on your schedule, I recommend prioritizing the brake inspection at 156 Oak Avenue due to safety concerns.
            </p>
          </div>
          <form onSubmit={handleAiSubmit} className="space-y-2 mt-auto">
            <Input 
              placeholder="Ask me anything?" 
              value={aiQuery} 
              onChange={e => setAiQuery(e.target.value)} 
            />
            <button 
              type="submit" 
              className="ai-ask-button w-full"
            >
              <Send className="w-4 h-4 mr-2" />
              Ask AI
            </button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};
