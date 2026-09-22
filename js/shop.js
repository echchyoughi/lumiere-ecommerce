/* =============================================
   SHOP.JS — Shop page with filtering, sorting, pagination
   ============================================= */

const ITEMS_PER_PAGE = 8;

let state = {
  filtered: [...PRODUCTS],
  page: 1,
  view: 'grid',
  sort: 'featured',
  filters: {
    categories: [],
    priceMin: 0,
    priceMax: 1000,
    rating: 0,
    saleOnly: false,
    search: '',
  }
};

document.addEventListener('DOMContentLoaded', () => {
  parseURLParams();
  initFilters();
  applyAndRender();
  bindFilterEvents();
  bindToolbar();
  bindMobileFilter();
});

function parseURLParams() {
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('cat');
  const q = params.get('q');
  const sale = params.get('sale');

  if (cat && cat !== 'new') {
    state.filters.categories = [cat];
    const cb = document.getElementById(`filter-${cat}`);
    if (cb) cb.checked = true;

    document.getElementById('shop-page-title').textContent =
      cat.charAt(0).toUpperCase() + cat.slice(1);
    document.getElementById('breadcrumb-cat').textContent =
      cat.charAt(0).toUpperCase() + cat.slice(1);
  }

  if (cat === 'new') {
    state.sort = 'newest';
    document.getElementById('sort-select').value = 'newest';
    document.getElementById('shop-page-title').textContent = 'New Arrivals';
    document.getElementById('breadcrumb-cat').textContent = 'New Arrivals';
  }

  if (q) {
    state.filters.search = q;
    document.getElementById('shop-page-title').textContent = `Results for "${q}"`;
    document.getElementById('breadcrumb-cat').textContent = `Search: ${q}`;
    if (document.getElementById('search-input')) {
      document.getElementById('search-input').value = q;
    }
  }

  if (sale === 'true') {
    state.filters.saleOnly = true;
    const cb = document.getElementById('filter-sale');
    if (cb) cb.checked = true;
    document.getElementById('shop-page-title').textContent = 'Sale';
    document.getElementById('breadcrumb-cat').textContent = 'Sale';
  }
}

function initFilters() {
  const priceMin = document.getElementById('price-min');
  const priceMax = document.getElementById('price-max');
  if (priceMin && priceMax) {
    priceMin.addEventListener('input', () => {
      state.filters.priceMin = parseInt(priceMin.value);
      document.getElementById('price-min-val').textContent = priceMin.value;
      applyAndRender();
    });
    priceMax.addEventListener('input', () => {
      state.filters.priceMax = parseInt(priceMax.value);
      document.getElementById('price-max-val').textContent = priceMax.value;
      applyAndRender();
    });
  }

  document.getElementById('filter-sale')?.addEventListener('change', e => {
    state.filters.saleOnly = e.target.checked;
    applyAndRender();
  });

  document.querySelectorAll('#filter-categories input[type="checkbox"]').forEach(cb => {
    cb.addEventListener('change', () => {
      state.filters.categories = Array.from(
        document.querySelectorAll('#filter-categories input:checked')
      ).map(c => c.value);
      applyAndRender();
    });
  });

  document.getElementById('clear-filters')?.addEventListener('click', clearFilters);
}

