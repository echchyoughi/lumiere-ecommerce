/* =============================================
   CHECKOUT.JS — Checkout process logic
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  const items = Cart.getItems();

  // If cart is empty, redirect back to cart
  if (!items || items.length === 0) {
    showToast('Your cart is empty!', 'warning');
    setTimeout(() => {
      window.location.href = 'shop.html';
    }, 1500);
    return;
  }

  let selectedShipping = 'standard';
  const shippingCosts = {
    standard: 0,
    express: 12.99,
    overnight: 24.99
  };

  renderCheckoutSummary();
  bindShippingOptions();
  bindPaymentTabs();
  bindFormSubmit();

  function renderCheckoutSummary() {
    const itemsContainer = document.getElementById('checkout-items');
    if (!itemsContainer) return;

    itemsContainer.innerHTML = items.map(item => {
      let optStr = '';
      if (item.options?.color || item.options?.size) {
        optStr = `<span class="checkout-item-opts">${item.options.color || ''}${item.options.color && item.options.size ? ' / ' : ''}${item.options.size || ''}</span>`;
      }

      let imgHTML = item.image
        ? `<img src="${item.image}" alt="${item.name}" />`
        : `<div style="background:${item.cssGradient || '#333'};width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:1.2rem;">📦</div>`;

      return `
        <div class="checkout-item">
          <div class="checkout-item-img">
            ${imgHTML}
            <span class="checkout-item-qty">${item.qty}</span>
          </div>
          <div class="checkout-item-details">
            <h4 class="checkout-item-name">${item.name}</h4>
            ${optStr}
          </div>
          <div class="checkout-item-price">${formatPrice(item.price * item.qty)}</div>
        </div>
      `;
    }).join('');

    recalculateTotals();
  }

  function recalculateTotals() {
    const subtotal = Cart.getSubtotal();
    const coupon = Cart.getCoupon();
    let discount = 0;
    if (coupon) {
      discount = subtotal * coupon.discount;
    }

    const shipCost = shippingCosts[selectedShipping] || 0;
    const taxableSubtotal = Math.max(0, subtotal - discount);
    const tax = taxableSubtotal * 0.08;
    const total = taxableSubtotal + shipCost + tax;

    const subtotalEl = document.getElementById('co-subtotal');
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);

    const discountRow = document.getElementById('co-discount-row');
    const discountEl = document.getElementById('co-discount');
    if (discountRow && discountEl) {
      if (discount > 0) {
        discountRow.style.display = 'flex';
        discountEl.textContent = `-${formatPrice(discount)} (${coupon.code})`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    const shippingEl = document.getElementById('co-shipping');
    if (shippingEl) {
      shippingEl.textContent = shipCost === 0 ? 'FREE' : formatPrice(shipCost);
    }

    const taxEl = document.getElementById('co-tax');
    if (taxEl) taxEl.textContent = formatPrice(tax);

    const totalEl = document.getElementById('co-total');
    if (totalEl) totalEl.textContent = formatPrice(total);
  }

  function bindShippingOptions() {
    const shippingRadios = document.querySelectorAll('input[name="shipping"]');
    shippingRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        selectedShipping = e.target.value;
        document.querySelectorAll('.shipping-option').forEach(label => {
          label.classList.toggle('selected', label.contains(e.target));
        });
        recalculateTotals();
      });
    });
  }

  function bindPaymentTabs() {
    const payTabs = document.querySelectorAll('.pay-tab');
    const payPanels = document.querySelectorAll('.payment-panel');

    payTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetPay = tab.dataset.pay;
        payTabs.forEach(t => t.classList.toggle('active', t === tab));
        payPanels.forEach(panel => {
          panel.classList.toggle('hidden', panel.id !== `payment-${targetPay}`);
        });
      });
    });

    const applePayBtn = document.getElementById('apple-pay-btn');
    if (applePayBtn) {
      applePayBtn.addEventListener('click', () => {
        processOrder('Apple Pay');
      });
    }
  }

  function bindFormSubmit() {
    const placeOrderBtn = document.getElementById('place-order-btn');
    if (!placeOrderBtn) return;

    placeOrderBtn.addEventListener('click', (e) => {
      e.preventDefault();

      // Simple validation check
      const requiredInputs = [
        document.getElementById('email'),
        document.getElementById('phone'),
        document.getElementById('first-name'),
        document.getElementById('last-name'),
        document.getElementById('address'),
        document.getElementById('city'),
        document.getElementById('state'),
        document.getElementById('zip')
      ];

      let isValid = true;
      requiredInputs.forEach(input => {
        if (input && !input.value.trim()) {
          input.style.borderColor = '#ef4444';
          isValid = false;
        } else if (input) {
          input.style.borderColor = '';
        }
      });

      if (!isValid) {
        showToast('Please fill in all required shipping fields', 'warning');
        return;
      }

      // Active payment method
      const activeTab = document.querySelector('.pay-tab.active');
      const payMethod = activeTab ? activeTab.textContent.trim() : 'Credit Card';

      processOrder(payMethod);
    });
  }

  function processOrder(paymentMethod) {
    const firstName = document.getElementById('first-name')?.value.trim() || 'John';
    const lastName = document.getElementById('last-name')?.value.trim() || 'Doe';
    const email = document.getElementById('email')?.value.trim() || 'you@example.com';
    const phone = document.getElementById('phone')?.value.trim() || '+1 (555) 000-0000';
    const address = document.getElementById('address')?.value.trim() || '123 Main Street';
    const city = document.getElementById('city')?.value.trim() || 'New York';
    const state = document.getElementById('state')?.value.trim() || 'NY';
    const zip = document.getElementById('zip')?.value.trim() || '10001';
    const country = document.getElementById('country')?.value || 'United States';

    const subtotal = Cart.getSubtotal();
    const coupon = Cart.getCoupon();
    let discount = 0;
    if (coupon) discount = subtotal * coupon.discount;
    const shipCost = shippingCosts[selectedShipping] || 0;
    const tax = Math.max(0, subtotal - discount) * 0.08;
    const total = Math.max(0, subtotal - discount) + shipCost + tax;

    const orderNum = 'LMR-' + Math.floor(100000 + Math.random() * 900000);

    const orderData = {
      orderNumber: orderNum,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      items: Cart.getItems(),
      customer: {
        name: `${firstName} ${lastName}`,
        email,
        phone,
        address: `${address}, ${city}, ${state} ${zip}, ${country.toUpperCase()}`
      },
      shippingMethod: selectedShipping.toUpperCase() + ' Shipping',
      paymentMethod,
      pricing: {
        subtotal,
        discount,
        couponCode: coupon?.code || null,
        shipping: shipCost,
        tax,
        total
      }
    };

    localStorage.setItem('lumiere_last_order', JSON.stringify(orderData));

    // Clear cart and coupon
    Cart.clear();
    Cart.clearCoupon();

    showToast('✓ Order placed successfully!', 'success');
    setTimeout(() => {
      window.location.href = `confirmation.html?order=${orderNum}`;
    }, 1000);
  }
});
