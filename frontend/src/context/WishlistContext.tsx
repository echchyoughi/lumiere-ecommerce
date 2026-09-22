import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, WishlistItem } from '../services/api';
import { useToast } from './ToastContext';

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  loading: boolean;
  toggleWishlist: (productId: number) => Promise<void>;
  isWishlisted: (productId: number) => boolean;
  fetchWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const res = await api.getWishlist();
      if (res.success) {
        setWishlistItems(res.items);
      }
    } catch (err) {
      console.error('Failed to load wishlist', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const toggleWishlist = async (productId: number) => {
    try {
      const res = await api.toggleWishlist(productId);
      if (res.success) {
        showToast(res.message);
        await fetchWishlist();
      }
    } catch (err) {
      showToast('Could not update wishlist', 'error');
    }
  };

  const isWishlisted = (productId: number) => {
    return wishlistItems.some((item) => item.productId === productId);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        wishlistCount: wishlistItems.length,
        loading,
        toggleWishlist,
        isWishlisted,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
