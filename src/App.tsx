import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type UniversalProvider from '@walletconnect/universal-provider';
import {
  HederaProvider,
  HederaAdapter,
  HederaChainDefinition,
  hederaNamespace,
} from '@hashgraph/hedera-wallet-connect';
import { createAppKit } from '@reown/appkit/react';
import { mainnet, sepolia, polygon, polygonZkEvm, base, baseSepolia } from '@reown/appkit/networks';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import Index from "./pages/Index";
import Yield from "./pages/Yield";
import Docs from "./pages/Docs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Replace with your actual WalletConnect Project ID
const PROJECT_ID = "7cbcd2275e7647c89784f60dff9b36b5";

const metadata = {
  name: 'Hedera Yield Optimizer',
  description: 'AI-powered yield optimization platform for Hedera',
  url: window.location.origin,
  icons: ['https://avatars.githubusercontent.com/u/179229932']
};

// Custom Hedera EVM networks
const hederaMainnet = {
  id: 295,
  name: 'Hedera Mainnet',
  nativeCurrency: {
    decimals: 18,
    name: 'HBAR',
    symbol: 'HBAR',
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet.hashio.io/api'],
    },
    public: {
      http: ['https://mainnet.hashio.io/api'],
    },
  },
  blockExplorers: {
    default: {
      name: 'HashScan',
      url: 'https://hashscan.io',
    },
  },
};

const hederaTestnet = {
  id: 296,
  name: 'Hedera Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'HBAR',
    symbol: 'HBAR',
  },
  rpcUrls: {
    default: {
      http: ['https://testnet.hashio.io/api'],
    },
    public: {
      http: ['https://testnet.hashio.io/api'],
    },
  },
  blockExplorers: {
    default: {
      name: 'HashScan Testnet',
      url: 'https://hashscan.io/testnet',
    },
  },
};

interface AppKitContextType {
  isInitialized: boolean;
  appKit: any;
  universalProvider: any;
  error: string | null;
}

const AppKitContext = createContext<AppKitContextType | null>(null);

export const useAppKitContext = () => {
  const context = useContext(AppKitContext);
  if (!context) {
    throw new Error('useAppKitContext must be used within AppKitProvider');
  }
  return context;
};

interface AppKitProviderProps {
  children: ReactNode;
}

