import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AIAgentChat } from "@/components/sections/AIAgentChat";
import { Bot, Vault, ExternalLink, TrendingUp, TrendingDown } from "lucide-react";

const vaults = [
  {
    token: "USDT",
    network: "Arbitrum",
    apy: "7.49%",
    tvl: "$1k",
    myPosition: "Connect wallet",
    icon: "T",
    color: "bg-green-500/20 text-green-400"
  },
  {
    token: "USDC",
    network: "Arbitrum", 
    apy: "9.08%",
    tvl: "$129.60k",
    myPosition: "Connect wallet",
    icon: "$",
    color: "bg-blue-500/20 text-blue-400"
  },
  {
    token: "WETH",
    network: "Arbitrum",
    apy: "2.12%", 
    tvl: "$751.45k",
    myPosition: "Connect wallet",
    icon: "E",
    color: "bg-purple-500/20 text-purple-400"
  },
  {
    token: "USDC.e",
    network: "Arbitrum",
    apy: "12.40%",
    tvl: "$624.30k", 
    myPosition: "Connect wallet",
    icon: "$",
    color: "bg-blue-500/20 text-blue-400"
  },
  {
    token: "crvUSD",
    network: "Arbitrum",
    apy: "11.60%",
    tvl: "$295.68k",
    myPosition: "Connect wallet", 
    icon: "C",
    color: "bg-yellow-500/20 text-yellow-400"
  }
];

const Yield = () => {
  const [activeTab, setActiveTab] = useState("vaults");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Yield <span className="gradient-text">Optimization</span>
              </h1>
              <p className="text-muted-foreground">
                Maximize your returns with AI-powered vault strategies
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Total TVL</div>
                <div className="text-2xl font-bold">$1.96M</div>
              </div>
              <Button variant="hero">
                Connect Wallet
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
              <TabsTrigger value="vaults" className="flex items-center space-x-2">
                <Vault className="h-4 w-4" />
                <span>Vaults</span>
              </TabsTrigger>
              <TabsTrigger value="ai-chat" className="flex items-center space-x-2">
                <Bot className="h-4 w-4" />
                <span>AI Chat</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vaults" className="mt-8">
              <Card className="glass card-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Vault className="h-5 w-5" />
                      <span>Vaults</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Arbitrum</span>
                      </Badge>
                      <Badge variant="outline" className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span>Sonic</span>
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-0">
                  <div className="grid gap-4 p-6">
                    {vaults.map((vault, index) => (
                      <Card key={index} className="glass border-border/30 hover:border-primary/40 transition-colors">
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                            {/* Token Info */}
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${vault.color}`}>
                                {vault.icon}
                              </div>
                              <div>
                                <div className="font-medium">{vault.token}</div>
                                <div className="text-sm text-muted-foreground flex items-center space-x-1">
                                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                  <span>{vault.network}</span>
                                </div>
                              </div>
                            </div>

                            {/* APY */}
                            <div className="text-center">
                              <div className="text-lg font-bold text-success">{vault.apy}</div>
                              <div className="text-xs text-muted-foreground">APY</div>
                            </div>

                            {/* TVL */}
                            <div className="text-center">
                              <div className="font-medium">{vault.tvl}</div>
                              <div className="text-xs text-muted-foreground">TVL</div>
                            </div>

                            {/* My Position */}
                            <div className="text-center">
                              <div className="font-medium">{vault.myPosition}</div>
                              <div className="text-xs text-muted-foreground">My Position</div>
                            </div>

                            {/* Action Button */}
                            <div className="flex justify-end">
                              <Button variant="outline" size="sm" className="border-primary/20 hover:bg-primary/10">
                                Connect wallet
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai-chat" className="mt-8">
              <AIAgentChat />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Yield;