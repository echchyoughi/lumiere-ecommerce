import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Lock, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

export const CheckoutPage: React.FC = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const promoCode = (location.state as any)?.promoCode || '';

  // Form Fields
  const [shippingName, setShippingName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('United States');
  const [paymentMethod, setPaymentMethod] = useState('CREDIT_CARD');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const discount = promoCode === 'LUMIERE10' ? subtotal * 0.1 : promoCode === 'WELCOME20' ? subtotal * 0.2 : 0;
  const shippingFee = subtotal > 100 ? 0 : 15;
  const total = subtotal - discount + shippingFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingName || !shippingAddress || !city || !zipCode) {
      showToast('Please fill out all shipping fields', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.checkout({
        shippingName,
        shippingAddress,
        city,
        zipCode,
        country,
        paymentMethod,
        promoCode,
        items: cartItems.map(i => ({
          id: i.productId,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
          color: i.selectedColor,
          size: i.selectedSize,
          image: i.product.image || i.product.images[0]
        }))
      });

      if (res.success) {
        await clearCart();
        showToast('Order Placed Successfully!');
        navigate(`/confirmation/${res.order.orderNumber}`);
      }
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Error processing checkout', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container main-content" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>No items to checkout</h2>
        <button onClick={() => navigate('/shop')} className="btn btn-primary" style={{ marginTop: '20px' }}>
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="container main-content">
      <h1 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '32px' }}>Checkout</h1>

      <form onSubmit={handleSubmitOrder} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px', alignItems: 'flex-start' }}>
        {/* LEFT COLUMN: SHIPPING & PAYMENT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* SHIPPING ADDRESS */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>1. Shipping Address</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Full Name</label>
                <input
                  type="text"
                  value={shippingName}
                  onChange={(e) => setShippingName(e.target.value)}
                  placeholder="Alexander Wright"
                  required
                  style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Street Address</label>
                <input
                  type="text"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="742 Evergreen Terrace, Suite 4B"
                  required
                  style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="New York"
                    required
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Postal / ZIP Code</label>
                  <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="10001"
                    required
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Country</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  style={{ width: '100%', padding: '12px 14px', background: 'var(--bg-dark)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                >
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>
            </div>
          </div>

          {/* PAYMENT METHOD */}
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '28px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px' }}>2. Payment Options</h2>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <button
                type="button"
                className={`btn ${paymentMethod === 'CREDIT_CARD' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flexGrow: 1, padding: '12px', fontSize: '13px' }}
                onClick={() => setPaymentMethod('CREDIT_CARD')}
              >
                <CreditCard size={16} /> Credit Card
              </button>
              <button
                type="button"
                className={`btn ${paymentMethod === 'PAYPAL' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ flexGrow: 1, padding: '12px', fontSize: '13px' }}
                onClick={() => setPaymentMethod('PAYPAL')}
              >
                PayPal Express
              </button>
            </div>

            {paymentMethod === 'CREDIT_CARD' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4532 •••• •••• 8892"
                    required
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>Expiry Date</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      required
                      style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '13px', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>CVC Security Code</label>
                    <input
                      type="password"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="123"
                      required
                      style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', color: '#fff' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: ORDER REVIEW & PAY */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-focus)', borderRadius: 'var(--radius-md)', padding: '28px' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '20px' }}>Order Breakdown</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px', maxHeight: '300px', overflowY: 'auto' }}>
            {cartItems.map((item) => (
              <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <img src={item.product.image || item.product.images[0]} alt={item.product.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }} />
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontSize: '14px', fontWeight: 600 }}>{item.product.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Qty: {item.quantity}</div>
                </div>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>${(item.product.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '16px 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', marginBottom: '24px', fontSize: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                <span>Discount</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Shipping</span>
              <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '8px' }}>
              <span style={{ fontSize: '16px', fontWeight: 700 }}>Total Pay</span>
              <span style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text-gold)' }}>${total.toFixed(2)}</span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={submitting} style={{ width: '100%', padding: '16px' }}>
            <Lock size={16} /> {submitting ? 'Processing Payment...' : `Complete Order ($${total.toFixed(2)})`}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-muted)', marginTop: '16px' }}>
            <ShieldCheck size={16} color="#10b981" /> Encrypted via 256-Bit SSL Gateway
          </div>
        </div>
      </form>
    </div>
  );
};
