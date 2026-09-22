import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Star, ShoppingBag, ShieldCheck, Award, Flame, Truck } from 'lucide-react';
import { api, Product } from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export const HomePage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'trending' | 'new' | 'sale'>('trending');
  const { addToCart } = useCart();

  useEffect(() => {
    api.getProducts().then((res) => {
      if (res.success) {
        setAllProducts(res.products);
      }
      setLoading(false);
    });
  }, []);

  const trendingProducts = allProducts.filter((p) => p.badge === 'hot' || p.rating >= 4.8);
  const newProducts = allProducts.filter((p) => p.isNew || p.badge === 'new');
  const saleProducts = allProducts.filter((p) => p.badge === 'sale' || p.originalPrice);

  const displayProducts =
    activeTab === 'trending'
      ? trendingProducts
      : activeTab === 'new'
      ? newProducts
      : saleProducts;

  // Spotlight featured product for Hero glass card
  const spotlightProduct = allProducts.find((p) => p.id === 10) || allProducts[0];

  return (
    <div>
      {/* ENHANCED HERO SECTION */}
      <section className="hero-wrapper">
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="hero-grid">
            {/* LEFT COLUMN: HEADLINE & ACTIONS */}
            <div>
              <div className="hero-pill">
                <span className="hero-pulse-dot"></span>
                <span>2026 EDITORIAL COLLECTION</span>
              </div>

              <h1 className="hero-headline">
                The Benchmark of<br />
                <em style={{ color: 'var(--color-primary)', fontStyle: 'italic', fontWeight: 600 }}>
                  Modern Living.
                </em>
              </h1>

              <p className="hero-subtext">
                Curated architectural lighting, Swiss horology, audiophile sound, and Italian leather essentials. Crafted for those who appreciate understated elegance.
              </p>

              <div className="hero-actions">
                <Link to="/shop" className="btn btn-primary">
                  Explore Collection <ArrowRight size={16} />
                </Link>
                <Link to="/shop?cat=electronics" className="btn btn-outline">
                  Shop Trending
                </Link>
              </div>

              {/* GLASS STAT CARDS */}
              <div className="hero-stats-row">
                <div className="hero-stat-card">
                  <div className="hero-stat-number">100%</div>
                  <div className="hero-stat-label">Authentic Quality</div>
                </div>

                <div className="hero-stat-card">
                  <div className="hero-stat-number">4.9 ★</div>
                  <div className="hero-stat-label">Global Rating</div>
                </div>

                <div className="hero-stat-card">
                  <div className="hero-stat-number">Express</div>
                  <div className="hero-stat-label">Worldwide Delivery</div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: FLOATING SPOTLIGHT GLASS CARD */}
            {spotlightProduct && (
              <div className="hero-featured-card">
                <span className="hero-card-badge">Spotlight Drop</span>

                <div style={{ position: 'relative', aspectRatio: '4/3', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '20px', background: '#111319' }}>
                  <img
                    src={spotlightProduct.image || spotlightProduct.images[0]}
                    alt={spotlightProduct.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div>
                    <span style={{ color: 'var(--color-primary)', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                      {spotlightProduct.category}
                    </span>
                    <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#fff', margin: '4px 0 8px' }}>
                      {spotlightProduct.name}
                    </h3>
                  </div>
                  <span style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-gold)', fontFamily: "'Cormorant Garamond', serif" }}>
                    ${spotlightProduct.price.toFixed(2)}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b', fontSize: '13px' }}>
                    <Star size={14} fill="#f59e0b" color="#f59e0b" />
                    <span style={{ fontWeight: 700, color: '#fff' }}>{spotlightProduct.rating.toFixed(1)}</span>
                    <span style={{ color: 'var(--text-muted)' }}>({spotlightProduct.reviewsCount} reviews)</span>
                  </div>

                  <button
                    className="btn btn-primary"
                    style={{ padding: '10px 18px', fontSize: '12px' }}
                    onClick={() => addToCart(spotlightProduct)}
                  >
                    <ShoppingBag size={14} /> Quick Bag
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CATEGORY SHOWCASE CARDS */}
      <section style={{ padding: '100px 0 60px' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span style={{ color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '12px', fontWeight: 700 }}>
              Curated Departments
            </span>
            <h2 className="section-title">Shop By Category</h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px'
            }}
          >
            {[
              { title: 'Audiophile Sound', cat: 'electronics', img: '/images/product_headphones.jpg', count: 'Electronics' },
              { title: 'Fine Accessories', cat: 'accessories', img: '/images/product_watch.jpg', count: 'Watches & Bags' },
              { title: 'Modern Apparel', cat: 'fashion', img: '/images/product_sneakers.jpg', count: 'Footwear & Style' },
              { title: 'Architectural Home', cat: 'beauty', img: '/images/product_lamp.jpg', count: 'Lighting & Living' }
            ].map((c, idx) => (
              <Link
                key={idx}
                to={`/shop?cat=${c.cat}`}
                style={{
                  position: 'relative',
                  height: '280px',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '24px',
                  background: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(10,12,15,0.92) 100%), url("${c.img}") center/cover no-repeat`,
                  transition: 'transform 0.4s ease, border-color 0.4s ease'
                }}
              >
                <span style={{ color: 'var(--color-primary)', fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '4px' }}>
                  {c.count}
                </span>
                <h3 style={{ fontSize: '24px', fontWeight: 600, color: '#fff' }}>{c.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRENDING PRODUCTS TABBED SECTION */}
      <section style={{ padding: '60px 0 100px' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', gap: '24px' }}>
            <div>
              <span style={{ color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Flame size={16} color="var(--color-primary)" /> Top Selections
              </span>
              <h2 className="section-title" style={{ marginBottom: '0' }}>Trending & Popular Products</h2>
            </div>

            {/* TAB SWITCHER */}
            <div style={{ display: 'flex', gap: '10px', background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '30px', border: '1px solid var(--border-color)' }}>
              <button
                onClick={() => setActiveTab('trending')}
                className={`btn ${activeTab === 'trending' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px 20px', fontSize: '12px', borderRadius: '20px' }}
              >
                Trending Now
              </button>
              <button
                onClick={() => setActiveTab('new')}
                className={`btn ${activeTab === 'new' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px 20px', fontSize: '12px', borderRadius: '20px' }}
              >
                New Arrivals
              </button>
              <button
                onClick={() => setActiveTab('sale')}
                className={`btn ${activeTab === 'sale' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '8px 20px', fontSize: '12px', borderRadius: '20px' }}
              >
                On Sale
              </button>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '80px', color: 'var(--text-muted)' }}>Loading trending collection...</div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '32px'
              }}
            >
              {displayProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* EDITORIAL SPOTLIGHT */}
      <section style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', padding: '90px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <div>
              <span style={{ color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '12px', fontWeight: 700 }}>
                Editorial Spotlight
              </span>
              <h2 style={{ fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 700, margin: '16px 0 24px', lineHeight: 1.2 }}>
                Craftsmanship Without Compromise
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: 1.7, marginBottom: '32px' }}>
                Every item in our collection undergoes rigorous quality inspection. From full-grain vegetable-tanned Italian leather to CNC-machined anodized aluminum, we partner exclusively with master artisans worldwide.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '15px' }}>
                  <Award size={20} color="var(--color-primary)" />
                  <span>Ethically sourced materials & eco-friendly tanning</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '15px' }}>
                  <ShieldCheck size={20} color="var(--color-primary)" />
                  <span>2-Year warranty on all horology & wireless tech</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '15px' }}>
                  <Truck size={20} color="var(--color-primary)" />
                  <span>Complimentary insured express shipping worldwide</span>
                </div>
              </div>

              <Link to="/shop" className="btn btn-primary">
                Shop The Catalogue <ArrowRight size={16} />
              </Link>
            </div>

            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
              <img src="/images/product_keyboard.jpg" alt="Minimalist tech craftsmanship" style={{ width: '100%', height: '440px', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
