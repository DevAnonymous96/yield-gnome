import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Bot, ExternalLink } from "lucide-react";

const yieldOpportunities = [
  {
    protocol: "Aave V3",
    asset: "USDC",
    apy: "12.45%",
    tvl: "$2.1B",
    risk: "Low",
    change: "+2.3%",
    isPositive: true,
    category: "Lending"
  },
  {
    protocol: "Compound V3",
    asset: "ETH",
    apy: "8.92%",
    tvl: "$890M",
    risk: "Medium",
    change: "+0.8%",
    isPositive: true,
    category: "Lending"
  },
  {
    protocol: "Uniswap V3",
    asset: "ETH/USDC",
    apy: "24.67%",
    tvl: "$445M",
    risk: "High",
    change: "-1.2%",
    isPositive: false,
    category: "LP"
  },
  {
    protocol: "Yearn Finance",
    asset: "WBTC",
    apy: "15.33%",
    tvl: "$123M",
    risk: "Medium",
    change: "+4.1%",
    isPositive: true,
    category: "Vault"
  },
  {
    protocol: "Curve Finance",
    asset: "3CRV",
    apy: "18.75%",
    tvl: "$567M",
    risk: "Low",
    change: "+1.5%",
    isPositive: true,
    category: "LP"
  },
  {
    protocol: "Convex",
    asset: "cvxCRV",
    apy: "22.14%",
    tvl: "$234M",
    risk: "Medium",
    change: "-0.3%",
    isPositive: false,
    category: "Staking"
  }
];

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "Low": return "bg-success/20 text-success border-success/30";
    case "Medium": return "bg-warning/20 text-warning border-warning/30";
    case "High": return "bg-destructive/20 text-destructive border-destructive/30";
    default: return "bg-muted/20 text-muted-foreground border-muted/30";
  }
};

export const YieldDashboard = () => {
  return (
    <section id="dashboard" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-primary mb-4">
            <Bot className="h-6 w-6" />
            <span className="text-sm font-medium uppercase tracking-wider">
              AI-Curated Opportunities
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Live Yield <span className="gradient-text">Opportunities</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI continuously monitors and ranks the best yield opportunities 
            across DeFi protocols based on risk-adjusted returns.
          </p>
        </div>
        
        <Card className="glass card-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Top Yield Opportunities</CardTitle>
              <Button variant="glass" size="sm">
                <Bot className="h-4 w-4" />
                AI Rankings
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                      Protocol
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                      Asset
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                      APY
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                      TVL
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                      Risk
                    </th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                      24h Change
                    </th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {yieldOpportunities.map((opportunity, index) => (
                    <tr key={index} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                      <td className="py-4 px-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">
                              {opportunity.protocol.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{opportunity.protocol}</div>
                            <div className="text-xs text-muted-foreground">{opportunity.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <Badge variant="outline">{opportunity.asset}</Badge>
                      </td>
                      <td className="py-4 px-2">
                        <span className="font-medium text-success">{opportunity.apy}</span>
                      </td>
                      <td className="py-4 px-2">
                        <span className="text-muted-foreground">{opportunity.tvl}</span>
                      </td>
                      <td className="py-4 px-2">
                        <Badge className={getRiskColor(opportunity.risk)}>
                          {opportunity.risk}
                        </Badge>
                      </td>
                      <td className="py-4 px-2">
                        <div className={`flex items-center space-x-1 ${
                          opportunity.isPositive ? 'text-success' : 'text-destructive'
                        }`}>
                          {opportunity.isPositive ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          <span className="text-sm">{opportunity.change}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-right">
                        <Button variant="glass" size="sm">
                          <ExternalLink className="h-4 w-4" />
                          Invest
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};