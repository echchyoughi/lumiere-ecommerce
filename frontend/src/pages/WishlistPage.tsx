import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlistItems, loading } = useWishlist();

  if (loading) {
    return (
      <div className="container main-content" style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-muted)' }}>
        Loading your saved wishlist...
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container main-content" style={{ textAlign: 'center', padding: '100px 0' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(197,160,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--color-primary)' }}>
          <Heart size={36} />
        </div>
        <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px' }}>Your Wishlist is Empty</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Save items you love by tapping the heart icon on any product card.</p>
        <Link to="/shop" className="btn btn-primary">
          Discover Products <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container main-content">
      <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '32px' }}>My Wishlist ({wishlistItems.length})</h1>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '30px'
        }}
      >
        {wishlistItems.map((item) => (
          <ProductCard key={item.id} product={item.product} />
        ))}
      </div>
    </div>
  );
};
