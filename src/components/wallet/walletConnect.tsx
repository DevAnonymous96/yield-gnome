import React from "react";
import { useWallet } from "./walletContext";
import { WalletType, ChainType } from "./wallet.types";
import { getWalletInstallUrl } from "./walletDetector";
import { X, Wallet, ExternalLink } from "lucide-react";

interface WalletConnectProps {
  className?: string;
  showBalance?: boolean;
  isModal?: boolean;
  onClose?: () => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  className = "",
  showBalance = false,
  isModal = false,
  onClose,
}) => {
  const {
    connectedWallet,
    availableWallets,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
  } = useWallet();

  const handleWalletClick = async (
    walletType: WalletType,
    installed: boolean
  ) => {
    if (!installed) {
      window.open(getWalletInstallUrl(walletType), "_blank");
      return;
    }

    if (isConnecting) return;

    try {
      await connectWallet(walletType);
      if (onClose) onClose();
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  const handleDisconnect = async () => {
    await disconnectWallet();
    if (onClose) onClose();
  };

  const formatAddress = (address: string): string => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getChainDisplay = (chainType: ChainType, chainId?: number): string => {
    if (chainType === ChainType.HEDERA) {
      return "Hedera";
    }

    // EVM chains
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

  const getChainColor = (chainType: ChainType, chainId?: number): string => {
    if (chainType === ChainType.HEDERA) {
      return "bg-purple-500/20 text-purple-400 border-purple-500/30";
    }

    switch (chainId) {
      case 1:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case 137:
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case 10:
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case 42161:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  if (connectedWallet) {
    return (
      <div className={`bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ${className}`}>
        {isModal && onClose && (
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Wallet Connected</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        <div className="space-y-4">
          {/* Wallet Info */}
          <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-white">
                {connectedWallet.type.charAt(0).toUpperCase() +
                  connectedWallet.type.slice(1)}
              </div>
              <div className="text-sm text-gray-400">
                {formatAddress(connectedWallet.address)}
                {connectedWallet.accountId && (
                  <span className="ml-2 text-purple-400">
                    ({connectedWallet.accountId})
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Chain Info */}
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
            <span className="text-gray-400">Network</span>
            <div className={`px-3 py-1 rounded-full text-sm border ${getChainColor(
              connectedWallet.chainType,
              connectedWallet.chainId
            )}`}>
              {getChainDisplay(
                connectedWallet.chainType,
                connectedWallet.chainId
              )}
            </div>
          </div>

          {showBalance && (
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-sm text-gray-400 mb-1">Balance</div>
              <div className="text-2xl font-bold text-white">$0.00</div>
            </div>
          )}

          {/* Disconnect Button */}
          <button
            onClick={handleDisconnect}
            className="w-full py-3 px-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 font-medium transition-all duration-200 hover:scale-[1.02]"
          >
            Disconnect Wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 ${className}`}>
      {isModal && onClose && (
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Connect Wallet</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="space-y-6">
        {!isModal && (
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">Connect Wallet</h3>
            <p className="text-gray-400">Choose your preferred wallet to continue</p>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
            <div className="flex items-center space-x-2 text-red-400">
              <span>⚠️</span>
              <span className="text-sm">{error}</span>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {availableWallets.map((wallet) => (
            <button
              key={wallet.type}
              onClick={() => handleWalletClick(wallet.type, wallet.installed)}
              disabled={isConnecting}
              className={`w-full p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02] ${
                !wallet.installed
                  ? "bg-white/5 border-white/10 hover:bg-white/10"
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-purple-500/50"
              } ${
                isConnecting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div>
                  <img src={wallet.icon} alt={wallet.name} className="w-8 h-8" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-white">{wallet.name}</div>
                  <div className="text-sm text-gray-400">
                    {wallet.chainType === ChainType.EVM
                      ? "EVM Chains"
                      : "Hedera Network"}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!wallet.installed ? (
                    <>
                      <span className="text-sm text-purple-400 font-medium">Install</span>
                      <ExternalLink className="h-4 w-4 text-purple-400" />
                    </>
                  ) : isConnecting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-purple-400 border-t-transparent rounded-full animate-spin" />
                      <span className="text-sm text-purple-400">Connecting...</span>
                    </div>
                  ) : (
                    <span className="text-sm text-purple-400 font-medium">Connect</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-white/10">
          <p className="text-sm text-gray-400 text-center">
            Don't have a wallet? Click on any option above to install.
          </p>
        </div>
      </div>
    </div>
  );
};