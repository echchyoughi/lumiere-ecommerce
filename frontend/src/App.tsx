import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductPage } from './pages/ProductPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { WishlistPage } from './pages/WishlistPage';

export const App: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <ToastProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              <Navbar onOpenAuth={() => setAuthModalOpen(true)} />

              <div style={{ flexGrow: 1 }}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/confirmation/:orderNumber" element={<ConfirmationPage />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                </Routes>
              </div>

              <Footer />
              <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </ToastProvider>
  );
};
