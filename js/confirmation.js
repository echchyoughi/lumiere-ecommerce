/* =============================================
   CONFIRMATION.JS — Order confirmation page logic
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  const lastOrderStr = localStorage.getItem('lumiere_last_order');
  let orderData = null;

  if (lastOrderStr) {
    try {
      orderData = JSON.parse(lastOrderStr);
    } catch (e) {
      console.error('Failed to parse order data', e);
    }
  }

  // Fallback demo order if visited directly
  if (!orderData) {
    orderData = {
      orderNumber: '#LMR-849201',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      items: [
        {
          id: 1,
          name: "AeroPro Wireless Headphones",
          price: 189.99,
          qty: 1,
          image: "images/product_headphones.jpg",
          options: { color: "Matte Black" }
        }
      ],
      customer: {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 000-0000",
        address: "123 Main Street, Apt 4B, New York, NY 10001, US"
      },
      shippingMethod: "STANDARD Shipping",
      paymentMethod: "Credit Card (**** 3456)",
      pricing: {
        subtotal: 189.99,
        discount: 0,
        shipping: 0,
        tax: 15.20,
        total: 205.19
      }
    };
  }

  // Set Order Number
  const orderNumEl = document.getElementById('order-number');
  if (orderNumEl) orderNumEl.textContent = orderData.orderNumber.startsWith('#') ? orderData.orderNumber : `#${orderData.orderNumber}`;

  // Render Items
  const itemsContainer = document.getElementById('confirmed-items');
  if (itemsContainer && orderData.items) {
    itemsContainer.innerHTML = orderData.items.map(item => {
      const imgHTML = item.image
        ? `<img src="${item.image}" alt="${item.name}" style="width:50px;height:50px;object-fit:cover;border-radius:8px;" />`
        : `<div style="width:50px;height:50px;border-radius:8px;background:${item.cssGradient || '#333'};display:flex;align-items:center;justify-content:center;font-size:1.2rem;">📦</div>`;

      let opts = '';
      if (item.options?.color || item.options?.size) {
        opts = `<div style="font-size:0.85rem;color:var(--text-muted);">${item.options.color || ''}${item.options.color && item.options.size ? ' / ' : ''}${item.options.size || ''}</div>`;
      }

      return `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:0.75rem 0;border-bottom:1px solid var(--border-color);">
          <div style="display:flex;align-items:center;gap:1rem;">
            ${imgHTML}
            <div>
              <div style="font-weight:600;font-size:0.95rem;">${item.name}</div>
              ${opts}
              <div style="font-size:0.85rem;color:var(--text-muted);">Qty: ${item.qty}</div>
            </div>
          </div>
          <div style="font-weight:600;">${formatPrice(item.price * item.qty)}</div>
        </div>
      `;
    }).join('');
  }

  // Render Address
  const addressEl = document.getElementById('confirmed-address');
  if (addressEl && orderData.customer) {
    addressEl.innerHTML = `
      <p style="font-weight:600;margin-bottom:4px;">${orderData.customer.name}</p>
      <p style="color:var(--text-muted);margin-bottom:4px;">${orderData.customer.address}</p>
      <p style="color:var(--text-muted);font-size:0.85rem;">Email: ${orderData.customer.email} | Phone: ${orderData.customer.phone}</p>
      <p style="color:var(--accent-light);font-size:0.85rem;margin-top:4px;">Method: ${orderData.shippingMethod}</p>
    `;
  }

  // Render Payment
  const paymentEl = document.getElementById('confirmed-payment');
  if (paymentEl) {
    paymentEl.innerHTML = `
      <p style="font-weight:500;">Method: ${orderData.paymentMethod}</p>
      <p style="color:var(--text-muted);font-size:0.85rem;">Status: <span style="color:#34d399;font-weight:600;">✓ Paid</span></p>
    `;
  }

  // Render Totals
  const totalEl = document.getElementById('confirmed-total');
  if (totalEl && orderData.pricing) {
    const p = orderData.pricing;
    totalEl.innerHTML = `
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;color:var(--text-muted);">
        <span>Subtotal</span>
        <span>${formatPrice(p.subtotal)}</span>
      </div>
      ${p.discount > 0 ? `
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;color:#a78bfa;">
        <span>Discount</span>
        <span>-${formatPrice(p.discount)}</span>
      </div>` : ''}
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;color:var(--text-muted);">
        <span>Shipping</span>
        <span>${p.shipping === 0 ? 'FREE' : formatPrice(p.shipping)}</span>
      </div>
      <div style="display:flex;justify-content:space-between;margin-bottom:12px;color:var(--text-muted);">
        <span>Tax (8%)</span>
        <span>${formatPrice(p.tax)}</span>
      </div>
      <div style="display:flex;justify-content:space-between;font-size:1.2rem;font-weight:700;color:var(--text-primary);padding-top:12px;border-top:1px solid var(--border-color);">
        <span>Total Paid</span>
        <span style="color:var(--accent-light);">${formatPrice(p.total)}</span>
      </div>
    `;
  }
});
