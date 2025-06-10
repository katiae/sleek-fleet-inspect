
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, MessageCircle, ExternalLink } from "lucide-react";

interface AIAssistantProps {
  aiQuery: string;
  setAiQuery: (query: string) => void;
  handleAiSubmit: (e: React.FormEvent) => void;
}

interface AIResponseItem {
  icon: string;
  text: string;
  links?: Array<{
    text: string;
    url: string;
    type: 'case' | 'task' | 'appointment';
  }>;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({
  aiQuery,
  setAiQuery,
  handleAiSubmit,
}) => {
  const [aiResponse, setAiResponse] = useState<AIResponseItem[]>([
    {
      icon: "💡",
      text: "Based on your schedule, I recommend prioritizing the brake inspection at 156 Oak Avenue due to safety concerns.",
      links: [
        { text: "View brake inspection case", url: "/cases/1", type: "case" }
      ]
    },
    {
      icon: "🔧",
      text: "Consider scheduling the emissions test for vehicle #A1234 this afternoon while the weather is clear.",
      links: [
        { text: "View emissions task", url: "/dashboard", type: "task" }
      ]
    },
    {
      icon: "⚡",
      text: "You have 3 pending diagnostic reports that need review before end of day.",
      links: [
        { text: "View all tasks", url: "/dashboard", type: "task" }
      ]
    }
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    // Simulate AI processing
    const query = aiQuery.toLowerCase();
    let response: AIResponseItem[] = [];

    if (query.includes('case') || query.includes('inspection') || query.includes('brake')) {
      response = [
        {
          icon: "🔍",
          text: "I found 3 active cases requiring attention. The brake inspection at Baker Street is high priority due to safety concerns.",
          links: [
            { text: "View brake inspection case", url: "/cases/1", type: "case" },
            { text: "View all cases", url: "/cases", type: "case" }
          ]
        },
        {
          icon: "📋",
          text: "Case #A1234 has pending emissions testing scheduled for today at 2:00 PM.",
          links: [
            { text: "View case details", url: "/cases/2", type: "case" },
            { text: "View appointment", url: "/cases/2", type: "appointment" }
          ]
        },
        {
          icon: "⚠️",
          text: "Two cases have overdue diagnostic reports that need immediate review.",
          links: [
            { text: "View diagnostic tasks", url: "/dashboard", type: "task" }
          ]
        }
      ];
    } else if (query.includes('task') || query.includes('todo') || query.includes('schedule')) {
      response = [
        {
          icon: "✅",
          text: "You have 5 tasks scheduled for today. 2 are completed, 3 are pending.",
          links: [
            { text: "View today's tasks", url: "/dashboard", type: "task" }
          ]
        },
        {
          icon: "🕐",
          text: "Next task: Emissions testing at Oak Avenue starts in 30 minutes.",
          links: [
            { text: "View emissions task", url: "/dashboard", type: "task" },
            { text: "View related case", url: "/cases/2", type: "case" }
          ]
        },
        {
          icon: "📊",
          text: "Weekly task completion rate: 87%. You're ahead of schedule!",
          links: [
            { text: "View task analytics", url: "/dashboard", type: "task" }
          ]
        }
      ];
    } else if (query.includes('appointment') || query.includes('meeting')) {
      response = [
        {
          icon: "📅",
          text: "You have 2 appointments today. Next one is brake inspection at 2:00 PM.",
          links: [
            { text: "View brake inspection", url: "/cases/1", type: "appointment" }
          ]
        },
        {
          icon: "🚗",
          text: "Customer Sarah Johnson confirmed her 3:30 PM appointment for vehicle diagnostics.",
          links: [
            { text: "View appointment details", url: "/cases/3", type: "appointment" }
          ]
        },
        {
          icon: "📞",
          text: "Reminder: Call Mr. Smith to reschedule his emissions test appointment.",
          links: [
            { text: "View Mr. Smith's case", url: "/cases/2", type: "case" }
          ]
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
          text: "Based on current data, I recommend focusing on high-priority safety inspections first.",
          links: [
            { text: "View priority cases", url: "/cases", type: "case" }
          ]
        },
        {
          icon: "💼",
          text: "Would you like me to provide more specific information about your cases or tasks?",
          links: [
            { text: "View all cases", url: "/cases", type: "case" },
            { text: "View all tasks", url: "/dashboard", type: "task" }
          ]
        }
      ];
    }

    setAiResponse(response);
    handleAiSubmit(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const formEvent = new Event('submit', { bubbles: true, cancelable: true }) as any;
      handleSubmit(formEvent);
    }
  };

  const handleLinkClick = (url: string) => {
    // Navigate to the URL - in a real app this would use React Router
    window.location.href = url;
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
              <div key={index} className="space-y-2">
                <div className="flex items-start gap-2">
                  <span className="text-sm">{item.icon}</span>
                  <p className="text-sm text-purple-800 flex-1">
                    {item.text}
                  </p>
                </div>
                {item.links && item.links.length > 0 && (
                  <div className="ml-6 flex flex-wrap gap-2">
                    {item.links.map((link, linkIndex) => (
                      <button
                        key={linkIndex}
                        onClick={() => handleLinkClick(link.url)}
                        className="inline-flex items-center gap-1 text-xs text-purple-600 hover:text-purple-800 hover:underline transition-colors"
                      >
                        <ExternalLink className="w-3 h-3" />
                        {link.text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4">
            <Textarea 
              placeholder="Ask me anything..." 
              value={aiQuery} 
              onChange={e => setAiQuery(e.target.value)}
              onKeyDown={handleKeyDown}
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
