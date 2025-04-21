import { useState } from 'react';
import { FaApplePay, FaArrowLeft, FaCreditCard, FaGooglePay, FaMinus, FaPaypal, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../store/store';

// Sample recommended products data
const recommendedProducts = [
    {
        id: 'rec1',
        name: 'Wireless Headphones',
        price: 79.99,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        tags: ['Electronics', 'Audio']
    },
    {
        id: 'rec2',
        name: 'Smart Watch',
        price: 129.99,
        imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        tags: ['Electronics', 'Wearable']
    },
    {
        id: 'rec3',
        name: 'Bluetooth Speaker',
        price: 49.99,
        imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        tags: ['Electronics', 'Audio']
    },
    {
        id: 'rec4',
        name: 'Phone Case',
        price: 19.99,
        imageUrl: 'https://images.unsplash.com/photo-1601593346740-925612772187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
        tags: ['Accessories', 'Phone']
    }
];

export default function Checkout() {
    const navigate = useNavigate();
    const { cart, removeFromCart, clearCart, placeOrder, updateCartItemQuantity } = useStore();
    const [paymentMethod, setPaymentMethod] = useState('credit-card');
    const [quantities, setQuantities] = useState<Record<string, number>>(
        cart.reduce((acc, item) => ({
            ...acc,
            [item.id]: item.quantity || 1
        }), {})
    );

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setQuantities({
            ...quantities,
            [productId]: newQuantity
        });

        // Also update in the store
        updateCartItemQuantity(productId, newQuantity);
    };

    const handleRemoveItem = (productId: string) => {
        removeFromCart(productId);
        toast.info('Item removed from cart');
    };

    const calculateSubtotal = () => {
        return cart.reduce((sum, product) => {
            return sum + (product.price * (quantities[product.id] || product.quantity || 1));
        }, 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * 0.1; // 10% tax
    };

    const calculateShipping = () => {
        return cart.length > 0 ? 5.99 : 0;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax() + calculateShipping();
    };

    const handlePlaceOrder = () => {
        // Create order items with quantities
        const orderItems = cart.map(product => ({
            ...product,
            quantity: quantities[product.id] || product.quantity || 1
        }));

        placeOrder(orderItems);
        toast.success('Your order has been placed successfully!');
        navigate('/profile/orders');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-primary">
                    <FaArrowLeft className="mr-2" />
                    Continue Shopping
                </Link>
            </div>

            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            {cart.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
                    <Link to="/products" className="btn btn-primary">
                        Browse Products
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="p-6 border-b">
                                <h2 className="text-xl font-semibold">Cart Items ({cart.length})</h2>
                            </div>

                            <div className="divide-y">
                                {cart.map((product) => (
                                    <div key={product.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-24 h-24 object-cover rounded-md mr-6 mb-4 sm:mb-0"
                                        />

                                        <div className="flex-1">
                                            <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                                            <p className="text-primary font-bold mb-3">${product.price.toFixed(2)}</p>

                                            <div className="flex items-center justify-between flex-wrap gap-3">
                                                <div className="flex items-center border rounded-md">
                                                    <button
                                                        onClick={() => updateQuantity(product.id, (quantities[product.id] || 1) - 1)}
                                                        className="px-3 py-1 text-gray-600 hover:text-primary"
                                                    >
                                                        <FaMinus size={12} />
                                                    </button>
                                                    <span className="px-3 py-1 border-x">{quantities[product.id] || 1}</span>
                                                    <button
                                                        onClick={() => updateQuantity(product.id, (quantities[product.id] || 1) + 1)}
                                                        className="px-3 py-1 text-gray-600 hover:text-primary"
                                                    >
                                                        <FaPlus size={12} />
                                                    </button>
                                                </div>

                                                <button
                                                    onClick={() => handleRemoveItem(product.id)}
                                                    className="text-red-500 hover:text-red-700 flex items-center"
                                                >
                                                    <FaTrash className="mr-1" size={14} />
                                                    Remove
                                                </button>
                                            </div>
                                        </div>

                                        <div className="font-bold text-right mt-4 sm:mt-0">
                                            ${(product.price * (quantities[product.id] || 1)).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-6 bg-gray-50">
                                <button
                                    onClick={() => clearCart()}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>${calculateSubtotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax (10%)</span>
                                    <span>${calculateTax().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span>${calculateShipping().toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-4 mt-4">
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total</span>
                                        <span>${calculateTotal().toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-medium mb-4">Payment Method</h3>
                                <div className="space-y-3">
                                    <label className="flex items-center p-3 border rounded-md cursor-pointer hover:border-primary transition-colors">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="credit-card"
                                            checked={paymentMethod === 'credit-card'}
                                            onChange={() => setPaymentMethod('credit-card')}
                                            className="mr-3"
                                        />
                                        <FaCreditCard className="mr-2 text-gray-600" />
                                        Credit Card
                                    </label>

                                    <label className="flex items-center p-3 border rounded-md cursor-pointer hover:border-primary transition-colors">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="paypal"
                                            checked={paymentMethod === 'paypal'}
                                            onChange={() => setPaymentMethod('paypal')}
                                            className="mr-3"
                                        />
                                        <FaPaypal className="mr-2 text-blue-500" />
                                        PayPal
                                    </label>

                                    <label className="flex items-center p-3 border rounded-md cursor-pointer hover:border-primary transition-colors">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="apple-pay"
                                            checked={paymentMethod === 'apple-pay'}
                                            onChange={() => setPaymentMethod('apple-pay')}
                                            className="mr-3"
                                        />
                                        <FaApplePay className="mr-2 text-gray-800" />
                                        Apple Pay
                                    </label>

                                    <label className="flex items-center p-3 border rounded-md cursor-pointer hover:border-primary transition-colors">
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="google-pay"
                                            checked={paymentMethod === 'google-pay'}
                                            onChange={() => setPaymentMethod('google-pay')}
                                            className="mr-3"
                                        />
                                        <FaGooglePay className="mr-2 text-gray-800" />
                                        Google Pay
                                    </label>
                                </div>
                            </div>

                            <button
                                onClick={handlePlaceOrder}
                                className="btn btn-primary w-full"
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Recommended Products */}
            <div className="mt-16">
                <h2 className="text-2xl font-bold mb-6">You might also like</h2>
                <div className="responsive-grid">
                    {recommendedProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            imageUrl={product.imageUrl}
                            tags={product.tags}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
} 