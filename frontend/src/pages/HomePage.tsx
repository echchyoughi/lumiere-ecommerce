import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { api, Product } from '../services/api';
import { ProductCard } from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProducts().then((res) => {
      if (res.success) {
        setFeaturedProducts(res.products);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {/* HERO BANNER */}
      <section
        style={{
          position: 'relative',
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(180deg, rgba(11,12,16,0.3) 0%, rgba(11,12,16,1) 100%), url("/images/hero_banner.jpg") center/cover no-repeat',
          borderBottom: '1px solid var(--border-color)',
          marginTop: '-110px',
          paddingTop: '160px',
          paddingBottom: '80px'
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '640px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                background: 'rgba(197,160,89,0.15)',
                border: '1px solid rgba(197,160,89,0.4)',
                borderRadius: '30px',
                color: 'var(--color-primary)',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '1px',
                marginBottom: '20px'
              }}
            >
              <Sparkles size={14} /> NEW COLLECTION 2026
            </div>

            <h1
              style={{
                fontSize: 'clamp(42px, 6vw, 68px)',
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: '20px'
              }}
            >
              Live. Style.<br />
              <em style={{ color: 'var(--color-primary)', fontStyle: 'italic' }}>Elevate.</em>
            </h1>

            <p style={{ fontSize: '18px', color: 'var(--text-muted)', marginBottom: '32px' }}>
              Curated premium essentials for the modern lifestyle. Free express shipping on orders over $100.
            </p>

            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/shop" className="btn btn-primary">
                Shop Collection <ArrowRight size={16} />
              </Link>
              <Link to="/shop?cat=new" className="btn btn-outline">
                New Arrivals
              </Link>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '32px',
                marginTop: '48px',
                paddingTop: '32px',
                borderTop: '1px solid var(--border-color)'
              }}
            >
              <div>
                <span style={{ display: 'block', fontSize: '24px', fontWeight: 700, color: 'var(--color-primary)' }}>10K+</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Curated Items</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '24px', fontWeight: 700, color: 'var(--color-primary)' }}>50K+</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Happy Clients</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '24px', fontWeight: 700, color: 'var(--color-primary)' }}>4.9★</span>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <span style={{ color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '12px', fontWeight: 600 }}>
                Selected Arrivals
              </span>
              <h2 style={{ fontSize: '36px', fontWeight: 700, marginTop: '4px' }}>Featured Products</h2>
            </div>

            <Link to="/shop" style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              View All <ArrowRight size={16} />
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-muted)' }}>Loading products...</div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '30px'
              }}
            >
              {featuredProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
