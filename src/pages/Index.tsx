import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { SponsorsSection } from "@/components/sections/SponsorsSection";
import { YieldDashboard } from "@/components/sections/YieldDashboard";
import { AIAgentChat } from "@/components/sections/AIAgentChat";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <YieldDashboard />
        <SponsorsSection />
        <AIAgentChat />
      </main>
    </div>
  );
};

export default Index;