import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Search, RefreshCw } from 'lucide-react';
import { api, Product } from '../services/api';
import { ProductCard } from '../components/ProductCard';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const categoryParam = searchParams.get('cat') || 'all';
  const searchQueryParam = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState(searchQueryParam);
  const [sortOption, setSortOption] = useState('featured');
  const [maxPrice, setMaxPrice] = useState(400);

  useEffect(() => {
    setSelectedCategory(searchParams.get('cat') || 'all');
    setSearchQuery(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchQueryParam, sortOption, maxPrice]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.getProducts({
        category: selectedCategory,
        search: searchQueryParam,
        maxPrice,
        sort: sortOption
      });
      if (res.success) {
        setProducts(res.products);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'all') newParams.delete('cat');
    else newParams.set('cat', cat);
    setSearchParams(newParams);
  };

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'accessories', label: 'Accessories' },
    { id: 'beauty', label: 'Beauty & Perfume' }
  ];

  return (
    <div className="container main-content">
      {/* HEADER */}
      <div style={{ marginBottom: '40px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '42px', fontWeight: 700, marginBottom: '8px' }}>
          Explore Our Collection
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          Browse premium headphones, luxury watches, leather messenger bags, polarized sunglasses, and designer fragrances.
        </p>
      </div>

      {/* FILTER BAR & TABS */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '32px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        {/* Category pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`btn ${selectedCategory === cat.id ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '8px 18px', fontSize: '13px', borderRadius: '30px' }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort & Price Filter controls */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Max Price: ${maxPrice}</span>
            <input
              type="range"
              min="50"
              max="400"
              step="10"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ accentColor: 'var(--color-primary)', cursor: 'pointer' }}
            />
          </div>

          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{
              padding: '8px 16px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              color: '#fff',
              fontSize: '13px',
              outline: 'none'
            }}
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* PRODUCT GRID */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-muted)' }}>
          <RefreshCw size={24} className="spin" style={{ marginBottom: '12px' }} />
          <div>Fetching Products from Server...</div>
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)' }}>
          <h3>No products match your criteria</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Try adjusting your filters or search term.</p>
          <button
            className="btn btn-primary"
            style={{ marginTop: '20px' }}
            onClick={() => {
              handleCategorySelect('all');
              setMaxPrice(400);
              setSearchParams(new URLSearchParams());
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '30px'
          }}
        >
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
