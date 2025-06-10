
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
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
  const [aiResponse, setAiResponse] = useState([
    {
      icon: "💡",
      text: "Based on your schedule, I recommend prioritizing the brake inspection at 156 Oak Avenue due to safety concerns."
    },
    {
      icon: "🔧",
      text: "Consider scheduling the emissions test for vehicle #A1234 this afternoon while the weather is clear."
    },
    {
      icon: "⚡",
      text: "You have 3 pending diagnostic reports that need review before end of day."
    }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    // Simulate AI processing
    const query = aiQuery.toLowerCase();
    let response = [];

    if (query.includes('case') || query.includes('inspection') || query.includes('brake')) {
      response = [
        {
          icon: "🔍",
          text: "I found 3 active cases requiring attention. The brake inspection at Baker Street is high priority due to safety concerns."
        },
        {
          icon: "📋",
          text: "Case #A1234 has pending emissions testing scheduled for today at 2:00 PM."
        },
        {
          icon: "⚠️",
          text: "Two cases have overdue diagnostic reports that need immediate review."
        }
      ];
    } else if (query.includes('task') || query.includes('todo') || query.includes('schedule')) {
      response = [
        {
          icon: "✅",
          text: "You have 5 tasks scheduled for today. 2 are completed, 3 are pending."
        },
        {
          icon: "🕐",
          text: "Next task: Emissions testing at Oak Avenue starts in 30 minutes."
        },
        {
          icon: "📊",
          text: "Weekly task completion rate: 87%. You're ahead of schedule!"
        }
      ];
    } else if (query.includes('appointment') || query.includes('meeting')) {
      response = [
        {
          icon: "📅",
          text: "You have 2 appointments today. Next one is brake inspection at 2:00 PM."
        },
        {
          icon: "🚗",
          text: "Customer Sarah Johnson confirmed her 3:30 PM appointment for vehicle diagnostics."
        },
        {
          icon: "📞",
          text: "Reminder: Call Mr. Smith to reschedule his emissions test appointment."
        }
      ];
    } else {
      response = [
        {
          icon: "🤔",
          text: `I understand you're asking about "${aiQuery}". Let me help you with that.`
        },
        {
          icon: "📈",
          text: "Based on current data, I recommend focusing on high-priority safety inspections first."
        },
        {
          icon: "💼",
          text: "Would you like me to provide more specific information about your cases or tasks?"
        }
      ];
    }

    setAiResponse(response);
    handleAiSubmit(e);
  };

  return (
    <Card className="flex-1 flex flex-col">
      <CardHeader>
        <h3 className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-600" />
          AI assistant
        </h3>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col space-y-6">
          <div className="bg-purple-50 p-4 rounded-lg space-y-4">
            {aiResponse.map((item, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="text-sm">{item.icon}</span>
                <p className="text-sm text-purple-800 flex-1">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4">
            <Textarea 
              placeholder="Ask me anything..." 
              value={aiQuery} 
              onChange={e => setAiQuery(e.target.value)} 
              className="resize-none xl:flex-1 xl:min-h-[120px] min-h-[32px]"
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
