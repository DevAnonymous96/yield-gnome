import { LedgerId, AccountId, Client } from '@hashgraph/sdk';

export interface HederaNetwork {
  name: string;
  chainId: number;
  ledgerId: LedgerId;
  isMainnet: boolean;
}

export const HEDERA_NETWORKS: Record<string, HederaNetwork> = {
  mainnet: {
    name: 'Hedera Mainnet',
    chainId: 295,
    ledgerId: LedgerId.MAINNET,
    isMainnet: true,
  },
  testnet: {
    name: 'Hedera Testnet',
    chainId: 296,
    ledgerId: LedgerId.TESTNET,
    isMainnet: false,
  },
};

export const getNetworkByChainId = (chainId: number): HederaNetwork | null => {
  return Object.values(HEDERA_NETWORKS).find(network => network.chainId === chainId) || null;
};

export const formatHederaAddress = (address: string): string => {
  // Handle both EVM addresses (0x...) and Hedera account IDs (0.0.123)
  if (address.startsWith('0x')) {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  } else if (address.match(/^\d+\.\d+\.\d+$/)) {
    return address; // Hedera account ID is already short
  }
  return address;
};

export const isValidHederaAccountId = (accountId: string): boolean => {
  try {
    AccountId.fromString(accountId);
    return true;
  } catch {
    return false;
  }
};

export const isValidEVMAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
};

export const createHederaClient = (network: 'mainnet' | 'testnet'): Client => {
  return network === 'mainnet' ? Client.forMainnet() : Client.forTestnet();
};

export const getExplorerUrl = (network: 'mainnet' | 'testnet', txId: string): string => {
  const baseUrl = network === 'mainnet' 
    ? 'https://hashscan.io/mainnet' 
    : 'https://hashscan.io/testnet';
  return `${baseUrl}/transaction/${txId}`;
};

export const formatBalance = (balance: string | number, decimals = 18): string => {
  const balanceNum = typeof balance === 'string' ? parseFloat(balance) : balance;
  
  if (balanceNum === 0) return '0.00';
  
  if (balanceNum < 0.01) {
    return '< 0.01';
  }
  
  if (balanceNum < 1000) {
    return balanceNum.toFixed(2);
  }
  
  if (balanceNum < 1000000) {
    return `${(balanceNum / 1000).toFixed(1)}K`;
  }
  
  return `${(balanceNum / 1000000).toFixed(1)}M`;
};

// Common Hedera token addresses and information
export const HEDERA_TOKENS = {
  HBAR: {
    symbol: 'HBAR',
    name: 'HBAR',
    decimals: 8,
    isNative: true,
  },
  USDC: {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    tokenId: {
      mainnet: '0.0.456858',
      testnet: '0.0.123456', // Example testnet token ID
    },
  },
  // Add more tokens as needed
};

export const getSupportedWallets = () => {
  return [
    {
      name: 'HashPack',
      id: 'hashpack',
      icon: '/wallets/hashpack.png',
      downloadUrl: 'https://hashpack.app/',
      supported: ['hedera', 'eip155'],
    },
    {
      name: 'Blade',
      id: 'blade',
      icon: '/wallets/blade.png', 
      downloadUrl: 'https://bladewallet.io/',
      supported: ['hedera', 'eip155'],
    },
    {
      name: 'Kabila',
      id: 'kabila',
      icon: '/wallets/kabila.png',
      downloadUrl: 'https://wallet.kabila.app/',
      supported: ['hedera'],
    },
  ];
};