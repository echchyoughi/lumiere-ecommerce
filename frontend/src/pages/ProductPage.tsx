import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, Check, Send } from 'lucide-react';
import { api, Product, Review } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

export const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // User selections
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');

  // New Review form state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.getProductById(Number(id)).then((res) => {
        if (res.success) {
          setProduct(res.product);
          if (res.product.colorNames && res.product.colorNames.length > 0) {
            setSelectedColor(res.product.colorNames[0]);
          }
          if (res.product.sizes && res.product.sizes.length > 0) {
            setSelectedSize(res.product.sizes[0]);
          }
        }
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container main-content" style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-muted)' }}>
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container main-content" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>Product Not Found</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Back to Shop
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const displayImage = product.image || (product.images && product.images[0]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerName || !reviewText) return;

    setSubmittingReview(true);
    try {
      const res = await api.addReview(product.id, {
        name: reviewerName,
        rating: reviewRating,
        text: reviewText
      });

      if (res.success) {
        showToast('Thank you! Your review has been published.');
        setReviewerName('');
        setReviewText('');
        // Refresh product payload
        const updated = await api.getProductById(product.id);
        if (updated.success) setProduct(updated.product);
      }
    } catch (err) {
      showToast('Could not submit review', 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="container main-content">
      {/* BREADCRUMB */}
      <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
        <Link to="/" style={{ color: 'var(--text-muted)' }}>Home</Link> /{' '}
        <Link to={`/shop?cat=${product.category}`} style={{ color: 'var(--text-muted)', textTransform: 'capitalize' }}>
          {product.category}
        </Link> /{' '}
        <span style={{ color: 'var(--text-main)' }}>{product.name}</span>
      </div>

      {/* PRODUCT TOP SECTION */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px', marginBottom: '60px' }}>
        {/* IMAGE GALLERY */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {displayImage ? (
            <img src={displayImage} alt={product.name} style={{ width: '100%', maxHeight: '450px', objectFit: 'contain' }} />
          ) : (
            <div
              style={{
                width: '100%',
                height: '350px',
                background: product.cssGradient || 'linear-gradient(135deg, #1f2833 0%, #0b0c10 100%)',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#c5a059',
                fontFamily: "'Playfair Display', serif",
                fontSize: '24px'
              }}
            >
              {product.name}
            </div>
          )}
        </div>

        {/* DETAILS & OPTIONS */}
        <div>
          <span style={{ color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '1.5px', fontSize: '12px', fontWeight: 600 }}>
            {product.category}
          </span>
          <h1 style={{ fontSize: '36px', fontWeight: 700, margin: '8px 0 16px', lineHeight: 1.2 }}>{product.name}</h1>

          {/* RATING */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', color: '#f59e0b' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'} color="#f59e0b" />
              ))}
            </div>
            <span style={{ fontWeight: 600, fontSize: '14px' }}>{product.rating.toFixed(1)}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>({product.reviewsCount} customer reviews)</span>
          </div>

          {/* PRICE */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px' }}>
            <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-gold)' }}>${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span style={{ fontSize: '18px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.badge && (
              <span className={`product-badge badge-${product.badge}`} style={{ position: 'static' }}>
                {product.badge}
              </span>
            )}
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '15px', marginBottom: '28px', lineHeight: 1.6 }}>
            {product.fullDescription || product.description}
          </p>

          {/* COLOR SELECTOR */}
          {product.colorNames && product.colorNames.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                Color: <span style={{ color: 'var(--color-primary)' }}>{selectedColor}</span>
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                {product.colorNames.map((colorName, idx) => {
                  const hex = product.colors[idx] || '#333';
                  const isSelected = selectedColor === colorName;
                  return (
                    <button
                      key={colorName}
                      onClick={() => setSelectedColor(colorName)}
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: hex,
                        border: isSelected ? '2px solid var(--color-primary)' : '1px solid rgba(255,255,255,0.2)',
                        boxShadow: isSelected ? '0 0 0 3px rgba(197,160,89,0.3)' : 'none',
                        cursor: 'pointer'
                      }}
                      title={colorName}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {/* SIZE SELECTOR */}
          {product.sizes && product.sizes.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                Select Size: <span style={{ color: 'var(--color-primary)' }}>{selectedSize}</span>
              </label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`btn ${selectedSize === sz ? 'btn-primary' : 'btn-secondary'}`}
                    style={{ padding: '8px 16px', fontSize: '13px' }}
                  >
                    US {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* QUANTITY & ACTIONS */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ padding: '12px 18px', color: '#fff', fontSize: '18px' }}
              >
                -
              </button>
              <span style={{ padding: '0 16px', fontWeight: 600 }}>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{ padding: '12px 18px', color: '#fff', fontSize: '18px' }}
              >
                +
              </button>
            </div>

            <button
              className="btn btn-primary"
              style={{ flexGrow: 1, padding: '16px 28px' }}
              onClick={() => addToCart(product, quantity, selectedColor, selectedSize)}
            >
              <ShoppingBag size={18} /> Add To Shopping Bag
            </button>

            <button
              className={`icon-btn ${wishlisted ? 'active' : ''}`}
              style={{ width: '52px', height: '52px' }}
              onClick={() => toggleWishlist(product.id)}
              title={wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
            >
              <Heart size={20} fill={wishlisted ? '#06b6d4' : 'none'} color={wishlisted ? '#06b6d4' : '#fff'} />
            </button>
          </div>

          <div style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
              <Truck size={18} color="var(--color-primary)" />
              <span>Complimentary Express Delivery & 30-Day Returns</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
              <ShieldCheck size={18} color="var(--color-primary)" />
              <span>2-Year Manufacturer Guarantee & Authenticity Warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* SPECS & REVIEWS TABS */}
      <div style={{ marginBottom: '60px' }}>
        <div style={{ display: 'flex', gap: '24px', borderBottom: '1px solid var(--border-color)', marginBottom: '32px' }}>
          <button
            onClick={() => setActiveTab('specs')}
            style={{
              padding: '12px 0',
              fontSize: '16px',
              fontWeight: 600,
              color: activeTab === 'specs' ? 'var(--color-primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'specs' ? '2px solid var(--color-primary)' : 'none'
            }}
          >
            Technical Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            style={{
              padding: '12px 0',
              fontSize: '16px',
              fontWeight: 600,
              color: activeTab === 'reviews' ? 'var(--color-primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'reviews' ? '2px solid var(--color-primary)' : 'none'
            }}
          >
            Customer Reviews ({product.reviewList?.length || 0})
          </button>
        </div>

        {activeTab === 'specs' && (
          <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {product.specs && product.specs.length > 0 ? (
                  product.specs.map(([key, val], idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '14px 0', color: 'var(--text-muted)', fontWeight: 500, width: '35%' }}>{key}</td>
                      <td style={{ padding: '14px 0', color: 'var(--text-main)', fontWeight: 600 }}>{val}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} style={{ padding: '20px 0', color: 'var(--text-muted)' }}>No technical specifications available for this product.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            {/* REVIEW LIST */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px' }}>
              {product.reviewList && product.reviewList.length > 0 ? (
                product.reviewList.map((rev) => (
                  <div
                    key={rev.id}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '20px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: rev.avatar || '#7c3aed',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            color: '#fff',
                            fontSize: '14px'
                          }}
                        >
                          {rev.name.charAt(0)}
                        </div>
                        <div>
                          <strong style={{ display: 'block' }}>{rev.name}</strong>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{rev.date}</span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', color: '#f59e0b' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < rev.rating ? '#f59e0b' : 'none'} color="#f59e0b" />
                        ))}
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.5 }}>{rev.text}</p>
                  </div>
                ))
              ) : (
                <div style={{ padding: '20px', color: 'var(--text-muted)' }}>No reviews yet. Be the first to review!</div>
              )}
            </div>

            {/* WRITE REVIEW FORM */}
            <div style={{ background: 'var(--bg-card)', padding: '28px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px' }}>Write a Customer Review</h3>
              <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Your Name</label>
                  <input
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    placeholder="Jane Doe"
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#fff'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Rating</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'var(--bg-dark)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#fff'
                    }}
                  >
                    <option value={5}>5 Stars - Outstanding</option>
                    <option value={4}>4 Stars - Very Good</option>
                    <option value={3}>3 Stars - Average</option>
                    <option value={2}>2 Stars - Needs Improvement</option>
                    <option value={1}>1 Star - Poor</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Your Feedback</label>
                  <textarea
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Share details regarding build quality, sound, fit, or performance..."
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      color: '#fff',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={submittingReview} style={{ alignSelf: 'flex-start' }}>
                  <Send size={16} /> {submittingReview ? 'Publishing...' : 'Submit Review'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
