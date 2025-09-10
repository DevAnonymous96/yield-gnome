import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
      </main>
    </div>
  );
};

export default Index;