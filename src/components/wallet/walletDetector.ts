// utils/walletDetector.ts
import { WalletInfo, WalletType, ChainType } from "./wallet.types";

export const detectInstalledWallets = (): WalletInfo[] => {
  const wallets: WalletInfo[] = [];

  // Check MetaMask
  if (typeof window !== "undefined") {
    if (window.ethereum && window.ethereum.isMetaMask) {
      wallets.push({
        name: "MetaMask",
        type: WalletType.METAMASK,
        chainType: ChainType.EVM,
        icon: "/metamaskLogo.png",
        installed: true,
      });
    }

    // Check HashPack
    if (window.hashpack) {
      wallets.push({
        name: "HashPack",
        type: WalletType.HASHPACK,
        chainType: ChainType.HEDERA,
        icon: "/hashpackLogo.png",
        installed: true,
      });
    }

    // Check Blade Wallet
    if (window.bladeWallet) {
      wallets.push({
        name: "Blade Wallet",
        type: WalletType.BLADE,
        chainType: ChainType.HEDERA,
        icon: "/bladewalletLogo.png",
        installed: true,
      });
    }
  }
  

  // Add non-installed wallets with installation links
  const allWallets = [
    {
      name: "MetaMask",
      type: WalletType.METAMASK,
      chainType: ChainType.EVM,
      icon: "/metamaskLogo.png",
      installed: false,
    },
    {
      name: "HashPack",
      type: WalletType.HASHPACK,
      chainType: ChainType.HEDERA,
      icon: "/hashpackLogo.png",
      installed: false,
    },
    {
      name: "Blade Wallet",
      type: WalletType.BLADE,
      chainType: ChainType.HEDERA,
      icon: "/bladewalletLogo.png",
      installed: false,
    },
  ];

  // Add non-installed wallets
  allWallets.forEach((wallet) => {
    if (!wallets.find((w) => w.type === wallet.type)) {
      wallets.push(wallet);
    }
  });

  return wallets;
};

export const getWalletInstallUrl = (walletType: WalletType): string => {
  switch (walletType) {
    case WalletType.METAMASK:
      return "https://metamask.io/download/";
    case WalletType.HASHPACK:
      return "https://www.hashpack.app/download";
    case WalletType.BLADE:
      return "https://bladewallet.io/";
    default:
      return "#";
  }
};

export const isWalletInstalled = (walletType: WalletType): boolean => {
  if (typeof window === "undefined") return false;

  switch (walletType) {
    case WalletType.METAMASK:
      return !!(window.ethereum && window.ethereum.isMetaMask);
    case WalletType.HASHPACK:
      return !!window.hashpack;
    case WalletType.BLADE:
      return !!window.bladeWallet;
    default:
      return false;
  }
};
