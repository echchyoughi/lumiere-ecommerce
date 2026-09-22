/* =============================================
   WISHLIST.JS — Wishlist page logic
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  renderWishlist();
});

function renderWishlist() {
  const wishlistIds = Cart.getWishlist();
  const grid = document.getElementById('wishlist-grid');
  const emptyView = document.getElementById('empty-wishlist');

  if (!grid || !emptyView) return;

  if (wishlistIds.length === 0) {
    grid.style.display = 'none';
    emptyView.style.display = 'block';
    return;
  }

  emptyView.style.display = 'none';
  grid.style.display = 'grid';

  const products = wishlistIds
    .map(id => getProductById(id))
    .filter(Boolean);

  grid.innerHTML = products.map(p => buildProductCard(p)).join('');

  bindCardEvents(grid);
  if (typeof observeAnimations === 'function') {
    observeAnimations();
  }
}
