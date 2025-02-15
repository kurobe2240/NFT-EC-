import { createContext, useContext, useState, ReactNode, useMemo, useCallback } from 'react';
import type { NFT } from '../types/nft';

interface CartContextType {
  items: NFT[];
  addToCart: (nft: NFT) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  total: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<NFT[]>(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Failed to load cart from storage:', error);
      return [];
    }
  });

  // カートの状態をローカルストレージに保存
  const saveCartToStorage = useCallback((cartItems: NFT[]) => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart to storage:', error);
    }
  }, []);

  const addToCart = useCallback((nft: NFT) => {
    if (!items.some(item => item.id === nft.id)) {
      const newItems = [...items, nft];
      setItems(newItems);
      // 状態更新後にストレージ保存を行う
      queueMicrotask(() => saveCartToStorage(newItems));
    }
  }, [items, saveCartToStorage]);

  const removeFromCart = useCallback((id: string) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    // 状態更新後にストレージ保存を行う
    queueMicrotask(() => saveCartToStorage(newItems));
  }, [items, saveCartToStorage]);

  const clearCart = useCallback(() => {
    setItems([]);
    // 状態更新後にストレージ保存を行う
    queueMicrotask(() => localStorage.removeItem('cart'));
  }, []);

  const isInCart = useCallback((id: string) => {
    return items.some((item) => item.id === id);
  }, [items]);

  // 合計金額の計算をメモ化
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 