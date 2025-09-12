import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AIAgentChat } from "@/components/sections/AIAgentChat";
import { 
  Bot, 
  Vault, 
  ExternalLink, 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  ChevronDown,
  Network,
  Check
} from "lucide-react";
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

// Network display configurations
const networkDisplayConfig = {
  1: { name: "Ethereum", color: "bg-blue-500", icon: "E" },
  11155111: { name: "Sepolia", color: "bg-blue-400", icon: "S" },
  84532: { name: "Base Sepolia", color: "bg-blue-600", icon: "B" },
  1101: { name: "Polygon zkEVM", color: "bg-purple-500", icon: "P" },
  295: { name: "Hedera", color: "bg-green-500", icon: "H" },
  296: { name: "Hedera Testnet", color: "bg-green-400", icon: "H" },
};

const Yield = () => {
  const [activeTab, setActiveTab] = useState("vaults");
  const { isInitialized } = useAppKitContext();
  const { 
    isConnected, 
    address, 
    chainId,
    connectWallet, 
    disconnect, 
    switchToNetwork,
    getShortAddress, 
    getNetworkName,
    supportedNetworks,
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

  const NetworkSwitcher = () => {
    if (!isConnected) return null;

    const currentNetwork = networkDisplayConfig[chainId as keyof typeof networkDisplayConfig];
    
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center space-x-2 border-primary/20 hover:bg-primary/10">
            {currentNetwork && (
              <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold text-white ${currentNetwork.color}`}>
                {currentNetwork.icon}
              </div>
            )}
            <span>{getNetworkName()}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
            Switch Network
          </div>
          <DropdownMenuSeparator />
          {Object.entries(supportedNetworks).map(([id, network]) => {
            const networkId = parseInt(id);
            const config = networkDisplayConfig[networkId as keyof typeof networkDisplayConfig];
            const isCurrentNetwork = chainId === networkId;
            
            return (
              <DropdownMenuItem
                key={networkId}
                onClick={() => !isCurrentNetwork && switchToNetwork(networkId)}
                className={`flex items-center space-x-2 ${isCurrentNetwork ? 'bg-primary/10' : ''}`}
                disabled={isLoading}
              >
                {config && (
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold text-white ${config.color}`}>
                    {config.icon}
                  </div>
                )}
                <span className="flex-1">{network.shortName}</span>
                {isCurrentNetwork && <Check className="h-4 w-4 text-primary" />}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

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
            <div className="px-2 py-1.5 text-xs text-muted-foreground break-all">
              {address}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(address)}>
              Copy Address
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="px-2 py-1.5">
              <div className="text-xs text-muted-foreground mb-2">Switch Network</div>
              <div className="grid gap-1">
                {Object.entries(supportedNetworks).slice(0, 3).map(([id, network]) => {
                  const networkId = parseInt(id);
                  const config = networkDisplayConfig[networkId as keyof typeof networkDisplayConfig];
                  const isCurrentNetwork = chainId === networkId;
                  
                  return (
                    <Button
                      key={networkId}
                      variant="ghost"
                      size="sm"
                      onClick={() => !isCurrentNetwork && switchToNetwork(networkId)}
                      className={`justify-start h-8 ${isCurrentNetwork ? 'bg-primary/10' : ''}`}
                      disabled={isLoading || isCurrentNetwork}
                    >
                      {config && (
                        <div className={`w-3 h-3 rounded-full flex items-center justify-center text-xs font-bold text-white ${config.color} mr-2`}>
                          {config.icon}
                        </div>
                      )}
                      <span className="text-xs">{network.shortName}</span>
                      {isCurrentNetwork && <Check className="h-3 w-3 text-primary ml-auto" />}
                    </Button>
                  );
                })}
                {Object.keys(supportedNetworks).length > 3 && (
                  <Button variant="ghost" size="sm" className="justify-start h-8 text-xs text-muted-foreground">
                    <Network className="h-3 w-3 mr-2" />
                    View All Networks
                  </Button>
                )}
              </div>
            </div>
            <DropdownMenuSeparator />
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
              <div className="flex items-center justify-between">
                <span>Error: {error}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => window.location.reload()}
                  className="text-red-400 hover:text-red-300"
                >
                  Refresh
                </Button>
              </div>
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
              {isConnected && <NetworkSwitcher />}
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
                      {chainId && networkDisplayConfig[chainId as keyof typeof networkDisplayConfig] && (
                        <Badge variant="outline" className="flex items-center space-x-1 border-primary/20">
                          <div className={`w-2 h-2 rounded-full ${networkDisplayConfig[chainId as keyof typeof networkDisplayConfig].color}`}></div>
                          <span>{networkDisplayConfig[chainId as keyof typeof networkDisplayConfig].name}</span>
                        </Badge>
                      )}
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