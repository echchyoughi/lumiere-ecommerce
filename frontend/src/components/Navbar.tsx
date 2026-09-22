import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface NavbarProps {
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link to="/" className="logo">
          LUMIÈRE<span>.</span>
        </Link>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Shop All
          </NavLink>
          <NavLink to="/shop?cat=electronics" className="nav-link">
            Electronics
          </NavLink>
          <NavLink to="/shop?cat=fashion" className="nav-link">
            Fashion
          </NavLink>
          <NavLink to="/shop?cat=accessories" className="nav-link">
            Accessories
          </NavLink>
        </nav>

        <div className="nav-actions">
          <button
            className="icon-btn"
            onClick={() => setSearchOpen(!searchOpen)}
            title="Search Products"
          >
            <Search size={18} />
          </button>

          <Link to="/wishlist" className="icon-btn" title="Wishlist">
            <Heart size={18} />
            {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
          </Link>

          <Link to="/cart" className="icon-btn" title="Shopping Cart">
            <ShoppingBag size={18} />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>

          <button className="icon-btn" onClick={onOpenAuth} title="Account / Login">
            <User size={18} />
          </button>
        </div>
      </div>

      {/* Search overlay dropdown */}
      {searchOpen && (
        <div style={{ background: '#11141d', padding: '16px 0', borderBottom: '1px solid var(--border-color)' }}>
          <div className="container">
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: '12px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by title, category, specs..."
                autoFocus
                style={{
                  flexGrow: 1,
                  padding: '12px 18px',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--border-focus)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#fff',
                  fontSize: '15px'
                }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px' }}>
                Search
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};
