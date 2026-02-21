import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  
  login: (userData, token) => {
    localStorage.setItem('token', token);
    set({
      user: userData,
      token,
      isAuthenticated: true,
    });
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
  
  updateUser: (userData) => set({ user: userData }),
}));

export const useCartStore = create((set) => ({
  cart: null,
  itemCount: 0,
  
  setCart: (cart) => set({
    cart,
    itemCount: cart?.totalItems || 0,
  }),
  
  clearCart: () => set({
    cart: null,
    itemCount: 0,
  }),
}));

export const useProductStore = create((set) => ({
  products: [],
  featuredProducts: [],
  currentProduct: null,
  
  setProducts: (products) => set({ products }),
  setFeaturedProducts: (products) => set({ featuredProducts: products }),
  setCurrentProduct: (product) => set({ currentProduct: product }),
}));
