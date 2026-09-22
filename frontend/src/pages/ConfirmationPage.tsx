import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, Truck, ArrowRight } from 'lucide-react';
import { api, Order } from '../services/api';

export const ConfirmationPage: React.FC = () => {
  const { orderNumber } = useParams<{ orderNumber: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderNumber) {
      api.getOrder(orderNumber).then((res) => {
        if (res.success) {
          setOrder(res.order);
        }
        setLoading(false);
      });
    }
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="container main-content" style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-muted)' }}>
        Retrieving your order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container main-content" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>Order Not Found</h2>
        <Link to="/shop" className="btn btn-primary" style={{ marginTop: '20px' }}>
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container main-content">
      <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16,185,129,0.15)', color: '#10b981', marginBottom: '24px' }}>
          <CheckCircle2 size={48} />
        </div>

        <h1 style={{ fontSize: '38px', fontWeight: 700, marginBottom: '12px' }}>Thank You For Your Order!</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '16px', marginBottom: '32px' }}>
          Your order number is <strong style={{ color: 'var(--color-primary)' }}>#{order.orderNumber}</strong>. We've sent a confirmation email to your inbox.
        </p>

        {/* ORDER PROGRESS TIMELINE */}
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '24px',
            marginBottom: '40px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontWeight: 700 }}>
              1
            </div>
            <span style={{ fontSize: '13px', fontWeight: 600 }}>Order Confirmed</span>
          </div>

          <div style={{ height: '2px', flexGrow: 1, background: 'var(--border-color)', margin: '0 12px' }} />

          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontWeight: 700 }}>
              <Package size={20} />
            </div>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Packaging</span>
          </div>

          <div style={{ height: '2px', flexGrow: 1, background: 'var(--border-color)', margin: '0 12px' }} />

          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontWeight: 700 }}>
              <Truck size={20} />
            </div>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Out for Delivery</span>
          </div>
        </div>

        {/* ORDER DETAILS PAYLOAD */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '28px', textAlign: 'left', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
            Order Items
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            {order.items.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '15px' }}>{item.name}</strong>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Quantity: {item.quantity}</span>
                </div>
                <span style={{ fontWeight: 700, color: 'var(--text-gold)' }}>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-muted)' }}>Shipping Destination</span>
              <span>{order.shippingAddress}, {order.city}, {order.country}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '18px', marginTop: '12px' }}>
              <span>Total Paid</span>
              <span style={{ color: 'var(--text-gold)' }}>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <Link to="/shop" className="btn btn-primary">
          Continue Shopping <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
