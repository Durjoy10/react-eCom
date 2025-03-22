import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistState {
  items: string[]; // Array of product IDs
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addToWishlist: (productId) => {
        set((state) => ({
          items: [...state.items, productId]
        }));
      },
      removeFromWishlist: (productId) => {
        set((state) => ({
          items: state.items.filter(id => id !== productId)
        }));
      },
      isInWishlist: (productId) => {
        return get().items.includes(productId);
      }
    }),
    {
      name: 'wishlist-storage', // name for the localStorage key
    }
  )
); 