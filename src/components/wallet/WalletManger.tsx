import React, { useState, useEffect } from "react";
import {
  Wallet,
  Shield,
  AlertCircle,
  CheckCircle,
  X,
  Download,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

// Wallet types and interfaces
interface WalletInfo {
  id: string;
  name: string;
  icon: string;
  type: "EVM" | "HEDERA";
  description: string;
  isInstalled: boolean;
  isConnected: boolean;
  downloadUrl?: string;
  networks: string[];
}

interface WalletManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onWalletConnect: (walletId: string, type: "EVM" | "HEDERA") => void;
}

// Wallet configurations
const WALLET_CONFIGS: Omit<WalletInfo, "isInstalled" | "isConnected">[] = [
  {
    id: "metamask",
    name: "MetaMask",
    icon: "/metamaskLogo.png",
    type: "EVM",
    description: "Most popular Ethereum wallet",
    downloadUrl: "https://metamask.io/download/",
    networks: ["Ethereum", "Arbitrum", "Polygon", "Optimism"],
  },
  // {
  //   id: "walletconnect",
  //   name: "WalletConnect",
  //   icon: "🔗",
  //   type: "EVM",
  //   description: "200+ mobile wallets supported",
  //   networks: ["Multi-chain"],
  // },
  {
    id: "hashpack",
    name: "HashPack",
    icon: "/hashpackLogo.png",
    type: "HEDERA",
    description: "Official Hedera wallet",
    downloadUrl: "https://www.hashpack.app/",
    networks: ["Hedera"],
  },
  {
    id: "blade",
    name: "Blade Wallet",
    icon: "/bladewalletLogo.png",
    type: "HEDERA",
    description: "Multi-chain Hedera solution",
    downloadUrl: "https://bladewallet.io/",
    networks: ["Hedera", "EVM"],
  },
];

