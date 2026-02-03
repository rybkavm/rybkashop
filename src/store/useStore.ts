import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types
interface CartItem {
  productId: number;
  quantity: number;
}

interface User {
  id: string;
  email: string;
  name: string;
  city?: string;
}

interface StoreState {
  // Cart state
  cart: CartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
  getCartItemQuantity: (productId: number) => number;

  // Promo code state
  appliedPromoCode: string | null;
  promoCodeUsed: boolean;
  applyPromoCode: (code: string) => boolean;
  clearPromoCode: () => void;

  // Favorites/Likes state
  favorites: number[];
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  getFavoritesCount: () => number;
  clearFavorites: () => void;

  // Viewing history
  viewHistory: number[];
  addToHistory: (productId: number) => void;
  clearHistory: () => void;

  // User state
  user: User | null;
  isAuthModalOpen: boolean;
  authModalMode: "login" | "register";
  setUser: (user: User | null) => void;
  openAuthModal: (mode: "login" | "register") => void;
  closeAuthModal: () => void;

  // Mobile menu
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],

      addToCart: (productId: number) => {
        const cart = get().cart;
        const existingItem = cart.find((item) => item.productId === productId);

        if (existingItem) {
          set({
            cart: cart.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({ cart: [...cart, { productId, quantity: 1 }] });
        }
      },

      removeFromCart: (productId: number) => {
        set({ cart: get().cart.filter((item) => item.productId !== productId) });
      },

      updateQuantity: (productId: number, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set({
          cart: get().cart.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ cart: [], appliedPromoCode: null }),

      getCartCount: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },

      getCartItemQuantity: (productId: number) => {
        const item = get().cart.find((item) => item.productId === productId);
        return item?.quantity || 0;
      },

      // Promo code
      appliedPromoCode: null,
      promoCodeUsed: false,

      applyPromoCode: (code: string) => {
        const normalizedCode = code.toUpperCase().trim();
        if (normalizedCode === "РЫБКА" && !get().promoCodeUsed) {
          set({ appliedPromoCode: normalizedCode, promoCodeUsed: true });
          return true;
        }
        return false;
      },

      clearPromoCode: () => set({ appliedPromoCode: null }),

      // Favorites
      favorites: [],

      toggleFavorite: (productId: number) => {
        const favorites = get().favorites;
        if (favorites.includes(productId)) {
          set({ favorites: favorites.filter((id) => id !== productId) });
        } else {
          set({ favorites: [...favorites, productId] });
        }
      },

      isFavorite: (productId: number) => {
        return get().favorites.includes(productId);
      },

      getFavoritesCount: () => {
        return get().favorites.length;
      },

      clearFavorites: () => set({ favorites: [] }),

      // View history
      viewHistory: [],

      addToHistory: (productId: number) => {
        const history = get().viewHistory.filter((id) => id !== productId);
        // Keep only last 20 items
        const newHistory = [productId, ...history].slice(0, 20);
        set({ viewHistory: newHistory });
      },

      clearHistory: () => set({ viewHistory: [] }),

      // User
      user: null,
      isAuthModalOpen: false,
      authModalMode: "login",

      setUser: (user: User | null) => set({ user }),

      openAuthModal: (mode: "login" | "register") =>
        set({ isAuthModalOpen: true, authModalMode: mode }),

      closeAuthModal: () => set({ isAuthModalOpen: false }),

      // Mobile menu
      isMobileMenuOpen: false,

      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

      closeMobileMenu: () => set({ isMobileMenuOpen: false }),
    }),
    {
      name: "glassshop-storage",
      partialize: (state) => ({
        cart: state.cart,
        favorites: state.favorites,
        viewHistory: state.viewHistory,
        user: state.user,
        promoCodeUsed: state.promoCodeUsed,
        appliedPromoCode: state.appliedPromoCode,
      }),
    }
  )
);
