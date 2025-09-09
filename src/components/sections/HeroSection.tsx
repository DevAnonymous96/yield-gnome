import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bot, TrendingUp, Zap, Shield } from "lucide-react";
import heroImage from "@/assets/ai-yield-hero.jpg";

export const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary">
                <Bot className="h-6 w-6" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  AI-Powered DeFi
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Maximize Your{" "}
                <span className="gradient-text">DeFi Yields</span>{" "}
                with AI Intelligence
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Our AI agent continuously analyzes thousands of yield opportunities across 
                DeFi protocols, automatically optimizing your portfolio for maximum returns 
                while minimizing risks.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6">
                <Zap className="h-5 w-5" />
                Start Earning Now
              </Button>
              <Button variant="glass" size="lg" className="text-lg px-8 py-6">
                View Live Demo
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">24.5%</div>
                <div className="text-sm text-muted-foreground">Avg APY</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">$1.2B</div>
                <div className="text-sm text-muted-foreground">TVL Managed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-info">99.8%</div>
                <div className="text-sm text-muted-foreground">Uptime</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <Card className="glass card-shadow overflow-hidden">
              <img 
                src={heroImage} 
                alt="AI Yield Aggregator Dashboard" 
                className="w-full h-auto rounded-lg"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground">AI Recommendation</span>
                    <div className="flex items-center space-x-1 text-success">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">+18.3%</span>
                    </div>
                  </div>
                  <p className="text-sm">
                    Optimal rebalancing detected. Moving 25% allocation to Compound V3 
                    for higher yields.
                  </p>
                </div>
              </div>
            </Card>
            
            <div className="absolute -top-4 -right-4 glass p-3 rounded-full animate-pulse-glow">
              <Shield className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};