import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { Product } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const wishlisted = isWishlisted(product.id);

  const displayImage = product.image || (product.images && product.images[0]);

  return (
    <div className="product-card">
      <div className="product-img-wrapper">
        {displayImage ? (
          <img src={displayImage} alt={product.name} className="product-img" />
        ) : (
          <div
            style={{
              width: '100%',
              height: '100%',
              background: product.cssGradient || 'linear-gradient(135deg, #1f2833 0%, #0b0c10 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#c5a059',
              fontWeight: 700,
              fontSize: '18px',
              fontFamily: "'Playfair Display', serif"
            }}
          >
            {product.name}
          </div>
        )}

        {product.badge && (
          <span className={`product-badge badge-${product.badge}`}>
            {product.badge}
          </span>
        )}

        <button
          className={`wishlist-btn-card ${wishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart size={18} fill={wishlisted ? '#c5a059' : 'none'} color={wishlisted ? '#c5a059' : '#fff'} />
        </button>
      </div>

      <div className="product-info">
        <span className="product-cat">{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>

        <div className="product-rating">
          <Star size={14} fill="#f59e0b" color="#f59e0b" />
          <span>{product.rating.toFixed(1)}</span>
          <span style={{ color: 'var(--text-muted)' }}>({product.reviewsCount})</span>
        </div>

        <div className="product-bottom">
          <div className="product-price">
            <span className="price-current">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="price-original">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <button
            className="btn btn-outline"
            style={{ padding: '8px 14px', fontSize: '12px' }}
            onClick={() => addToCart(product)}
            title="Add to Cart"
          >
            <ShoppingBag size={14} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
