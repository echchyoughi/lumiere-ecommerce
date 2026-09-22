/* =============================================
   APP.JS — Shared utilities & nav behavior
   ============================================= */

// ---- Toast ----
function showToast(message, type = 'info', duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.classList.remove('show'); }, duration);
}

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
if (navbar && !navbar.classList.contains('scrolled')) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// ---- Search toggle ----
const searchToggle = document.getElementById('search-toggle');
const searchBar = document.getElementById('search-bar');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

if (searchToggle && searchBar) {
  searchToggle.addEventListener('click', () => {
    searchBar.classList.toggle('visible');
    if (searchBar.classList.contains('visible')) searchInput?.focus();
  });
}

if (searchBtn && searchInput) {
  searchBtn.addEventListener('click', doSearch);
  searchInput.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
}

function doSearch() {
  const q = searchInput?.value.trim();
  if (q) window.location.href = `shop.html?q=${encodeURIComponent(q)}`;
}

// ---- Hamburger ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
    }
  });
}

// ---- Intersection Observer for card animations ----
function observeAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.product-card, .cat-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}

// ---- Build product card HTML ----
function buildProductCard(product) {
  const discount = getDiscount(product.price, product.originalPrice);
  const wishlisted = Cart.isWishlisted(product.id);

  let imgHTML;
  if (product.image) {
    imgHTML = `<img class="card-img" src="${product.image}" alt="${product.name}" loading="lazy" />`;
  } else {
    imgHTML = `<div class="card-img" style="background:${product.cssGradient || '#1e1e2c'};display:flex;align-items:center;justify-content:center;height:100%;width:100%;font-size:3rem;">${getCategoryIcon(product.category)}</div>`;
  }

  const badges = [];
  if (product.badge === 'sale') badges.push('<span class="card-badge badge-sale">Sale</span>');
  if (product.badge === 'new' || product.isNew) badges.push('<span class="card-badge badge-new">New</span>');
  if (product.badge === 'hot') badges.push('<span class="card-badge badge-hot">Hot</span>');

  return `
    <div class="product-card" data-id="${product.id}">
      <div class="card-image-wrap">
        ${imgHTML}
        <div class="card-badge-wrap">${badges.join('')}</div>
        <div class="card-actions">
          <button class="card-action-btn wishlist-action ${wishlisted ? 'active' : ''}" data-id="${product.id}" title="Wishlist" aria-label="Toggle wishlist">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="${wishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
          <a href="product.html?id=${product.id}" class="card-action-btn" title="Quick view" aria-label="View product">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </a>
        </div>
      </div>
      <div class="card-body">
        <p class="card-category">${product.category}</p>
        <h3 class="card-name"><a href="product.html?id=${product.id}">${product.name}</a></h3>
        <div class="card-rating">
          <span class="card-stars">${'★'.repeat(Math.floor(product.rating))}${product.rating % 1 >= 0.5 ? '½' : ''}</span>
          <span class="card-rating-num">${product.rating} (${product.reviews.toLocaleString()})</span>
        </div>
        <div class="card-price-row">
          <span class="card-price">${formatPrice(product.price)}</span>
          ${product.originalPrice ? `<span class="card-original">${formatPrice(product.originalPrice)}</span>` : ''}
          ${discount ? `<span class="card-discount">-${discount}%</span>` : ''}
        </div>
      </div>
      <div class="card-footer">
        <button class="card-add-btn" data-id="${product.id}" id="add-btn-${product.id}" aria-label="Add ${product.name} to cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          Add to Cart
        </button>
      </div>
    </div>
  `;
}

function getCategoryIcon(cat) {
  const icons = { electronics: '🔌', fashion: '👕', accessories: '💎', beauty: '✨' };
  return icons[cat] || '📦';
}

// ---- Bind product card events (add to cart + wishlist) ----
function bindCardEvents(container) {
  container?.addEventListener('click', e => {
    // Add to cart
    const addBtn = e.target.closest('.card-add-btn');
    if (addBtn) {
      e.preventDefault();
      const id = parseInt(addBtn.dataset.id);
      const product = getProductById(id);
      if (product) {
        Cart.addItem(product, 1);
        showToast(`✓ ${product.name} added to cart!`, 'success');
        addBtn.textContent = '✓ Added!';
        setTimeout(() => {
          addBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> Add to Cart`;
        }, 1500);
      }
    }

    // Wishlist toggle
    const wishBtn = e.target.closest('.wishlist-action');
    if (wishBtn) {
      e.preventDefault();
      e.stopPropagation();
      const id = parseInt(wishBtn.dataset.id);
      const added = Cart.toggleWishlist(id);
      wishBtn.classList.toggle('active', added);
      wishBtn.querySelector('svg').setAttribute('fill', added ? 'currentColor' : 'none');
      showToast(added ? '💝 Added to wishlist!' : 'Removed from wishlist', added ? 'success' : 'info');
    }

    // Navigate on card click
    const card = e.target.closest('.product-card');
    if (card && !e.target.closest('button') && !e.target.closest('a')) {
      window.location.href = `product.html?id=${card.dataset.id}`;
    }
  });
}
