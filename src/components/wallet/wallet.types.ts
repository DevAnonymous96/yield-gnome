// types/wallet.types.ts
export enum WalletType {
  METAMASK = 'metamask',
  HASHPACK = 'hashpack',
  BLADE = 'blade'
}

export enum ChainType {
  EVM = 'evm',
  HEDERA = 'hedera'
}

export interface WalletInfo {
  name: string
  type: WalletType
  chainType: ChainType
  icon?: string
  installed: boolean
}

export interface ConnectedWallet {
  type: WalletType
  chainType: ChainType
  address: string
  accountId?: string // For Hedera
  chainId?: number // For EVM
}

export interface WalletAdapter {
  connect(): Promise<ConnectedWallet>
  disconnect(): Promise<void>
  getBalance(): Promise<string>
  isConnected(): boolean
  getAddress(): string | null
  switchChain?(chainId: number): Promise<void>
}

export interface WalletContextType {
  connectedWallet: ConnectedWallet | null
  availableWallets: WalletInfo[]
  isConnecting: boolean
  error: string | null
  connectWallet: (walletType: WalletType) => Promise<void>
  disconnectWallet: () => Promise<void>
  switchChain: (chainId: number) => Promise<void>
}

// Hedera types
export interface HederaAccountInfo {
  accountId: string
  evmAddress: string
}

// EVM types
declare global {
  interface Window {
    ethereum?: any
    hashpack?: any
    bladeWallet?: any
  }
}