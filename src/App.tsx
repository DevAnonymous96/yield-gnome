import { Toaster } from "@/components/ui/toaster";
// import { Sonner } from "@/components/ui/sonner";
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
import Index from "./pages/Index";
import Yield from "./pages/Yield";
import Docs from "./pages/Docs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Replace with your actual WalletConnect Project ID
const PROJECT_ID = '7cbcd2275e7647c89784f60dff9b36b5';

const metadata = {
  name: 'Hedera Yield Optimizer',
  description: 'AI-powered yield optimization platform for Hedera',
  url: window.location.origin,
  icons: ['https://avatars.githubusercontent.com/u/179229932']
};

interface AppKitContextType {
  isInitialized: boolean;
  appKit: any;
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeAppKit = async () => {
      try {
        if (!PROJECT_ID || PROJECT_ID === 'YOUR_PROJECT_ID') {
          throw new Error('Please set your WalletConnect Project ID in the environment variables');
        }

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

        // Initialize Universal Provider
        const universalProvider = (await HederaProvider.init({
          projectId: PROJECT_ID,
          metadata,
        })) as unknown as UniversalProvider;

        // Create AppKit instance
        const appKitInstance = createAppKit({
          adapters: [hederaEVMAdapter, hederaNativeAdapter],
          // @ts-expect-error expected type error
          universalProvider,
          projectId: PROJECT_ID,
          metadata,
          networks: [
            // EVM Networks
            HederaChainDefinition.EVM.Mainnet,
            HederaChainDefinition.EVM.Testnet,
            // Native Networks  
            HederaChainDefinition.Native.Mainnet,
            HederaChainDefinition.Native.Testnet,
          ],
          themeMode: 'dark',
          themeVariables: {
            '--w3m-color-mix': '#1a1a1a',
            '--w3m-color-mix-strength': 20,
            '--w3m-accent': '#3b82f6',
            '--w3m-border-radius-master': '8px',
          }
        });

        // Add event listeners for connection status
        universalProvider.on('display_uri', (uri: string) => {
          console.log('🔗 WalletConnect URI generated:', uri);
        });

        universalProvider.on('session_proposal', (proposal: any) => {
          console.log('📋 Session proposal received:', proposal);
        });

        universalProvider.on('session_request', (request: any) => {
          console.log('📨 Session request:', request);
        });

        universalProvider.on('session_ping', (event: any) => {
          console.log('🏓 Session ping:', event);
        });

        universalProvider.on('session_event', (event: any) => {
          console.log('📡 Session event:', event);
        });

        universalProvider.on('session_update', (event: any) => {
          console.log('🔄 Session updated:', event);
        });

        universalProvider.on('session_delete', (event: any) => {
          console.log('🗑️ Session deleted:', event);
        });

        universalProvider.on('connect', (session: any) => {
          console.log('✅ Wallet connected successfully:', {
            topic: session.topic,
            accounts: session.namespaces,
            expiry: session.expiry
          });
        });

        universalProvider.on('disconnect', (event: any) => {
          console.log('❌ Wallet disconnected:', event);
        });

        setAppKit(appKitInstance);
        setIsInitialized(true);
        console.log('🚀 AppKit initialized successfully with event listeners');
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to initialize AppKit';
        console.error('Failed to initialize AppKit:', err);
        setError(errorMessage);
      }
    };

    initializeAppKit();
  }, []);

  return (
    <AppKitContext.Provider value={{ isInitialized, appKit, error }}>
      {children}
    </AppKitContext.Provider>
  );
};

const AppContent = () => {
  const { isInitialized, error } = useAppKitContext();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Initialization Error</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <p className="text-sm text-muted-foreground">
            Please check your WalletConnect Project ID in the environment variables.
          </p>
        </div>
      </div>
    );
  }

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Initializing wallet connection...</p>
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
        {/* <Sonner /> */}
        <AppKitProvider>
          <AppContent />
        </AppKitProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;