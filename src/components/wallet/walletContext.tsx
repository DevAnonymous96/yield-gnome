// context/WalletContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  WalletContextType,
  ConnectedWallet,
  WalletInfo,
  WalletType,
  WalletAdapter,
} from "./wallet.types";
import { detectInstalledWallets } from "./walletDetector";
import { createWalletAdapter } from "./walletAdapters";

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [connectedWallet, setConnectedWallet] =
    useState<ConnectedWallet | null>(null);
  const [availableWallets, setAvailableWallets] = useState<WalletInfo[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentAdapter, setCurrentAdapter] = useState<WalletAdapter | null>(
    null
  );

  // Detect available wallets on mount
  useEffect(() => {
    const wallets = detectInstalledWallets();
    setAvailableWallets(wallets);
  }, []);

  // Load persisted wallet connection
  useEffect(() => {
    const loadPersistedConnection = async () => {
      const savedWalletType = localStorage.getItem(
        "connectedWalletType"
      ) as WalletType;

      if (savedWalletType) {
        try {
          const adapter = createWalletAdapter(savedWalletType);
          if (adapter.isConnected()) {
            const walletInfo = await adapter.connect();
            setConnectedWallet(walletInfo);
            setCurrentAdapter(adapter);
          } else {
            localStorage.removeItem("connectedWalletType");
          }
        } catch (error) {
          console.warn("Failed to restore wallet connection:", error);
          localStorage.removeItem("connectedWalletType");
        }
      }
    };

    loadPersistedConnection();
  }, []);

  const connectWallet = useCallback(async (walletType: WalletType) => {
    setIsConnecting(true);
    setError(null);

    try {
      const adapter = createWalletAdapter(walletType);
      const walletInfo = await adapter.connect();

      setConnectedWallet(walletInfo);
      setCurrentAdapter(adapter);
      localStorage.setItem("connectedWalletType", walletType);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      setError(errorMessage);
      console.error("Wallet connection failed:", error);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback(async () => {
    if (currentAdapter) {
      try {
        await currentAdapter.disconnect();
      } catch (error) {
        console.error("Error disconnecting wallet:", error);
      }
    }

    setConnectedWallet(null);
    setCurrentAdapter(null);
    setError(null);
    localStorage.removeItem("connectedWalletType");
  }, [currentAdapter]);

  const switchChain = useCallback(
    async (chainId: number) => {
      if (!currentAdapter || !currentAdapter.switchChain) {
        throw new Error("Chain switching not supported by current wallet");
      }

      try {
        await currentAdapter.switchChain(chainId);
        // Refresh connection info after chain switch
        if (connectedWallet) {
          const updatedInfo = await currentAdapter.connect();
          setConnectedWallet(updatedInfo);
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Chain switch failed";
        setError(errorMessage);
        throw error;
      }
    },
    [currentAdapter, connectedWallet]
  );

  const contextValue: WalletContextType = {
    connectedWallet,
    availableWallets,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    switchChain,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
