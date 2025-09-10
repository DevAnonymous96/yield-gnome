import { Header } from "@/components/layout/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bot, Zap, Shield, TrendingUp, DollarSign, FileText } from "lucide-react";

export default function Docs() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 gradient-text">
              YieldBot AI Documentation
            </h1>
            <p className="text-xl text-muted-foreground">
              Complete guide to maximizing your DeFi yields with AI-powered automation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="glass border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  Getting Started
                </CardTitle>
                <CardDescription>
                  Learn the basics of YieldBot AI platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Connect your wallet</li>
                  <li>• Set up your risk preferences</li>
                  <li>• Configure AI agent settings</li>
                  <li>• Make your first deposit</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  AI Agent Features
                </CardTitle>
                <CardDescription>
                  Understand how our AI optimizes yields
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Real-time yield scanning</li>
                  <li>• Risk assessment algorithms</li>
                  <li>• Automated rebalancing</li>
                  <li>• Gas optimization strategies</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security & Safety
                </CardTitle>
                <CardDescription>
                  How we protect your funds and data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Multi-signature security</li>
                  <li>• Smart contract audits</li>
                  <li>• Insurance coverage</li>
                  <li>• Emergency withdrawal</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Yield Strategies
                </CardTitle>
                <CardDescription>
                  Explore different yield generation methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Liquidity provision strategies</li>
                  <li>• Lending & borrowing optimization</li>
                  <li>• Staking rewards maximization</li>
                  <li>• Cross-chain opportunities</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-8" />

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-primary" />
                How It Works
              </h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground mb-4">
                  YieldBot AI continuously monitors hundreds of DeFi protocols across multiple blockchains 
                  to identify the highest-yielding opportunities that match your risk profile.
                </p>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li>Connect your wallet and deposit funds</li>
                  <li>Set your risk tolerance and yield targets</li>
                  <li>Our AI scans available opportunities in real-time</li>
                  <li>Funds are automatically allocated to optimal strategies</li>
                  <li>Continuous monitoring and rebalancing</li>
                  <li>Withdraw anytime with just a few clicks</li>
                </ol>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                API Documentation
              </h2>
              <Card className="glass border-primary/20">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">REST API Endpoints</h3>
                      <code className="text-sm bg-muted p-2 rounded block">
                        GET /api/v1/pools - Get available yield pools
                      </code>
                      <code className="text-sm bg-muted p-2 rounded block mt-2">
                        POST /api/v1/deposit - Make a deposit
                      </code>
                      <code className="text-sm bg-muted p-2 rounded block mt-2">
                        GET /api/v1/portfolio - Get portfolio data
                      </code>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">WebSocket Events</h3>
                      <code className="text-sm bg-muted p-2 rounded block">
                        yield_update - Real-time yield changes
                      </code>
                      <code className="text-sm bg-muted p-2 rounded block mt-2">
                        portfolio_update - Portfolio balance updates
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">FAQ</h2>
              <div className="space-y-4">
                <Card className="glass border-primary/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">What fees does YieldBot AI charge?</h3>
                    <p className="text-muted-foreground text-sm">
                      We charge a 10% performance fee on profits generated. No management fees or hidden costs.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="glass border-primary/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Can I withdraw my funds anytime?</h3>
                    <p className="text-muted-foreground text-sm">
                      Yes, you maintain full control of your funds and can withdraw at any time.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="glass border-primary/20">
                  <CardContent className="pt-6">
                    <h3 className="font-semibold mb-2">Which blockchains are supported?</h3>
                    <p className="text-muted-foreground text-sm">
                      Currently supporting Ethereum, Polygon, Arbitrum, and Optimism with more chains coming soon.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}