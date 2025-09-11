// adapters/walletAdapters.ts
import { WalletAdapter, ConnectedWallet, WalletType, ChainType, HederaAccountInfo } from './wallet.types'

// MetaMask Adapter
export const createMetaMaskAdapter = (): WalletAdapter => {
  let connectedAccount: string | null = null

  return {
    async connect(): Promise<ConnectedWallet> {
      if (!window.ethereum) {
        throw new Error('MetaMask not installed')
      }

      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        })
        
        const chainId = await window.ethereum.request({
          method: 'eth_chainId'
        })

        connectedAccount = accounts[0]

        return {
          type: WalletType.METAMASK,
          chainType: ChainType.EVM,
          address: accounts[0],
          chainId: parseInt(chainId, 16)
        }
      } catch (error) {
        throw new Error(`MetaMask connection failed: ${error}`)
      }
    },

    async disconnect(): Promise<void> {
      connectedAccount = null
      // MetaMask doesn't have a programmatic disconnect
      // User needs to disconnect from MetaMask UI
    },

    async getBalance(): Promise<string> {
      if (!connectedAccount || !window.ethereum) return '0'
      
      try {
        const balance = await window.ethereum.request({
          method: 'eth_getBalance',
          params: [connectedAccount, 'latest']
        })
        return (parseInt(balance, 16) / 1e18).toString()
      } catch {
        return '0'
      }
    },

    isConnected(): boolean {
      return !!connectedAccount
    },

    getAddress(): string | null {
      return connectedAccount
    },

    async switchChain(chainId: number): Promise<void> {
      if (!window.ethereum) throw new Error('MetaMask not available')
      
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${chainId.toString(16)}` }]
        })
      } catch (error: any) {
        if (error.code === 4902) {
          throw new Error('Chain not added to MetaMask')
        }
        throw error
      }
    }
  }
}

// HashPack Adapter
export const createHashPackAdapter = (): WalletAdapter => {
  let connectedAccount: HederaAccountInfo | null = null

  return {
    async connect(): Promise<ConnectedWallet> {
      if (!window.hashpack) {
        throw new Error('HashPack not installed')
      }

      try {
        const hashconnect = window.hashpack
        await hashconnect.init()
        
        const accountInfo = await hashconnect.connectToLocalWallet()
        connectedAccount = accountInfo

        return {
          type: WalletType.HASHPACK,
          chainType: ChainType.HEDERA,
          address: accountInfo.evmAddress,
          accountId: accountInfo.accountId
        }
      } catch (error) {
        throw new Error(`HashPack connection failed: ${error}`)
      }
    },

    async disconnect(): Promise<void> {
      if (window.hashpack) {
        await window.hashpack.disconnect()
      }
      connectedAccount = null
    },

    async getBalance(): Promise<string> {
      if (!connectedAccount) return '0'
      
      try {
        // This would typically use Hedera SDK to get balance
        // For now, returning placeholder
        return '0'
      } catch {
        return '0'
      }
    },

    isConnected(): boolean {
      return !!connectedAccount
    },

    getAddress(): string | null {
      return connectedAccount?.evmAddress || null
    }
  }
}

// Blade Wallet Adapter
export const createBladeAdapter = (): WalletAdapter => {
  let connectedAccount: HederaAccountInfo | null = null

  return {
    async connect(): Promise<ConnectedWallet> {
      if (!window.bladeWallet) {
        throw new Error('Blade Wallet not installed')
      }

      try {
        const result = await window.bladeWallet.connect()
        connectedAccount = {
          accountId: result.accountId,
          evmAddress: result.evmAddress
        }

        return {
          type: WalletType.BLADE,
          chainType: ChainType.HEDERA,
          address: result.evmAddress,
          accountId: result.accountId
        }
      } catch (error) {
        throw new Error(`Blade Wallet connection failed: ${error}`)
      }
    },

    async disconnect(): Promise<void> {
      if (window.bladeWallet) {
        await window.bladeWallet.disconnect()
      }
      connectedAccount = null
    },

    async getBalance(): Promise<string> {
      if (!connectedAccount) return '0'
      
      try {
        // This would typically use Hedera SDK to get balance
        return '0'
      } catch {
        return '0'
      }
    },

    isConnected(): boolean {
      return !!connectedAccount
    },

    getAddress(): string | null {
      return connectedAccount?.evmAddress || null
    }
  }
}

// Wallet Adapter Factory
export const createWalletAdapter = (walletType: WalletType): WalletAdapter => {
  switch (walletType) {
    case WalletType.METAMASK:
      return createMetaMaskAdapter()
    case WalletType.HASHPACK:
      return createHashPackAdapter()
    case WalletType.BLADE:
      return createBladeAdapter()
    default:
      throw new Error(`Unsupported wallet type: ${walletType}`)
  }
}