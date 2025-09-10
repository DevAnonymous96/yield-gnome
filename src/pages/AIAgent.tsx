import { Header } from "@/components/layout/Header";
import { AIAgentChat } from "@/components/sections/AIAgentChat";

const AIAgent = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            AI Yield Agent
          </h1>
          <p className="text-muted-foreground">
            Get personalized yield farming recommendations and portfolio optimization
          </p>
        </div>
        <AIAgentChat />
      </main>
    </div>
  );
};

export default AIAgent;