function bindFilterEvents() {
  document.getElementById('rating-filter')?.addEventListener('click', e => {
    const btn = e.target.closest('.rating-btn');
    if (!btn) return;
    document.querySelectorAll('.rating-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.filters.rating = parseFloat(btn.dataset.rating);
    applyAndRender();
  });
}

function bindToolbar() {
  const sortSelect = document.getElementById('sort-select');
  sortSelect?.addEventListener('change', () => {
    state.sort = sortSelect.value;
    state.page = 1;
    applyAndRender();
  });

  document.getElementById('view-grid')?.addEventListener('click', () => setView('grid'));
  document.getElementById('view-list')?.addEventListener('click', () => setView('list'));
}

function setView(view) {
  state.view = view;
  const grid = document.getElementById('shop-grid');
  const btnGrid = document.getElementById('view-grid');
  const btnList = document.getElementById('view-list');
  if (view === 'list') {
    grid?.classList.add('list-view');
    btnList?.classList.add('active');
    btnGrid?.classList.remove('active');
  } else {
    grid?.classList.remove('list-view');
    btnGrid?.classList.add('active');
    btnList?.classList.remove('active');
  }
}

function bindMobileFilter() {
  const btn = document.getElementById('filter-mobile-btn');
  const sidebar = document.getElementById('shop-sidebar');
  btn?.addEventListener('click', () => {
    sidebar?.classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (sidebar && !sidebar.contains(e.target) && !btn?.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

function clearFilters() {
  state.filters = { categories: [], priceMin: 0, priceMax: 1000, rating: 0, saleOnly: false, search: '' };
  document.querySelectorAll('#filter-categories input').forEach(cb => cb.checked = false);
  document.getElementById('filter-sale').checked = false;
  document.getElementById('price-min').value = 0;
  document.getElementById('price-max').value = 1000;
  document.getElementById('price-min-val').textContent = '0';
  document.getElementById('price-max-val').textContent = '1000';
  document.querySelectorAll('.rating-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('[data-rating="0"]')?.classList.add('active');
  applyAndRender();
}

function applyFilters() {
  let results = [...PRODUCTS];

  if (state.filters.categories.length > 0) {
    results = results.filter(p => state.filters.categories.includes(p.category));
  }

  results = results.filter(p =>
    p.price >= state.filters.priceMin && p.price <= state.filters.priceMax
  );

  if (state.filters.rating > 0) {
    results = results.filter(p => p.rating >= state.filters.rating);
  }

  if (state.filters.saleOnly) {
    results = results.filter(p => !!p.originalPrice);
  }

  if (state.filters.search) {
    const q = state.filters.search.toLowerCase();
    results = results.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  // Sorting
  switch (state.sort) {
    case 'price-asc': results.sort((a, b) => a.price - b.price); break;
    case 'price-desc': results.sort((a, b) => b.price - a.price); break;
    case 'rating': results.sort((a, b) => b.rating - a.rating); break;
    case 'newest': results.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    default: break;
  }

  return results;
}

function applyAndRender() {
  state.filtered = applyFilters();
  state.page = Math.min(state.page, Math.ceil(state.filtered.length / ITEMS_PER_PAGE) || 1);
  renderProducts();
  renderPagination();
}

function renderProducts() {
  const grid = document.getElementById('shop-grid');
  const counter = document.getElementById('results-num');
  if (!grid) return;

  const total = state.filtered.length;
  if (counter) counter.textContent = total;

  if (total === 0) {
    grid.innerHTML = `
      <div class="no-results">
        <div class="no-results-icon">🔍</div>
        <h3>No products found</h3>
        <p>Try adjusting your filters or search terms.</p>
        <button class="btn btn-outline" onclick="clearFilters()" style="margin-top:16px">Clear Filters</button>
      </div>
    `;
    return;
  }

  const start = (state.page - 1) * ITEMS_PER_PAGE;
  const paginated = state.filtered.slice(start, start + ITEMS_PER_PAGE);

  grid.innerHTML = paginated.map(buildProductCard).join('');
  bindCardEvents(grid);

  if (state.view === 'list') grid.classList.add('list-view');

  setTimeout(observeAnimations, 50);
}

function renderPagination() {
  const container = document.getElementById('pagination');
  if (!container) return;

  const total = Math.ceil(state.filtered.length / ITEMS_PER_PAGE);
  if (total <= 1) { container.innerHTML = ''; return; }

  let html = '';
  html += `<button class="page-btn" onclick="goPage(${state.page - 1})" ${state.page === 1 ? 'disabled' : ''}>‹ Prev</button>`;
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || Math.abs(i - state.page) <= 1) {
      html += `<button class="page-btn ${i === state.page ? 'active' : ''}" onclick="goPage(${i})">${i}</button>`;
    } else if (Math.abs(i - state.page) === 2) {
      html += `<span style="padding:0 4px;color:var(--text-muted)">…</span>`;
    }
  }
  html += `<button class="page-btn" onclick="goPage(${state.page + 1})" ${state.page === total ? 'disabled' : ''}>Next ›</button>`;
  container.innerHTML = html;
}

function goPage(page) {
  const total = Math.ceil(state.filtered.length / ITEMS_PER_PAGE);
  if (page < 1 || page > total) return;
  state.page = page;
  renderProducts();
  renderPagination();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
