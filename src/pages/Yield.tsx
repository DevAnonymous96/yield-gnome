import { useState } from "react";
import { useWallet } from "@/components/wallet/walletContext";
import {
  Bot,
  Vault,
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Wallet,
  ChevronDown,
  X,
} from "lucide-react";
import { WalletConnect } from "@/components/wallet/walletConnect";
import { ChainType } from "@/components/wallet/wallet.types";

const vaults = [
  {
    token: "USDT",
    network: "Arbitrum",
    apy: "7.49%",
    tvl: "$1k",
    myPosition: "0.00",
    icon: "T",
    color: "bg-green-500/20 text-green-400",
  },
  {
    token: "USDC",
    network: "Arbitrum",
    apy: "9.08%",
    tvl: "$129.60k",
    myPosition: "0.00",
    icon: "$",
    color: "bg-blue-500/20 text-blue-400",
  },
  {
    token: "WETH",
    network: "Arbitrum",
    apy: "2.12%",
    tvl: "$751.45k",
    myPosition: "0.00",
    icon: "E",
    color: "bg-purple-500/20 text-purple-400",
  },
  {
    token: "USDC.e",
    network: "Arbitrum",
    apy: "12.40%",
    tvl: "$624.30k",
    myPosition: "0.00",
    icon: "$",
    color: "bg-blue-500/20 text-blue-400",
  },
  {
    token: "crvUSD",
    network: "Arbitrum",
    apy: "11.60%",
    tvl: "$295.68k",
    myPosition: "0.00",
    icon: "C",
    color: "bg-yellow-500/20 text-yellow-400",
  },
];

const Yield = () => {
  const [activeTab, setActiveTab] = useState("vaults");
  const [showWalletModal, setShowWalletModal] = useState(false);

  const { connectedWallet } = useWallet();

  const formatAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getChainDisplay = (chainType: ChainType, chainId?: number): string => {
    if (chainType === ChainType.HEDERA) {
      return "Hedera";
    }

    switch (chainId) {
      case 1:
        return "Ethereum";
      case 137:
        return "Polygon";
      case 10:
        return "Optimism";
      case 42161:
        return "Arbitrum";
      default:
        return `Chain ${chainId}`;
    }
  };

  const renderWalletButton = () => {
    if (connectedWallet) {
      return (
        <button
          onClick={() => setShowWalletModal(true)}
          className="bg-white/5 border border-white/10 hover:bg-white/10 text-white min-w-[180px] justify-start px-4 py-2 rounded-xl transition-all duration-200 flex items-center"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Wallet className="h-4 w-4 text-white" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">
                {formatAddress(connectedWallet.address)}
              </span>
              <span className="text-xs text-gray-400">
                {getChainDisplay(
                  connectedWallet.chainType,
                  connectedWallet.chainId
                )}
              </span>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400 ml-auto" />
          </div>
        </button>
      );
    }

    return (
      <button
        onClick={() => setShowWalletModal(true)}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium px-6 py-2 rounded-xl transition-all duration-200 hover:scale-105 flex items-center"
      >
        <Wallet className="h-4 w-4 mr-2" />
        Connect Wallet
      </button>
    );
  };

  const getVaultButtonText = (vault) => {
    if (connectedWallet) {
      return parseFloat(vault.myPosition) > 0 ? "Manage" : "Deposit";
    }
    return "Connect Wallet";
  };

  const TabButton = ({ isActive, onClick, children }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-white/10 text-white"
          : "text-gray-400 hover:text-white hover:bg-white/5"
      }`}
    >
      {children}
    </button>
  );

  const Badge = ({ children, className = "" }) => (
    <span className={`px-3 py-1 rounded-full text-sm border ${className}`}>
      {children}
    </span>
  );

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Y</span>
              </div>
              <span className="text-xl font-bold">YieldCraft AI</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                AI Agent
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Portfolio
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Docs
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Yield{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Optimization
                </span>
              </h1>
              <p className="text-gray-400">
                Maximize your returns with AI-powered vault strategies
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm text-gray-400">Total TVL</div>
                <div className="text-2xl font-bold">$1.96M</div>
              </div>
              {renderWalletButton()}
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex space-x-1 bg-white/5 border border-white/10 rounded-xl p-1 w-fit">
              <TabButton
                isActive={activeTab === "vaults"}
                onClick={() => setActiveTab("vaults")}
              >
                <Vault className="h-4 w-4" />
                <span>Vaults</span>
              </TabButton>
              <TabButton
                isActive={activeTab === "ai-chat"}
                onClick={() => setActiveTab("ai-chat")}
              >
                <Bot className="h-4 w-4" />
                <span>AI Chat</span>
              </TabButton>
            </div>
          </div>

          {/* Vaults Tab Content */}
          {activeTab === "vaults" && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-white">
                    <Vault className="h-5 w-5" />
                    <span className="text-xl font-semibold">Vaults</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="flex items-center space-x-1 bg-blue-500/20 text-blue-400 border-blue-500/30">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span>Arbitrum</span>
                    </Badge>
                    <Badge className="flex items-center space-x-1 bg-purple-500/20 text-purple-400 border-purple-500/30">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span>Sonic</span>
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid gap-4">
                  {vaults.map((vault, index) => (
                    <div
                      key={index}
                      className="bg-white/5 border border-white/10 hover:border-purple-500/40 transition-all duration-200 hover:bg-white/10 rounded-xl p-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                        {/* Token Info */}
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${vault.color}`}
                          >
                            {vault.icon}
                          </div>
                          <div>
                            <div className="font-medium text-white">
                              {vault.token}
                            </div>
                            <div className="text-sm text-gray-400 flex items-center space-x-1">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                              <span>{vault.network}</span>
                            </div>
                          </div>
                        </div>

                        {/* APY */}
                        <div className="text-center">
                          <div className="text-lg font-bold text-green-400">
                            {vault.apy}
                          </div>
                          <div className="text-xs text-gray-400">APY</div>
                        </div>

                        {/* TVL */}
                        <div className="text-center">
                          <div className="font-medium text-white">
                            {vault.tvl}
                          </div>
                          <div className="text-xs text-gray-400">TVL</div>
                        </div>

                        {/* My Position */}
                        <div className="text-center">
                          <div className="font-medium text-white">
                            {connectedWallet
                              ? `$${vault.myPosition}`
                              : "Connect wallet"}
                          </div>
                          <div className="text-xs text-gray-400">
                            My Position
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="flex justify-end">
                          <button
                            onClick={() =>
                              !connectedWallet && setShowWalletModal(true)
                            }
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                              connectedWallet
                                ? "bg-purple-600/20 border border-purple-500/30 text-purple-400 hover:bg-purple-600/30"
                                : "bg-white/5 border border-white/20 text-white hover:bg-white/10"
                            }`}
                          >
                            {getVaultButtonText(vault)}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI Chat Tab Content */}
          {activeTab === "ai-chat" && (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-6">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Bot className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">
                    AI Agent Chat
                  </h3>
                  <p className="text-gray-400">
                    Chat with our AI to optimize your yield strategies
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 YieldCraft AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Wallet Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md">
            <WalletConnect
              isModal={true}
              onClose={() => setShowWalletModal(false)}
              showBalance={true}
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Yield;
