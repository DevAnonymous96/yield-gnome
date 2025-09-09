import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Bot, User, Send, TrendingUp, AlertTriangle, Info } from "lucide-react";

const chatMessages = [
  {
    type: "bot",
    message: "Hello! I'm your AI yield optimization assistant. I've analyzed your portfolio and found 3 optimization opportunities. Would you like me to explain them?",
    timestamp: "2 min ago"
  },
  {
    type: "user", 
    message: "Yes, show me the opportunities",
    timestamp: "2 min ago"
  },
  {
    type: "bot",
    message: "Great! Here are the top opportunities:\n\n1. **Aave V3 USDC**: Currently offering 12.45% APY (up 2.3% from yesterday)\n2. **Curve 3CRV Pool**: 18.75% APY with low impermanent loss risk\n3. **Yearn WBTC Vault**: 15.33% APY with automated compounding\n\nI recommend starting with Aave V3 USDC for its stability and recent rate increase.",
    timestamp: "1 min ago",
    suggestions: [
      { text: "Move 50% to Aave V3", type: "success" },
      { text: "Analyze risks", type: "warning" },
      { text: "Auto-execute", type: "info" }
    ]
  }
];

export const AIAgentChat = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState(chatMessages);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        type: "user" as const,
        message: inputMessage,
        timestamp: "now"
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          type: "bot" as const,
          message: "I'm analyzing your request and current market conditions. This will take a moment...",
          timestamp: "now"
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "success": return <TrendingUp className="h-4 w-4" />;
      case "warning": return <AlertTriangle className="h-4 w-4" />;
      case "info": return <Info className="h-4 w-4" />;
      default: return <Bot className="h-4 w-4" />;
    }
  };

  const getSuggestionColor = (type: string) => {
    switch (type) {
      case "success": return "bg-success/20 text-success border-success/30 hover:bg-success/30";
      case "warning": return "bg-warning/20 text-warning border-warning/30 hover:bg-warning/30";
      case "info": return "bg-info/20 text-info border-info/30 hover:bg-info/30";
      default: return "bg-primary/20 text-primary border-primary/30 hover:bg-primary/30";
    }
  };

  return (
    <section id="ai-agent" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-primary mb-4">
            <Bot className="h-6 w-6 animate-float" />
            <span className="text-sm font-medium uppercase tracking-wider">
              AI Assistant
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Chat with Your <span className="gradient-text">AI Advisor</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get personalized yield strategies, risk analysis, and real-time optimization 
            recommendations from our advanced AI agent.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="glass card-shadow h-[600px] flex flex-col">
            <CardHeader className="border-b border-border/50">
              <CardTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <span>YieldBot AI Assistant</span>
                <Badge className="bg-success/20 text-success border-success/30">
                  Online
                </Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-0">
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${msg.type === 'user' ? 'order-1' : ''}`}>
                      <div className={`flex items-start space-x-3 ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          msg.type === 'user' 
                            ? 'bg-muted/30' 
                            : 'bg-primary/20'
                        }`}>
                          {msg.type === 'user' ? (
                            <User className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <Bot className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        
                        <div className={`${msg.type === 'user' ? 'text-right' : ''}`}>
                          <div className={`p-4 rounded-lg ${
                            msg.type === 'user'
                              ? 'bg-primary/20 text-primary-foreground'
                              : 'glass'
                          }`}>
                            <p className="text-sm leading-relaxed whitespace-pre-line">
                              {msg.message}
                            </p>
                          </div>
                          
                          {msg.suggestions && (
                            <div className="mt-3 space-y-2">
                              {msg.suggestions.map((suggestion, idx) => (
                                <Button
                                  key={idx}
                                  variant="outline"
                                  size="sm"
                                  className={`${getSuggestionColor(suggestion.type)} transition-all duration-200`}
                                >
                                  {getSuggestionIcon(suggestion.type)}
                                  {suggestion.text}
                                </Button>
                              ))}
                            </div>
                          )}
                          
                          <div className="text-xs text-muted-foreground mt-2">
                            {msg.timestamp}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-border/50 p-6">
                <div className="flex space-x-4">
                  <Input
                    placeholder="Ask about yield strategies, risk analysis, or optimization..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 glass"
                  />
                  <Button 
                    variant="hero" 
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button variant="ghost" size="sm" className="text-xs">
                    "Optimize my portfolio"
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    "What's the risk of Curve pools?"
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    "Show me stablecoin yields"
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};