import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SponsorsSection } from "@/components/sections/SponsorsSection";
import { YieldDashboard } from "@/components/sections/YieldDashboard";
import { AIAgentChat } from "@/components/sections/AIAgentChat";
import { Footer } from "@/components/layout/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <YieldDashboard />
        <SponsorsSection />
        <AIAgentChat />
      </main>
      <Footer />
    </div>
  );
};

export default Index;