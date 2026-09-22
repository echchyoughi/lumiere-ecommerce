import axios from 'axios';

const API_BASE = '/api';

// Unique session ID stored in localStorage for guest cart/wishlist sync
export function getSessionId(): string {
  let id = localStorage.getItem('lumiere_session_id');
  if (!id) {
    id = 'session_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
    localStorage.setItem('lumiere_session_id', id);
  }
  return id;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number | null;
  image?: string | null;
  images: string[];
  rating: number;
  reviewsCount: number;
  badge?: string | null;
  isNew: boolean;
  inStock: boolean;
  stock: number;
  description: string;
  fullDescription: string;
  specs: [string, string][];
  colors: string[];
  colorNames: string[];
  sizes?: string[];
  cssGradient?: string | null;
  reviewList?: Review[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
}

export interface CartItem {
  id: string;
  productId: number;
  quantity: number;
  selectedColor?: string | null;
  selectedSize?: string | null;
  product: Product;
}

export interface WishlistItem {
  id: string;
  productId: number;
  product: Product;
}

export interface Order {
  id: string;
  orderNumber: string;
  shippingName: string;
  shippingAddress: string;
  city: string;
  zipCode: string;
  country: string;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  paymentMethod: string;
  status: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    color?: string;
    size?: string;
    image?: string;
  }>;
  createdAt: string;
}

// API Functions
export const api = {
  // Products
  getProducts: async (params?: { category?: string; search?: string; minPrice?: number; maxPrice?: number; sort?: string; badge?: string }) => {
    const res = await axios.get(`${API_BASE}/products`, { params });
    return res.data;
  },

  getProductById: async (id: number) => {
    const res = await axios.get(`${API_BASE}/products/${id}`);
    return res.data;
  },

  addReview: async (productId: number, data: { name: string; rating: number; text: string }) => {
    const res = await axios.post(`${API_BASE}/products/${productId}/reviews`, data);
    return res.data;
  },

  // Cart
  getCart: async () => {
    const sessionId = getSessionId();
    const res = await axios.get(`${API_BASE}/cart`, { params: { sessionId } });
    return res.data;
  },

  addToCart: async (productId: number, quantity = 1, color?: string, size?: string) => {
    const sessionId = getSessionId();
    const res = await axios.post(`${API_BASE}/cart`, { productId, sessionId, quantity, color, size });
    return res.data;
  },

  updateCartQuantity: async (itemId: string, quantity: number) => {
    const res = await axios.put(`${API_BASE}/cart/${itemId}`, { quantity });
    return res.data;
  },

  removeFromCart: async (itemId: string) => {
    const res = await axios.delete(`${API_BASE}/cart/${itemId}`);
    return res.data;
  },

  clearCart: async () => {
    const sessionId = getSessionId();
    const res = await axios.delete(`${API_BASE}/cart/clear/all`, { params: { sessionId } });
    return res.data;
  },

  // Wishlist
  getWishlist: async () => {
    const sessionId = getSessionId();
    const res = await axios.get(`${API_BASE}/wishlist`, { params: { sessionId } });
    return res.data;
  },

  toggleWishlist: async (productId: number) => {
    const sessionId = getSessionId();
    const res = await axios.post(`${API_BASE}/wishlist/toggle`, { productId, sessionId });
    return res.data;
  },

  // Checkout & Orders
  checkout: async (data: {
    shippingName: string;
    shippingAddress: string;
    city: string;
    zipCode: string;
    country: string;
    paymentMethod: string;
    promoCode?: string;
    items?: any[];
  }) => {
    const sessionId = getSessionId();
    const res = await axios.post(`${API_BASE}/orders/checkout`, { ...data, sessionId });
    return res.data;
  },

  getOrder: async (orderNumber: string) => {
    const res = await axios.get(`${API_BASE}/orders/${orderNumber}`);
    return res.data;
  },

  validatePromo: async (code: string) => {
    const res = await axios.post(`${API_BASE}/orders/validate-promo`, { code });
    return res.data;
  },

  // Auth
  login: async (email: string, password: string) => {
    const res = await axios.post(`${API_BASE}/auth/login`, { email, password });
    return res.data;
  },

  register: async (name: string, email: string, password: string) => {
    const res = await axios.post(`${API_BASE}/auth/register`, { name, email, password });
    return res.data;
  },

  getMe: async (token: string) => {
    const res = await axios.get(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  }
};
