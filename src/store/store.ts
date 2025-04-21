import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity?: number;
}

interface CartItem extends Product {
    quantity: number;
}

interface Order {
    id: string;
    products: Product[];
    total: number;
    status: 'Processing' | 'Shipped' | 'Delivered';
    date: string;
}

interface StoreState {
    cart: CartItem[];
    orders: Order[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateCartItemQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    placeOrder: (products: Product[]) => void;
    updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const useStore = create<StoreState>()(
    persist(
        (set) => ({
            cart: [],
            orders: [],
            addToCart: (product, quantity = 1) =>
                set((state) => {
                    const existingItemIndex = state.cart.findIndex(item => item.id === product.id);

                    if (existingItemIndex >= 0) {
                        // Item already exists in cart, update quantity
                        const updatedCart = [...state.cart];
                        updatedCart[existingItemIndex].quantity += quantity;
                        return { cart: updatedCart };
                    } else {
                        // Item is new, add to cart with quantity
                        return {
                            cart: [...state.cart, { ...product, quantity }]
                        };
                    }
                }),
            removeFromCart: (productId) =>
                set((state) => ({
                    cart: state.cart.filter((item) => item.id !== productId),
                })),
            updateCartItemQuantity: (productId, quantity) =>
                set((state) => {
                    const updatedCart = state.cart.map(item =>
                        item.id === productId
                            ? { ...item, quantity: Math.max(1, quantity) }
                            : item
                    );
                    return { cart: updatedCart };
                }),
            clearCart: () => set({ cart: [] }),
            placeOrder: (products) =>
                set((state) => {
                    const newOrder: Order = {
                        id: Date.now().toString(),
                        products,
                        total: products.reduce((sum, product) => sum + product.price, 0),
                        status: 'Processing',
                        date: new Date().toISOString(),
                    };
                    return { orders: [...state.orders, newOrder], cart: [] };
                }),
            updateOrderStatus: (orderId, status) =>
                set((state) => ({
                    orders: state.orders.map((order) =>
                        order.id === orderId ? { ...order, status } : order
                    ),
                })),
        }),
        {
            name: 'ecommerce-store',
        }
    )
); 