const WalletManager: React.FC<WalletManagerProps> = ({
  isOpen,
  onClose,
  onWalletConnect,
}) => {
  const [wallets, setWallets] = useState<WalletInfo[]>([]);
  const [connecting, setConnecting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Wallet detection functions
  const detectMetaMask = (): boolean => {
    return (
      typeof window !== "undefined" &&
      typeof (window as any).ethereum !== "undefined" &&
      (window as any).ethereum.isMetaMask
    );
  };

  const detectHashPack = (): boolean => {
    return (
      typeof window !== "undefined" &&
      typeof (window as any).hashpack !== "undefined"
    );
  };

  const detectBlade = (): boolean => {
    return (
      typeof window !== "undefined" &&
      typeof (window as any).blade !== "undefined"
    );
  };

  const detectWalletConnect = (): boolean => {
    return true; // WalletConnect is always available as it's a protocol
  };

  // Check connection status for each wallet
  const checkConnectionStatus = async (walletId: string): Promise<boolean> => {
    try {
      switch (walletId) {
        case "metamask":
          if (detectMetaMask()) {
            const accounts = await (window as any).ethereum.request({
              method: "eth_accounts",
            });
            return accounts.length > 0;
          }
          return false;
        case "hashpack":
          if (detectHashPack()) {
            const hashpack = (window as any).hashpack;
            return hashpack.isConnected || false;
          }
          return false;
        case "blade":
          if (detectBlade()) {
            const blade = (window as any).blade;
            return blade.isConnected || false;
          }
          return false;
        case "walletconnect":
          return localStorage.getItem("walletconnect") !== null;
        default:
          return false;
      }
    } catch (error) {
      console.error(`Error checking connection for ${walletId}:`, error);
      return false;
    }
  };

  // Initialize wallet detection
  useEffect(() => {
    const initializeWallets = async () => {
      const detectedWallets = await Promise.all(
        WALLET_CONFIGS.map(async (config) => {
          let isInstalled = false;

          switch (config.id) {
            case "metamask":
              isInstalled = detectMetaMask();
              break;
            case "hashpack":
              isInstalled = detectHashPack();
              break;
            case "blade":
              isInstalled = detectBlade();
              break;
            case "walletconnect":
              isInstalled = detectWalletConnect();
              break;
          }

          const isConnected = isInstalled
            ? await checkConnectionStatus(config.id)
            : false;

          return {
            ...config,
            isInstalled,
            isConnected,
          };
        })
      );

      setWallets(detectedWallets);
    };

    if (isOpen) {
      initializeWallets();
    }
  }, [isOpen]);

  // Handle wallet connection
  const handleWalletConnect = async (wallet: WalletInfo) => {
    if (!wallet.isInstalled) {
      if (wallet.downloadUrl) {
        window.open(wallet.downloadUrl, "_blank");
      }
      return;
    }

    setConnecting(wallet.id);
    setError(null);

    try {
      switch (wallet.id) {
        case "metamask":
          await (window as any).ethereum.request({
            method: "eth_requestAccounts",
          });
          break;
        case "hashpack":
          const hashpack = (window as any).hashpack;
          await hashpack.connect();
          break;
        case "blade":
          const blade = (window as any).blade;
          await blade.connect();
          break;
        case "walletconnect":
          console.log("Initializing WalletConnect...");
          break;
      }

      onWalletConnect(wallet.id, wallet.type);
      onClose();
    } catch (error: any) {
      setError(`Failed to connect to ${wallet.name}: ${error.message}`);
      console.error("Wallet connection error:", error);
    } finally {
      setConnecting(null);
    }
  };

  const getWalletsByType = (type: "EVM" | "HEDERA") => {
    return wallets.filter((wallet) => wallet.type === type);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="glass card-shadow max-w-lg w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/30">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Wallet className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Connect Wallet</h2>
              <p className="text-sm text-muted-foreground">
                Choose your preferred wallet
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="hover:bg-destructive/10 hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Error Message */}
          {error && (
            <div className="mx-6 mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          {/* EVM Wallets Section */}
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                EVM Compatible
              </h3>
              <Badge variant="outline" className="text-xs">
                Arbitrum • Sonic • Ethereum
              </Badge>
            </div>

            <div className="space-y-3 mb-6">
              {getWalletsByType("EVM").map((wallet) => (
                <WalletCard
                  key={wallet.id}
                  wallet={wallet}
                  isConnecting={connecting === wallet.id}
                  onConnect={() => handleWalletConnect(wallet)}
                />
              ))}
            </div>

            {/* Hedera Wallets Section */}
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-4 w-4 text-secondary" />
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                Hedera Network
              </h3>
              <Badge variant="outline" className="text-xs">
                Hashgraph
              </Badge>
            </div>

            <div className="space-y-3">
              {getWalletsByType("HEDERA").map((wallet) => (
                <WalletCard
                  key={wallet.id}
                  wallet={wallet}
                  isConnecting={connecting === wallet.id}
                  onConnect={() => handleWalletConnect(wallet)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-muted/30 border-t border-border/30">
          <p className="text-xs text-muted-foreground text-center">
            By connecting, you agree to our{" "}
            <span className="text-primary hover:underline cursor-pointer">
              Terms
            </span>{" "}
            and{" "}
            <span className="text-primary hover:underline cursor-pointer">
              Privacy Policy
            </span>
          </p>
        </div>
      </Card>
    </div>
  );
};

// Wallet Card Component
interface WalletCardProps {
  wallet: WalletInfo;
  isConnecting: boolean;
  onConnect: () => void;
}

const WalletCard: React.FC<WalletCardProps> = ({
  wallet,
  isConnecting,
  onConnect,
}) => {
  const getButtonText = () => {
    if (isConnecting) return "Connecting...";
    if (!wallet.isInstalled) return "Install";
    if (wallet.isConnected) return "Connected";
    return "Connect";
  };

  const getButtonVariant = () => {
    if (!wallet.isInstalled) return "outline";
    if (wallet.isConnected) return "outline";
    return "default";
  };

  const getStatusIcon = () => {
    if (wallet.isConnected) {
      return <CheckCircle className="h-4 w-4 text-success" />;
    }
    if (!wallet.isInstalled) {
      return <Download className="h-4 w-4 text-muted-foreground" />;
    }
    return null;
  };

  return (
    <Card className="glass border-border/30 hover:border-primary/40 transition-all duration-200 hover:shadow-lg">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div>
              <img src={wallet.icon} alt={wallet.name} className="h-8 w-8" />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold">{wallet.name}</h4>
                {getStatusIcon()}
              </div>
              <p className="text-sm text-muted-foreground">
                {wallet.description}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge
                  variant={wallet.type === "EVM" ? "default" : "secondary"}
                  className="text-xs px-2 py-0"
                >
                  {wallet.type}
                </Badge>
                {!wallet.isInstalled && (
                  <Badge
                    variant="outline"
                    className="text-xs text-orange-500 border-orange-500/20"
                  >
                    Not installed
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Button
            onClick={onConnect}
            disabled={isConnecting || wallet.isConnected}
            variant={getButtonVariant()}
            size="sm"
            className="ml-4 min-w-[80px]"
          >
            {isConnecting ? (
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                <span className="sr-only">Connecting...</span>
              </div>
            ) : (
              getButtonText()
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletManager;
