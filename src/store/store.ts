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

interface CustomerInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    division: string;
    district: string;
    postalCode: string;
    orderNotes?: string;
}

interface Order {
    id: string;
    items: Product[];
    total: number;
    status: string;
    date: string;
    customerInfo?: CustomerInfo;
    deliveryOption?: string;
    paymentMethod?: string;
    deliveryFee?: number;
    subtotal?: number;
}

interface StoreState {
    cart: CartItem[];
    orders: Order[];
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: string) => void;
    updateCartItemQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    placeOrder: (products: Product[], orderDetails?: any) => string;
    updateOrderStatus: (orderId: string, status: string) => void;
}

// Add some sample orders for development and testing
const sampleOrders: Order[] = [
    {
        id: '1745123456789',
        items: [
            {
                id: 'prod1',
                name: 'Running Shoes',
                price: 99.99,
                image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
                quantity: 1
            }
        ],
        total: 159.99,
        subtotal: 99.99,
        deliveryFee: 60,
        status: 'processing',
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        customerInfo: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '01712345678',
            address: 'House #123, Road #10',
            city: 'Gulshan',
            division: 'Dhaka',
            district: 'Dhaka',
            postalCode: '1212'
        },
        deliveryOption: 'standard',
        paymentMethod: 'cash'
    }
];

export const useStore = create<StoreState>()(
    persist(
        (set) => ({
            cart: [],
            orders: sampleOrders, // Initialize with sample orders
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
            placeOrder: (products, orderDetails = {}) => {
                const orderId = `${Date.now()}`;

                set((state) => {
                    const subtotal = products.reduce((sum, product) =>
                        sum + (product.price * (product.quantity || 1)), 0);

                    const deliveryFee = orderDetails.deliveryFee || 0;

                    const newOrder: Order = {
                        id: orderId,
                        items: products,
                        subtotal: subtotal,
                        deliveryFee: deliveryFee,
                        total: subtotal + deliveryFee,
                        status: 'confirmed',
                        date: new Date().toISOString(),
                        customerInfo: orderDetails.customerInfo,
                        deliveryOption: orderDetails.deliveryOption,
                        paymentMethod: orderDetails.paymentMethod
                    };

                    return {
                        orders: [...state.orders, newOrder],
                        cart: []
                    };
                });

                return orderId;
            },
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