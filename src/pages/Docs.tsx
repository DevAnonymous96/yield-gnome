import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, BookOpen, Shield, Zap, Bot, Code, ExternalLink } from "lucide-react";

const Docs = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-2 text-primary mb-4">
              <FileText className="h-6 w-6" />
              <span className="text-sm font-medium uppercase tracking-wider">
                Documentation
              </span>
            </div>
            <h1 className="text-4xl font-bold mb-4">
              YieldCraft AI <span className="gradient-text">Documentation</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn how to maximize your DeFi yields with our AI-powered platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="glass card-shadow hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Getting Started</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Learn the basics of yield optimization and how to get started with YieldCraft AI.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-primary"></div>
                    <span>Platform Overview</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-primary"></div>
                    <span>Wallet Connection</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-primary"></div>
                    <span>Your First Deposit</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass card-shadow hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-success/20 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-success" />
                </div>
                <CardTitle>Yield Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Understand different yield strategies and how our AI optimizes your portfolio.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-success"></div>
                    <span>Lending Protocols</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-success"></div>
                    <span>Liquidity Pools</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-success"></div>
                    <span>Vault Strategies</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass card-shadow hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-warning/20 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-warning" />
                </div>
                <CardTitle>Security & Risk</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Learn about our security measures and risk management protocols.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-warning"></div>
                    <span>Smart Contract Audits</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-warning"></div>
                    <span>Risk Assessment</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-warning"></div>
                    <span>Insurance Coverage</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass card-shadow hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-info/20 flex items-center justify-center mb-4">
                  <Bot className="h-6 w-6 text-info" />
                </div>
                <CardTitle>AI Agent</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Discover how to interact with our AI agent for personalized yield optimization.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-info"></div>
                    <span>Chat Interface</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-info"></div>
                    <span>Portfolio Analysis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-info"></div>
                    <span>Optimization Tips</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass card-shadow hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-purple-400" />
                </div>
                <CardTitle>API Reference</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Technical documentation for developers integrating with YieldCraft AI.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-purple-400"></div>
                    <span>REST API</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-purple-400"></div>
                    <span>WebSocket Events</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-purple-400"></div>
                    <span>SDK Integration</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="glass card-shadow hover:scale-105 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-pink-500/20 flex items-center justify-center mb-4">
                  <ExternalLink className="h-6 w-6 text-pink-400" />
                </div>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Additional resources, tutorials, and community links.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-pink-400"></div>
                    <span>Video Tutorials</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-pink-400"></div>
                    <span>Community Discord</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1 h-1 rounded-full bg-pink-400"></div>
                    <span>FAQs</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="glass card-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Quick Links</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-success">Popular Guides</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">How to Connect Your Wallet</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Understanding APY vs APR</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Risk Management Best Practices</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Maximizing Gas Efficiency</a></li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-info">Technical Docs</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Smart Contract Architecture</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">AI Algorithm Overview</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Security Audit Reports</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Integration Examples</a></li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-warning">Support</h3>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Contact Support</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Report a Bug</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Feature Requests</a></li>
                    <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Status Page</a></li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Docs;