/* =============================================
   CART-PAGE.JS — Cart page rendering & interactions
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  bindCoupon();
});

function renderCart() {
  const items = Cart.getItems();
  const cartLayout = document.getElementById('cart-layout');
  const emptyCart = document.getElementById('empty-cart');
  const itemsList = document.getElementById('cart-items-list');

  if (items.length === 0) {
    cartLayout?.style.setProperty('display', 'none');
    emptyCart?.style.setProperty('display', 'block');
    return;
  }

  cartLayout?.style.setProperty('display', 'grid');
  emptyCart?.style.setProperty('display', 'none');

  itemsList.innerHTML = items.map(renderCartItem).join('');
  bindItemEvents(itemsList);
  updateSummary();
}

function renderCartItem(item) {
  let imgHTML;
  if (item.image) {
    imgHTML = `<img class="cart-item-img" src="${item.image}" alt="${item.name}" />`;
  } else {
    imgHTML = `<div class="cart-item-img" style="background:${item.cssGradient || '#1e1e2c'};display:flex;align-items:center;justify-content:center;font-size:1.8rem;">
      ${getCategoryIcon(item.category)}
    </div>`;
  }

  const optStr = Object.entries(item.options || {}).filter(([k,v])=>v).map(([k,v])=>`${k}: ${v}`).join(', ');

  return `
    <div class="cart-item" data-key="${item.key}">
      <div class="cart-item-product">
        ${imgHTML}
        <div class="cart-item-info">
          <span class="cart-item-name" onclick="window.location='product.html?id=${item.id}'">${item.name}</span>
          ${optStr ? `<span class="cart-item-meta">${optStr}</span>` : ''}
          <button class="cart-item-remove" data-key="${item.key}">Remove</button>
        </div>
      </div>
      <div class="cart-item-price">${formatPrice(item.price)}</div>
      <div class="cart-qty-control">
        <button class="cart-qty-btn qty-down" data-key="${item.key}">−</button>
        <span class="cart-qty-num">${item.qty}</span>
        <button class="cart-qty-btn qty-up" data-key="${item.key}">+</button>
      </div>
      <div class="cart-item-total">${formatPrice(item.price * item.qty)}</div>
    </div>
  `;
}

function bindItemEvents(container) {
  container.addEventListener('click', e => {
    const key = e.target.dataset.key;

    if (e.target.classList.contains('cart-item-remove') || e.target.closest('.cart-item-remove')) {
      const k = e.target.dataset.key || e.target.closest('.cart-item-remove').dataset.key;
      Cart.removeItem(k);
      showToast('Item removed from cart', 'info');
      renderCart();
      return;
    }

    if (e.target.classList.contains('qty-up')) {
      const items = Cart.getItems();
      const item = items.find(i => i.key === key);
      if (item) { Cart.updateQty(key, item.qty + 1); renderCart(); }
      return;
    }

    if (e.target.classList.contains('qty-down')) {
      const items = Cart.getItems();
      const item = items.find(i => i.key === key);
      if (item) { Cart.updateQty(key, item.qty - 1); renderCart(); }
      return;
    }
  });
}

function updateSummary() {
  const items = Cart.getItems();
  const subtotal = Cart.getSubtotal();
  const coupon = Cart.getCoupon();

  const shipping = subtotal >= 100 ? 0 : 9.99;
  const discountAmt = coupon ? subtotal * coupon.discount : 0;
  const tax = (subtotal - discountAmt) * 0.08;
  const total = subtotal - discountAmt + shipping + tax;

  document.getElementById('cart-count-label').textContent = items.reduce((s,i)=>s+i.qty, 0);
  document.getElementById('summary-subtotal').textContent = formatPrice(subtotal);
  document.getElementById('summary-shipping').textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
  document.getElementById('summary-tax').textContent = formatPrice(tax);
  document.getElementById('summary-grand-total').textContent = formatPrice(total);

  const discRow = document.getElementById('discount-row');
  if (coupon && discountAmt > 0) {
    discRow.style.display = 'flex';
    document.getElementById('discount-code-label').textContent = coupon.code;
    document.getElementById('summary-discount').textContent = `-${formatPrice(discountAmt)}`;
  } else {
    discRow.style.display = 'none';
  }
}

function bindCoupon() {
  const input = document.getElementById('coupon-input');
  const btn = document.getElementById('apply-coupon');
  const msg = document.getElementById('coupon-msg');

  // Pre-fill if coupon already applied
  const existing = Cart.getCoupon();
  if (existing && input) {
    input.value = existing.code;
    if (msg) { msg.textContent = `✓ ${Math.round(existing.discount * 100)}% discount applied!`; msg.style.color = 'var(--success)'; }
  }

  btn?.addEventListener('click', () => {
    const code = input?.value.trim();
    if (!code) return;
    const result = Cart.applyCoupon(code);
    if (result.valid) {
      msg.textContent = `✓ ${Math.round(result.discount * 100)}% discount applied!`;
      msg.style.color = 'var(--success)';
      updateSummary();
      showToast(`🎉 Coupon applied! ${Math.round(result.discount * 100)}% off`, 'success');
    } else {
      msg.textContent = '✗ Invalid coupon code. Try LUMIERE40';
      msg.style.color = 'var(--error)';
    }
  });

  input?.addEventListener('keydown', e => { if (e.key === 'Enter') btn?.click(); });
}
