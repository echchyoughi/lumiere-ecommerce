/* =============================================
   HOME.JS — Homepage logic
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  renderNewArrivals();
  bindNewsletter();
  setTimeout(observeAnimations, 100);
});

function renderFeatured() {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  const featured = PRODUCTS.filter(p => [1, 2, 3, 4].includes(p.id));
  grid.innerHTML = featured.map(buildProductCard).join('');
  bindCardEvents(grid);
}

function renderNewArrivals() {
  const grid = document.getElementById('new-arrivals-grid');
  if (!grid) return;
  const newProducts = PRODUCTS.filter(p => p.isNew || p.badge === 'new').slice(0, 4);
  const fallback = PRODUCTS.filter(p => !newProducts.includes(p)).slice(0, 4 - newProducts.length);
  const display = [...newProducts, ...fallback].slice(0, 4);
  grid.innerHTML = display.map(buildProductCard).join('');
  bindCardEvents(grid);
}

function bindNewsletter() {
  const form = document.getElementById('newsletter-form');
  const success = document.getElementById('newsletter-success');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    if (!email) return;
    form.style.display = 'none';
    if (success) success.style.display = 'block';
    showToast('🎉 Successfully subscribed!', 'success');
  });
}
