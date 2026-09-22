import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, TrendingUp, ShieldCheck, Award, Flame } from 'lucide-react';
import { api, Product } from '../services/api';
import { ProductCard } from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'trending' | 'new' | 'sale'>('trending');

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

  return (
    <div>
      {/* HERO SECTION */}
      <section
        style={{
          position: 'relative',
          minHeight: '86vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(180deg, rgba(13,15,18,0.45) 0%, rgba(13,15,18,0.95) 100%), url("/images/hero_banner.jpg") center/cover no-repeat',
          borderBottom: '1px solid var(--border-color)',
          marginTop: '-120px',
          paddingTop: '180px',
          paddingBottom: '100px'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '680px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 18px',
                background: 'rgba(212, 178, 111, 0.12)',
                border: '1px solid rgba(212, 178, 111, 0.3)',
                borderRadius: '30px',
                color: 'var(--color-primary)',
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '1.5px',
                marginBottom: '28px'
              }}
            >
              <Sparkles size={14} /> 2026 EDITORIAL COLLECTION
            </div>

            <h1
              style={{
                fontSize: 'clamp(46px, 6vw, 76px)',
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: '28px',
                letterSpacing: '-0.02em'
              }}
            >
              The Benchmark of<br />
              <em style={{ color: 'var(--color-primary)', fontStyle: 'italic', fontWeight: 600 }}>Modern Living.</em>
            </h1>

            <p style={{ fontSize: '19px', color: 'var(--text-muted)', marginBottom: '40px', lineHeight: 1.7, fontWeight: 400 }}>
              Curated architectural lighting, Swiss horology, audiophile sound, and Italian leather essentials. Crafted for those who appreciate understated elegance.
            </p>

            <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
              <Link to="/shop" className="btn btn-primary" style={{ padding: '16px 32px' }}>
                Explore Collection <ArrowRight size={16} />
              </Link>
              <Link to="/shop?cat=electronics" className="btn btn-outline" style={{ padding: '16px 32px' }}>
                Shop Trending
              </Link>
            </div>

            {/* TRUST MARQUEE COUNTERS */}
            <div
              style={{
                display: 'flex',
                gap: '40px',
                marginTop: '60px',
                paddingTop: '36px',
                borderTop: '1px solid var(--border-color)'
              }}
            >
              <div>
                <span style={{ display: 'block', fontSize: '28px', fontWeight: 700, color: 'var(--color-primary)', fontFamily: "'Cormorant Garamond', serif" }}>
                  100%
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Authentic Quality</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '28px', fontWeight: 700, color: 'var(--color-primary)', fontFamily: "'Cormorant Garamond', serif" }}>
                  4.9 / 5.0
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Global Client Rating</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '28px', fontWeight: 700, color: 'var(--color-primary)', fontFamily: "'Cormorant Garamond', serif" }}>
                  Express
                </span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '1px', textTransform: 'uppercase' }}>Worldwide Delivery</span>
              </div>
            </div>
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
                  background: `linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(13,15,18,0.92) 100%), url("${c.img}") center/cover no-repeat`,
                  transition: 'transform 0.4s ease, border-color 0.4s ease'
                }}
                className="category-card"
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
              </div>

              <Link to="/shop" className="btn btn-primary">
                Shop The Catalogue <ArrowRight size={16} />
              </Link>
            </div>

            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)' }}>
              <img src="/images/product_keyboard.jpg" alt="Minimalist tech craftsmanship" style={{ width: '100%', height: '420px', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
