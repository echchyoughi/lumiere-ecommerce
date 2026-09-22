/* =============================================
   CART.JS — Cart & wishlist state management
   ============================================= */

const Cart = (() => {
  let items = JSON.parse(localStorage.getItem('lumiere_cart') || '[]');
  let wishlist = JSON.parse(localStorage.getItem('lumiere_wishlist') || '[]');

  function save() {
    localStorage.setItem('lumiere_cart', JSON.stringify(items));
    updateBadges();
  }

  function saveWishlist() {
    localStorage.setItem('lumiere_wishlist', JSON.stringify(wishlist));
    updateBadges();
  }

  function updateBadges() {
    const cartCount = items.reduce((sum, i) => sum + i.qty, 0);
    const wishlistCount = wishlist.length;

    document.querySelectorAll('#cart-badge').forEach(el => {
      el.textContent = cartCount;
      el.classList.toggle('hidden', cartCount === 0);
      if (cartCount > 0) el.classList.add('bounce');
      setTimeout(() => el.classList.remove('bounce'), 300);
    });

    document.querySelectorAll('#wishlist-badge').forEach(el => {
      el.textContent = wishlistCount;
      el.classList.toggle('hidden', wishlistCount === 0);
    });
  }

  function addItem(product, qty = 1, options = {}) {
    const key = `${product.id}_${options.color || ''}_${options.size || ''}`;
    const existing = items.find(i => i.key === key);
    if (existing) {
      existing.qty = Math.min(existing.qty + qty, 99);
    } else {
      items.push({
        key,
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        cssGradient: product.cssGradient,
        qty,
        options,
        category: product.category,
      });
    }
    save();
  }

  function removeItem(key) {
    items = items.filter(i => i.key !== key);
    save();
  }

  function updateQty(key, qty) {
    const item = items.find(i => i.key === key);
    if (item) {
      if (qty <= 0) {
        removeItem(key);
      } else {
        item.qty = Math.min(qty, 99);
        save();
      }
    }
  }

  function getItems() { return [...items]; }
  function getCount() { return items.reduce((s, i) => s + i.qty, 0); }

  function getSubtotal() {
    return items.reduce((s, i) => s + i.price * i.qty, 0);
  }

  function clear() {
    items = [];
    save();
  }

  // Wishlist
  function toggleWishlist(productId) {
    const idx = wishlist.indexOf(productId);
    if (idx >= 0) {
      wishlist.splice(idx, 1);
    } else {
      wishlist.push(productId);
    }
    saveWishlist();
    return wishlist.includes(productId);
  }

  function isWishlisted(productId) { return wishlist.includes(productId); }
  function getWishlist() { return [...wishlist]; }

  // Coupon
  const COUPONS = {
    'LUMIERE40': 0.4,
    'SAVE20': 0.2,
    'WELCOME10': 0.1,
  };

  function applyCoupon(code) {
    const discount = COUPONS[code.toUpperCase()];
    if (discount) {
      localStorage.setItem('lumiere_coupon', JSON.stringify({ code: code.toUpperCase(), discount }));
      return { valid: true, discount };
    }
    return { valid: false };
  }

  function getCoupon() {
    return JSON.parse(localStorage.getItem('lumiere_coupon') || 'null');
  }

  function clearCoupon() {
    localStorage.removeItem('lumiere_coupon');
  }

  // Init
  updateBadges();

  return {
    addItem, removeItem, updateQty, getItems, getCount, getSubtotal, clear,
    toggleWishlist, isWishlisted, getWishlist,
    applyCoupon, getCoupon, clearCoupon,
    updateBadges,
  };
})();
