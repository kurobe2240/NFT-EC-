import { createContext, useContext, useState, ReactNode } from 'react';
import { useNotification } from './NotificationContext';

interface WalletContextType {
  isConnected: boolean;
  address: string | null;
  balance: number;
  connect: () => Promise<void>;
  disconnect: () => void;
  deductBalance: (amount: number) => boolean;
  formatBalance: (balance: number) => string;
}

const WalletContext = createContext<WalletContextType | null>(null);

// テストウォレット用の設定
const TEST_WALLETS = [
  {
    address: '0x7890abcdef1234567890abcdef1234567890abcd',
    balance: 5.0,
    name: 'テストウォレット1'
  },
  {
    address: '0xabcdef1234567890abcdef1234567890abcdef12',
    balance: 3.0,
    name: 'テストウォレット2'
  },
  {
    address: '0x1234567890abcdef1234567890abcdef12345678',
    balance: 10.0,
    name: 'テストウォレット3'
  }
];

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState(0);
  const { showNotification } = useNotification();

  // 残高のフォーマット
  const formatBalance = (amount: number) => {
    return `Ξ ${amount.toFixed(3)}`;
  };

  // 残高の差し引き
  const deductBalance = (amount: number) => {
    if (!isConnected) {
      showNotification('ウォレットが接続されていません', 'error');
      return false;
    }

    if (balance < amount) {
      showNotification(`残高が不足しています（必要額: ${formatBalance(amount)}、残高: ${formatBalance(balance)}）`, 'error');
      return false;
    }

    setBalance(prev => {
      const newBalance = prev - amount;
      showNotification(`${formatBalance(amount)}を支払いました（残高: ${formatBalance(newBalance)}）`, 'success');
      return newBalance;
    });
    return true;
  };

  const connect = async () => {
    try {
      // ランダムなテストウォレットを選択
      const randomWallet = TEST_WALLETS[Math.floor(Math.random() * TEST_WALLETS.length)];
      
      // 接続の遅延をシミュレート
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsConnected(true);
      setAddress(randomWallet.address);
      setBalance(randomWallet.balance);
      
      showNotification(
        `${randomWallet.name}を接続しました（残高: ${formatBalance(randomWallet.balance)}）`,
        'success'
      );
    } catch (error) {
      showNotification('ウォレットの接続に失敗しました', 'error');
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setAddress(null);
    setBalance(0);
    showNotification('ウォレットを切断しました', 'info');
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        address,
        balance,
        connect,
        disconnect,
        deductBalance,
        formatBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 