import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, TrendingUp, Zap, Shield } from "lucide-react";
import heroImage from "@/assets/ai-yield-hero.jpg";

export const HeroSection = () => {
  return (
    <section className="flex items-center justify-center py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-8">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary">
                <Bot className="h-6 w-6" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  AI-Powered DeFi
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Maximize Your <span className="gradient-text">DeFi Yields</span>{" "}
                with AI Intelligence
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                Our AI agent continuously analyzes thousands of yield
                opportunities across DeFi protocols, automatically optimizing
                your portfolio for maximum returns while minimizing risks.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" className="text-lg px-8 py-6" asChild>
                <a href="/yield">
                  <Zap className="h-5 w-5" />
                  Start Earning Now
                </a>
              </Button>
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
                    <span className="text-sm text-muted-foreground">
                      AI Recommendation
                    </span>
                    <div className="flex items-center space-x-1 text-success">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-sm font-medium">+18.3%</span>
                    </div>
                  </div>
                  <p className="text-sm">
                    Optimal rebalancing detected. Moving 25% allocation to
                    Compound V3 for higher yields.
                  </p>
                </div>
              </div>
            </Card>

            <div className="absolute -top-4 -right-4 glass p-3 rounded-full animate-pulse-glow">
              <Shield className="h-6 w-6 text-success" />
            </div>
          </div>
        </div>
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="glass card-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Portfolio Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$125,420.50</div>
                <div className="flex items-center space-x-1 text-success text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>+8.3% (24h)</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass card-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Positions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">
                  Across 8 protocols
                </div>
              </CardContent>
            </Card>

            <Card className="glass card-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg APY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-success">16.7%</div>
                <div className="text-sm text-muted-foreground">
                  Risk-adjusted
                </div>
              </CardContent>
            </Card>

            <Card className="glass card-shadow">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  24h Earnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$47.82</div>
                <div className="flex items-center space-x-1 text-success text-sm">
                  <TrendingUp className="h-4 w-4" />
                  <span>+12.4%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
