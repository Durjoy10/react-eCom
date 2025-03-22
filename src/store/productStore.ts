import { create } from 'zustand';
import { supabase } from '../lib/supabase';

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
  fetchProducts: () => Promise<void>;
  getProductsByCategory: (category: string) => Product[];
  getProductsByTag: (tag: string) => Product[];
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  loading: false,
  fetchProducts: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from('products')
      .select('*');
    
    if (!error && data) {
      set({ products: data });
    }
    set({ loading: false });
  },
  getProductsByCategory: (category) => {
    return get().products.filter(product => product.category === category);
  },
  getProductsByTag: (tag) => {
    return get().products.filter(product => product.tags.includes(tag));
  }
}));