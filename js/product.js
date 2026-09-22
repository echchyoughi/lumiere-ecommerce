/* =============================================
   PRODUCT.JS — Product detail page logic
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const product = getProductById(id);

  if (!product) {
    document.getElementById('product-detail').innerHTML = `
      <div style="text-align:center;padding:80px 24px;grid-column:1/-1;">
        <div style="font-size:4rem;margin-bottom:16px">😕</div>
        <h2>Product Not Found</h2>
        <p style="color:var(--text-muted);margin:8px 0 24px">The product you're looking for doesn't exist.</p>
        <a href="shop.html" class="btn btn-primary">Browse Shop</a>
      </div>
    `;
    return;
  }

  renderProduct(product);
  renderRelated(product);
  bindTabs();
  bindWishlist(product);
  bindAddToCart(product);
  bindQtyControls();
});

let selectedColor = 0;
let selectedSize = null;

function renderProduct(product) {
  // Page title
  document.title = `${product.name} — LUMIÈRE`;
  document.getElementById('page-title').content = `${product.name} — LUMIÈRE`;
  document.getElementById('breadcrumb-name').textContent = product.name;

  // Badges
  const badges = [];
  if (product.badge === 'sale') badges.push('<span class="card-badge badge-sale">Sale</span>');
  if (product.badge === 'new' || product.isNew) badges.push('<span class="card-badge badge-new">New</span>');
  if (product.badge === 'hot') badges.push('<span class="card-badge badge-hot">🔥 Hot</span>');
  document.getElementById('product-badges').innerHTML = badges.join('');

  // Basic info
  document.getElementById('product-category').textContent = product.category;
  document.getElementById('product-name').textContent = product.name;
  document.getElementById('product-rating').textContent = product.rating;
  document.getElementById('product-reviews').textContent = `(${product.reviews.toLocaleString()} reviews)`;
  document.getElementById('product-stars').textContent = '★'.repeat(Math.floor(product.rating)) +
    (product.rating % 1 >= 0.5 ? '½' : '');
  document.getElementById('product-price').textContent = formatPrice(product.price);
  document.getElementById('product-description').textContent = product.description;

  // Price
  const origEl = document.getElementById('product-original-price');
  const discEl = document.getElementById('product-discount');
  if (product.originalPrice) {
    origEl.textContent = formatPrice(product.originalPrice);
    const disc = getDiscount(product.price, product.originalPrice);
    discEl.textContent = `-${disc}% OFF`;
  }

  // Stock
  const stockEl = document.getElementById('stock-info');
  if (product.stock <= 10) {
    stockEl.textContent = `Only ${product.stock} left!`;
    stockEl.style.color = 'var(--error)';
  } else {
    stockEl.textContent = 'In stock';
    stockEl.style.color = 'var(--success)';
  }

  // Image
  const mainImg = document.getElementById('main-product-img');
  const thumbStrip = document.getElementById('thumb-strip');

  if (product.image) {
    mainImg.src = product.image;
    mainImg.alt = product.name;
    mainImg.style.display = 'block';

    // Thumbnails
    const thumbs = [product.image, product.image];
    thumbStrip.innerHTML = thumbs.map((src, i) =>
      `<div class="thumb ${i === 0 ? 'active' : ''}" data-src="${src}">
        <img src="${src}" alt="View ${i + 1}" />
      </div>`
    ).join('');
  } else {
    mainImg.style.display = 'none';
    const wrap = document.querySelector('.main-image-wrap');
    wrap.style.background = product.cssGradient || '#1e1e2c';
    wrap.style.display = 'flex';
    wrap.style.alignItems = 'center';
    wrap.style.justifyContent = 'center';
    const icon = document.createElement('div');
    icon.style.fontSize = '6rem';
    icon.textContent = getCategoryIcon(product.category);
    wrap.appendChild(icon);
    thumbStrip.innerHTML = '';
  }

  // Thumbnail clicks
  thumbStrip?.addEventListener('click', e => {
    const thumb = e.target.closest('.thumb');
    if (!thumb) return;
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    thumb.classList.add('active');
    mainImg.src = thumb.dataset.src;
  });

  // Colors
  if (product.colors && product.colors.length > 0) {
    document.getElementById('color-group').style.display = '';
    document.getElementById('selected-color').textContent = product.colorNames[0];
    document.getElementById('color-swatches').innerHTML = product.colors.map((c, i) =>
      `<button class="color-swatch ${i === 0 ? 'selected' : ''}" data-idx="${i}" data-name="${product.colorNames[i]}" style="background:${c};" title="${product.colorNames[i]}" aria-label="${product.colorNames[i]}"></button>`
    ).join('');

    document.getElementById('color-swatches').addEventListener('click', e => {
      const swatch = e.target.closest('.color-swatch');
      if (!swatch) return;
      document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('selected'));
      swatch.classList.add('selected');
      selectedColor = parseInt(swatch.dataset.idx);
      document.getElementById('selected-color').textContent = swatch.dataset.name;
    });
  }

  // Sizes
  if (product.sizes && product.sizes.length > 0) {
    document.getElementById('size-group').style.display = '';
    document.getElementById('size-options').innerHTML = product.sizes.map(s =>
      `<button class="size-btn" data-size="${s}">${s}</button>`
    ).join('');

    document.getElementById('size-options').addEventListener('click', e => {
      const btn = e.target.closest('.size-btn');
      if (!btn) return;
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedSize = btn.dataset.size;
      document.getElementById('selected-size').textContent = selectedSize;
    });
  }

  // Full description tab
  document.getElementById('full-description').textContent = product.fullDescription || product.description;

  // Specs tab
  if (product.specs) {
    document.getElementById('specs-table').innerHTML = product.specs.map(([k, v]) =>
      `<tr><td>${k}</td><td>${v}</td></tr>`
    ).join('');
  }

  // Reviews tab
  renderReviews(product);
}

function renderReviews(product) {
  const bigRating = document.getElementById('reviews-big-rating');
  const breakdown = document.getElementById('reviews-breakdown');
  const list = document.getElementById('reviews-list');

  if (bigRating) {
    bigRating.innerHTML = `
      <div class="big-num">${product.rating}</div>
      <div class="big-stars">${'★'.repeat(Math.floor(product.rating))}</div>
      <div class="review-count">${product.reviews.toLocaleString()} reviews</div>
    `;
  }

  if (breakdown) {
    const bars = [
      { label: '5★', pct: 72 }, { label: '4★', pct: 18 },
      { label: '3★', pct: 6 }, { label: '2★', pct: 2 }, { label: '1★', pct: 2 }
    ];
    breakdown.innerHTML = bars.map(b => `
      <div class="rating-bar">
        <span class="bar-label">${b.label}</span>
        <div class="bar-track"><div class="bar-fill" style="width:${b.pct}%"></div></div>
        <span class="bar-pct">${b.pct}%</span>
      </div>
    `).join('');
  }

  if (list && product.reviewList) {
    list.innerHTML = product.reviewList.map(r => `
      <div class="review-item">
        <div class="review-header">
          <div class="review-avatar" style="background:${r.avatar}">${r.name.split(' ').map(n=>n[0]).join('')}</div>
          <div class="review-meta">
            <strong>${r.name}</strong>
            <span>${r.date}</span>
          </div>
          <div class="review-stars">${'★'.repeat(r.rating)}</div>
        </div>
        <p class="review-text">${r.text}</p>
      </div>
    `).join('');
  }
}

function renderRelated(product) {
  const grid = document.getElementById('related-grid');
  if (!grid) return;
  const related = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  if (related.length === 0) grid.closest('.related-section')?.remove();
  else {
    grid.innerHTML = related.map(buildProductCard).join('');
    bindCardEvents(grid);
    setTimeout(observeAnimations, 100);
  }
}

function bindTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));
      btn.classList.add('active');
      document.getElementById(`tab-content-${btn.dataset.tab}`)?.classList.remove('hidden');
    });
  });
}

function bindWishlist(product) {
  const btn = document.getElementById('wishlist-btn');
  if (!btn) return;
  const update = () => {
    const active = Cart.isWishlisted(product.id);
    btn.classList.toggle('active', active);
    btn.querySelector('svg').setAttribute('fill', active ? 'currentColor' : 'none');
  };
  update();
  btn.addEventListener('click', () => {
    const added = Cart.toggleWishlist(product.id);
    update();
    showToast(added ? '💝 Added to wishlist!' : 'Removed from wishlist', added ? 'success' : 'info');
  });
}

function bindAddToCart(product) {
  const addBtn = document.getElementById('add-to-cart-btn');
  const buyBtn = document.getElementById('buy-now-btn');

  addBtn?.addEventListener('click', () => {
    const qty = parseInt(document.getElementById('qty-input').value) || 1;
    const options = {};
    if (product.colors) options.color = product.colorNames[selectedColor];
    if (product.sizes) options.size = selectedSize;
    Cart.addItem(product, qty, options);
    showToast(`✓ ${product.name} added to cart!`, 'success');
    addBtn.textContent = '✓ Added to Cart!';
    setTimeout(() => {
      addBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg> Add to Cart`;
    }, 2000);
  });

  buyBtn?.addEventListener('click', () => {
    const qty = parseInt(document.getElementById('qty-input').value) || 1;
    const options = {};
    if (product.colors) options.color = product.colorNames[selectedColor];
    if (product.sizes) options.size = selectedSize;
    Cart.addItem(product, qty, options);
    window.location.href = 'cart.html';
  });
}

function bindQtyControls() {
  const input = document.getElementById('qty-input');
  document.getElementById('qty-plus')?.addEventListener('click', () => {
    input.value = Math.min(parseInt(input.value) + 1, 99);
  });
  document.getElementById('qty-minus')?.addEventListener('click', () => {
    input.value = Math.max(parseInt(input.value) - 1, 1);
  });
  input?.addEventListener('change', () => {
    input.value = Math.max(1, Math.min(parseInt(input.value) || 1, 99));
  });
}
