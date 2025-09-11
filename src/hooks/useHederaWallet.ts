import { useState, useEffect, useCallback } from 'react';
import { useAppKitContext } from '../App';
import { useAppKit, useAppKitAccount, useAppKitNetwork } from '@reown/appkit/react';

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  isLoading: boolean;
  error: string | null;
}

export const useWallet = () => {
  const { isInitialized } = useAppKitContext();
  const { open, close } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();
  
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
    isLoading: false,
    error: null,
  });

  // Only update state if AppKit is initialized
  useEffect(() => {
    if (isInitialized) {
      setWalletState(prev => ({
        ...prev,
        isConnected: isConnected || false,
        address: address || null,
        chainId: chainId || null,
      }));
    }
  }, [isInitialized, isConnected, address, chainId]);

  const connectWallet = useCallback(async () => {
    if (!isInitialized) {
      console.warn('AppKit not initialized yet');
      return;
    }

    try {
      setWalletState(prev => ({ ...prev, isLoading: true, error: null }));
      open();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      setWalletState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to connect wallet',
        isLoading: false,
      }));
    }

    setWalletState(prev => ({ ...prev, isLoading: false }));
  }, [open, isInitialized]);

  const disconnect = useCallback(async () => {
    if (!isInitialized) {
      console.warn('AppKit not initialized yet');
      return;
    }

    try {
      setWalletState(prev => ({ ...prev, isLoading: true, error: null }));
      close();
      setWalletState(prev => ({
        ...prev,
        isConnected: false,
        address: null,
        chainId: null,
        isLoading: false,
      }));
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
      setWalletState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to disconnect wallet',
        isLoading: false,
      }));
    }
  }, [close, isInitialized]);

  const getShortAddress = useCallback((addr?: string | null) => {
    const targetAddress = addr || walletState.address;
    if (!targetAddress) return '';
    return `${targetAddress.slice(0, 6)}...${targetAddress.slice(-4)}`;
  }, [walletState.address]);

  const getNetworkName = useCallback(() => {
    switch (walletState.chainId) {
      case 295: // Hedera Mainnet
        return 'Hedera Mainnet';
      case 296: // Hedera Testnet
        return 'Hedera Testnet';
      case 295: // Hedera EVM Mainnet
        return 'Hedera EVM Mainnet';
      case 296: // Hedera EVM Testnet  
        return 'Hedera EVM Testnet';
      default:
        return 'Unknown Network';
    }
  }, [walletState.chainId]);

  const isMainnet = walletState.chainId === 295;
  const isTestnet = walletState.chainId === 296;

  // Log final wallet state
  useEffect(() => {
    console.log('🎯 Final wallet state:', {
      isConnected: walletState.isConnected,
      address: walletState.address,
      shortAddress: walletState.address ? getShortAddress() : null,
      chainId: walletState.chainId,
      networkName: walletState.chainId ? getNetworkName() : null,
      isMainnet,
      isTestnet,
      isLoading: walletState.isLoading,
      error: walletState.error,
    });
  }, [walletState, getShortAddress, getNetworkName, isMainnet, isTestnet]);

  return {
    ...walletState,
    connectWallet,
    disconnect,
    getShortAddress,
    getNetworkName,
    isMainnet,
    isTestnet,
    openModal: connectWallet,
  };
};