const AppKitProvider = ({ children }: AppKitProviderProps) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [appKit, setAppKit] = useState<any>(null);
  const [universalProvider, setUniversalProvider] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAppKit = async () => {
      try {
        if (!PROJECT_ID) {
          throw new Error('Please set your WalletConnect Project ID in the environment variables');
        }

        console.log('🚀 Initializing AppKit...');

        // Initialize Universal Provider for Hedera
        const hederaUniversalProvider = (await HederaProvider.init({
          projectId: PROJECT_ID,
          metadata,
        })) as unknown as UniversalProvider;

        console.log('🔗 Hedera Universal Provider initialized');

        // Create Wagmi adapter for EVM chains
        const wagmiAdapter = new WagmiAdapter({
          networks: [
            mainnet,
            sepolia,
            baseSepolia,
            polygonZkEvm,
            hederaMainnet,
            hederaTestnet,
          ],
          projectId: PROJECT_ID,
        });

        console.log('⚡ Wagmi adapter created');

        // Create Hedera EVM Adapter
        const hederaEVMAdapter = new HederaAdapter({
          projectId: PROJECT_ID,
          networks: [
            HederaChainDefinition.EVM.Mainnet,
            HederaChainDefinition.EVM.Testnet,
          ],
          namespace: 'eip155',
        });

        // Create Hedera Native Adapter
        const hederaNativeAdapter = new HederaAdapter({
          projectId: PROJECT_ID,
          networks: [
            HederaChainDefinition.Native.Mainnet,
            HederaChainDefinition.Native.Testnet,
          ],
          namespace: hederaNamespace,
        });

        console.log('🔷 Hedera adapters created');

        // Create AppKit instance with all networks and adapters
        const appKitInstance = createAppKit({
          adapters: [wagmiAdapter, hederaEVMAdapter, hederaNativeAdapter],
          // @ts-expect-error expected type error for universal provider
          universalProvider: hederaUniversalProvider,
          projectId: PROJECT_ID,
          metadata,
          networks: [
            // EVM Networks - MUST match Wagmi adapter networks
            mainnet,
            sepolia,
            baseSepolia,
            polygonZkEvm,
            hederaMainnet,
            hederaTestnet,
            // Hedera Native Networks  
            HederaChainDefinition.Native.Mainnet,
            HederaChainDefinition.Native.Testnet,
          ],
          defaultNetwork: mainnet, // Set default network
          themeMode: 'dark',
          themeVariables: {
            '--w3m-color-mix': '#1a1a1a',
            '--w3m-color-mix-strength': 20,
            '--w3m-accent': '#3b82f6',
            '--w3m-border-radius-master': '8px',
          },
          features: {
            analytics: true,
            email: false,
            socials: false,
          },
          enableWalletConnect: true,
          enableInjected: true,
          enableEIP6963: true,
          enableCoinbase: true,
        });

        console.log('🎯 AppKit instance created with networks:', {
          totalNetworks: appKitInstance?.networks?.length || 'unknown',
          supportedChains: [mainnet.id, sepolia.id, baseSepolia.id, polygonZkEvm.id, hederaMainnet.id, hederaTestnet.id]
        });

        // Add comprehensive event listeners
        hederaUniversalProvider.on('display_uri', (uri: string) => {
          console.log('🔗 WalletConnect URI generated:', uri);
        });

        hederaUniversalProvider.on('session_proposal', (proposal: any) => {
          console.log('📋 Session proposal received:', proposal);
        });

        hederaUniversalProvider.on('session_request', (request: any) => {
          console.log('📨 Session request:', request);
        });

        hederaUniversalProvider.on('session_ping', (event: any) => {
          console.log('🏓 Session ping:', event);
        });

        hederaUniversalProvider.on('session_event', (event: any) => {
          console.log('📡 Session event:', event);
        });

        hederaUniversalProvider.on('session_update', (event: any) => {
          console.log('🔄 Session updated:', event);
        });

        hederaUniversalProvider.on('session_delete', (event: any) => {
          console.log('🗑️ Session deleted:', event);
        });

        hederaUniversalProvider.on('connect', (session: any) => {
          console.log('✅ Wallet connected successfully:', {
            topic: session.topic,
            accounts: session.namespaces,
            expiry: session.expiry
          });
        });

        hederaUniversalProvider.on('disconnect', (event: any) => {
          console.log('❌ Wallet disconnected:', event);
        });

        hederaUniversalProvider.on('accountsChanged', (accounts: string[]) => {
          console.log('👤 Accounts changed:', accounts);
        });

        hederaUniversalProvider.on('chainChanged', (chainId: string) => {
          console.log('🔄 Chain changed:', chainId);
        });

        // Listen for wallet detection
        if (window.ethereum) {
          console.log('🦊 Ethereum provider detected:', {
            isMetaMask: window.ethereum.isMetaMask,
            isCoinbaseWallet: window.ethereum.isCoinbaseWallet,
            providers: window.ethereum.providers?.length || 'N/A'
          });
        }

        // Check for multiple wallet providers
        if (window.ethereum?.providers) {
          console.log('🔍 Multiple wallet providers detected:', 
            window.ethereum.providers.map((p: any) => ({
              isMetaMask: p.isMetaMask,
              isCoinbaseWallet: p.isCoinbaseWallet,
              isRabby: p.isRabby,
              isTrust: p.isTrust
            }))
          );
        }

        setAppKit(appKitInstance);
        setUniversalProvider(hederaUniversalProvider);
        setIsInitialized(true);
        console.log('✅ AppKit fully initialized with comprehensive wallet support');

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to initialize AppKit';
        console.error('❌ Failed to initialize AppKit:', err);
        setError(errorMessage);
      }
    };

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(initializeAppKit, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppKitContext.Provider value={{ isInitialized, appKit, universalProvider, error }}>
      {children}
    </AppKitContext.Provider>
  );
};

const AppContent = () => {
  const { isInitialized, error } = useAppKitContext();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Initialization Error</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <p className="text-sm text-muted-foreground">
            Please check your WalletConnect Project ID or try refreshing the page.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Initializing wallet connections...</p>
          <p className="text-sm text-muted-foreground mt-2">
            Detecting available wallets...
          </p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/yield" element={<Yield />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppKitProvider>
          <AppContent />
        </AppKitProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;