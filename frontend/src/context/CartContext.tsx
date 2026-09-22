import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, CartItem, Product } from '../services/api';
import { useToast } from './ToastContext';

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  subtotal: number;
  loading: boolean;
  addToCart: (product: Product, quantity?: number, color?: string, size?: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  fetchCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const fetchCart = async () => {
    try {
      setLoading(true);
      const res = await api.getCart();
      if (res.success) {
        setCartItems(res.items);
      }
    } catch (err) {
      console.error('Failed to load cart', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product: Product, quantity = 1, color?: string, size?: string) => {
    try {
      const res = await api.addToCart(product.id, quantity, color, size);
      if (res.success) {
        showToast(`Added "${product.name}" to cart!`);
        await fetchCart();
      }
    } catch (err) {
      showToast('Could not add to cart', 'error');
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    try {
      const res = await api.updateCartQuantity(itemId, quantity);
      if (res.success) {
        await fetchCart();
      }
    } catch (err) {
      showToast('Failed to update cart', 'error');
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const item = cartItems.find((i) => i.id === itemId);
      const res = await api.removeFromCart(itemId);
      if (res.success) {
        if (item) showToast(`Removed "${item.product.name}" from cart`);
        await fetchCart();
      }
    } catch (err) {
      showToast('Failed to remove item', 'error');
    }
  };

  const clearCart = async () => {
    try {
      await api.clearCart();
      setCartItems([]);
    } catch (err) {
      console.error(err);
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        subtotal,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
