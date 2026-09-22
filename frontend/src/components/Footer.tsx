import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Trust strip */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            paddingBottom: '40px',
            marginBottom: '40px',
            borderBottom: '1px solid var(--border-color)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Truck size={28} color="#c5a059" />
            <div>
              <strong style={{ color: '#fff', display: 'block' }}>Free Express Shipping</strong>
              <span style={{ fontSize: '13px' }}>On all orders over $100</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <RotateCcw size={28} color="#c5a059" />
            <div>
              <strong style={{ color: '#fff', display: 'block' }}>30-Day Hassle Returns</strong>
              <span style={{ fontSize: '13px' }}>Full money-back guarantee</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <ShieldCheck size={28} color="#c5a059" />
            <div>
              <strong style={{ color: '#fff', display: 'block' }}>256-Bit SSL Security</strong>
              <span style={{ fontSize: '13px' }}>Safe & encrypted checkout</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Headphones size={28} color="#c5a059" />
            <div>
              <strong style={{ color: '#fff', display: 'block' }}>24/7 VIP Support</strong>
              <span style={{ fontSize: '13px' }}>Dedicated concierge service</span>
            </div>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="logo">
              LUMIÈRE<span>.</span>
            </Link>
            <p>
              Curated premium lifestyle essentials for discerning individuals. Experience unmatched quality, timeless design, and modern craftsmanship.
            </p>
          </div>

          <div className="footer-col">
            <h4>SHOP</h4>
            <ul className="footer-links">
              <li><Link to="/shop?cat=electronics">Electronics</Link></li>
              <li><Link to="/shop?cat=fashion">Fashion & Apparel</Link></li>
              <li><Link to="/shop?cat=accessories">Luxury Accessories</Link></li>
              <li><Link to="/shop?cat=beauty">Fragrances & Beauty</Link></li>
              <li><Link to="/shop?cat=new">New Collection 2026</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>CUSTOMER CARE</h4>
            <ul className="footer-links">
              <li><Link to="/cart">Shopping Cart</Link></li>
              <li><Link to="/wishlist">Your Wishlist</Link></li>
              <li><a href="#tracking">Track Order</a></li>
              <li><a href="#faq">Shipping & Returns</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>NEWSLETTER</h4>
            <p style={{ fontSize: '13px', marginBottom: '14px' }}>
              Subscribe to receive private invitations to exclusive product releases.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to LUMIÈRE!'); }} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                type="email"
                placeholder="Enter your email"
                required
                style={{
                  padding: '12px 14px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#fff',
                  fontSize: '13px'
                }}
              />
              <button type="submit" className="btn btn-primary" style={{ padding: '10px', fontSize: '12px' }}>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 LUMIÈRE Premium Lifestyle Store. Built with React & Node.js Backend.</p>
        </div>
      </div>
    </footer>
  );
};
