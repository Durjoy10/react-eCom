import { create } from 'zustand';
import { mockProducts } from '../data/mockProducts';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  image_url: string;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  fetchProducts: () => Promise<void>;
  getProductsByCategory: (category: string) => Product[];
  getProductsByTag: (tag: string) => Product[];
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  error: null,
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ products: mockProducts });
    } catch (error) {
      console.error('Error fetching products:', error);
      set({ error: error instanceof Error ? error.message : 'Failed to fetch products' });
    } finally {
      set({ loading: false });
    }
  },
  getProductsByCategory: (category) => {
    return get().products.filter(product => product.category === category);
  },
  getProductsByTag: (tag) => {
    return get().products.filter(product => product.tags.includes(tag));
  }
}));