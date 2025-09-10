import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Search, Zap, Shield } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "AI Market Analysis",
    description: "Our AI continuously scans thousands of DeFi protocols to identify the highest-yielding opportunities with optimal risk profiles.",
    step: "01"
  },
  {
    icon: Shield,
    title: "Risk Assessment",
    description: "Advanced algorithms evaluate smart contract security, liquidity risks, and historical performance to ensure safe investments.",
    step: "02"
  },
  {
    icon: Bot,
    title: "Automated Optimization",
    description: "Your portfolio is automatically rebalanced based on changing market conditions and new yield opportunities.",
    step: "03"
  },
  {
    icon: Zap,
    title: "Maximize Returns",
    description: "Enjoy optimized yields while our AI handles the complexity of DeFi protocols and gas-efficient transactions.",
    step: "04"
  }
];

export const HowItWorks = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-primary mb-4">
            <Bot className="h-6 w-6" />
            <span className="text-sm font-medium uppercase tracking-wider">
              How It Works
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            AI-Powered <span className="gradient-text">Yield Optimization</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our intelligent system automatically finds and manages the best yield opportunities across DeFi protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="glass card-shadow relative overflow-hidden group hover:scale-105 transition-all duration-300">
                <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                  {step.step}
                </div>
                
                <CardHeader className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};