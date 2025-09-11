import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AIAgentChat } from "@/components/sections/AIAgentChat";
import { Bot, Vault, ExternalLink, TrendingUp, TrendingDown, Wallet, ChevronDown } from "lucide-react";
import { useWallet } from "@/hooks/useHederaWallet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppKitContext } from "@/App";

const vaults = [
  {
    token: "USDT",
    network: "Arbitrum",
    apy: "7.49%",
    tvl: "$1k",
    icon: "T",
    color: "bg-green-500/20 text-green-400"
  },
  {
    token: "USDC",
    network: "Arbitrum", 
    apy: "9.08%",
    tvl: "$129.60k",
    icon: "$",
    color: "bg-blue-500/20 text-blue-400"
  },
  {
    token: "WETH",
    network: "Arbitrum",
    apy: "2.12%", 
    tvl: "$751.45k",
    icon: "E",
    color: "bg-purple-500/20 text-purple-400"
  },
  {
    token: "USDC.e",
    network: "Arbitrum",
    apy: "12.40%",
    tvl: "$624.30k", 
    icon: "$",
    color: "bg-blue-500/20 text-blue-400"
  },
  {
    token: "crvUSD",
    network: "Arbitrum",
    apy: "11.60%",
    tvl: "$295.68k",
    icon: "C",
    color: "bg-yellow-500/20 text-yellow-400"
  }
];

const Yield = () => {
  const [activeTab, setActiveTab] = useState("vaults");
  const { isInitialized } = useAppKitContext();
  const { 
    isConnected, 
    address, 
    connectWallet, 
    disconnect, 
    getShortAddress, 
    getNetworkName,
    isLoading,
    error 
  } = useWallet();

  // Show loading state while AppKit initializes
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading wallet connection...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const WalletButton = () => {
    if (isLoading) {
      return (
        <Button variant="hero" disabled>
          Connecting...
        </Button>
      );
    }

    if (isConnected && address) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="hero" className="flex items-center space-x-2">
              <Wallet className="h-4 w-4" />
              <span>{getShortAddress()}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5 text-sm font-medium">
              Connected to {getNetworkName()}
            </div>
            <div className="px-2 py-1.5 text-xs text-muted-foreground">
              {address}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(address)}>
              Copy Address
            </DropdownMenuItem>
            <DropdownMenuItem onClick={disconnect} className="text-red-600">
              Disconnect
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }

    console.log('🔌 Wallet button showing connect state');
    return (
      <Button variant="hero" onClick={() => {
        console.log('👆 User clicked connect wallet button');
        connectWallet();
      }}>
        <Wallet className="h-4 w-4 mr-2" />
        Connect Wallet
      </Button>
    );
  };

  const getVaultActionButton = (vault: any) => {
    if (!isConnected) {
      return (
        <Button 
          variant="outline" 
          size="sm" 
          className="border-primary/20 hover:bg-primary/10"
          onClick={connectWallet}
        >
          Connect wallet
        </Button>
      );
    }

    return (
      <Button 
        variant="outline" 
        size="sm" 
        className="border-primary/20 hover:bg-primary/10"
      >
        Deposit
      </Button>
    );
  };

  const getPositionDisplay = (vault: any) => {
    if (!isConnected) {
      return "Connect wallet";
    }
    // In a real app, you'd fetch the user's position for this vault
    return "$0.00";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {error && (
            <div className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
              Error: {error}
            </div>
          )}
          
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
              <WalletButton />
            </div>
          </div>

          {isConnected && (
            <div className="mb-6">
              <Card className="glass border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm text-muted-foreground">Connected to {getNetworkName()}</span>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                        {getShortAddress()}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Portfolio Value</div>
                      <div className="text-lg font-bold">$0.00</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

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
                        <span>Hedera</span>
                      </Badge>
                      <Badge variant="outline" className="flex items-center space-x-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                        <span>Arbitrum</span>
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
                              <div className="font-medium">{getPositionDisplay(vault)}</div>
                              <div className="text-xs text-muted-foreground">My Position</div>
                            </div>

                            {/* Action Button */}
                            <div className="flex justify-end">
                              {getVaultActionButton(vault)}
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