import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

export const CartPage: React.FC = () => {
  const { cartItems, subtotal, updateQuantity, removeFromCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState('');
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoCode.trim()) return;

    try {
      const res = await api.validatePromo(promoCode.trim());
      if (res.success) {
        setDiscountAmount(subtotal * res.discountDecimal);
        setAppliedPromo(res.code);
        setPromoError('');
        showToast(`Promo code "${res.code}" applied! (${res.discountPercentage}% OFF)`);
      }
    } catch (err: any) {
      setPromoError(err.response?.data?.message || 'Invalid promo code');
    }
  };

  const shippingFee = subtotal > 100 ? 0 : 15;
  const total = subtotal - discountAmount + shippingFee;

  if (cartItems.length === 0) {
    return (
      <div className="container main-content" style={{ textAlign: 'center', padding: '100px 0' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(197,160,89,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--color-primary)' }}>
          <ShoppingBag size={36} />
        </div>
        <h2 style={{ fontSize: '32px', fontWeight: 700, marginBottom: '12px' }}>Your Shopping Bag is Empty</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Explore our collection and add your favorite luxury items.</p>
        <Link to="/shop" className="btn btn-primary">
          Explore Products <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  return (
    <div className="container main-content">
      <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '32px' }}>Shopping Bag ({cartItems.length} items)</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px', alignItems: 'flex-start' }}>
        {/* ITEMS LIST */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {cartItems.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '20px',
                display: 'flex',
                gap: '20px',
                alignItems: 'center'
              }}
            >
              <img
                src={item.product.image || item.product.images[0]}
                alt={item.product.name}
                style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
              />

              <div style={{ flexGrow: 1 }}>
                <Link to={`/product/${item.productId}`} style={{ fontWeight: 600, fontSize: '18px', color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  {item.product.name}
                </Link>

                <div style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'flex', gap: '16px', marginBottom: '12px' }}>
                  {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                  {item.selectedSize && <span>Size: US {item.selectedSize}</span>}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)' }}>
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ padding: '6px 12px', color: '#fff' }}>-</button>
                    <span style={{ padding: '0 12px', fontWeight: 600, fontSize: '14px' }}>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ padding: '6px 12px', color: '#fff' }}>+</button>
                  </div>

                  <span style={{ fontWeight: 700, fontSize: '18px', color: 'var(--text-gold)' }}>
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              <button onClick={() => removeFromCart(item.id)} style={{ color: 'var(--text-muted)', padding: '8px' }} title="Remove Item">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-focus)', borderRadius: 'var(--radius-md)', padding: '28px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px' }}>Order Summary</h2>

          {/* Promo code form */}
          <form onSubmit={handleApplyPromo} style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
              Have a Promo Code? (Try: <code style={{ color: 'var(--color-primary)' }}>LUMIERE10</code> or <code style={{ color: 'var(--color-primary)' }}>WELCOME20</code>)
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter code"
                style={{
                  flexGrow: 1,
                  padding: '10px 14px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  color: '#fff',
                  textTransform: 'uppercase'
                }}
              />
              <button type="submit" className="btn btn-outline" style={{ padding: '10px 16px', fontSize: '13px' }}>
                <Tag size={14} /> Apply
              </button>
            </div>
            {appliedPromo && <div style={{ color: '#10b981', fontSize: '13px', marginTop: '6px' }}>Promo "{appliedPromo}" Applied!</div>}
            {promoError && <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>{promoError}</div>}
          </form>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingBottom: '20px', borderBottom: '1px solid var(--border-color)', marginBottom: '20px', fontSize: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                <span>Discount</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Express Shipping</span>
              <span>{shippingFee === 0 ? <strong style={{ color: '#10b981' }}>FREE</strong> : `$${shippingFee.toFixed(2)}`}</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '28px' }}>
            <span style={{ fontSize: '18px', fontWeight: 600 }}>Total</span>
            <span style={{ fontSize: '28px', fontWeight: 700, color: 'var(--text-gold)' }}>${total.toFixed(2)}</span>
          </div>

          <button
            className="btn btn-primary"
            style={{ width: '100%', padding: '16px' }}
            onClick={() => navigate('/checkout', { state: { promoCode: appliedPromo } })}
          >
            Proceed to Checkout <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
