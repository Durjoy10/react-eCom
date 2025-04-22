import { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useStore } from '../store/store';

export default function Cart() {
    const navigate = useNavigate();
    const { cart, removeFromCart, clearCart, updateCartItemQuantity } = useStore();
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

    const handleProceedToCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-primary">
                    <FaArrowLeft className="mr-2" />
                    Continue Shopping
                </Link>
            </div>

            <h1 className="font-display text-3xl font-bold mb-8">Your Shopping Cart</h1>

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
                                            <p className="text-primary font-bold mb-3">৳ {product.price.toFixed(2)}</p>

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
                                            ৳ {(product.price * (quantities[product.id] || 1)).toFixed(2)}
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
                                    <span>৳ {calculateSubtotal().toFixed(2)}</span>
                                </div>

                                <div className="border-t pt-4 mt-4">
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Estimated Total</span>
                                        <span>৳ {calculateSubtotal().toFixed(2)}</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-1">Taxes and shipping calculated at checkout</p>
                                </div>
                            </div>

                            <button
                                onClick={handleProceedToCheckout}
                                className="btn btn-primary w-full flex items-center justify-center"
                            >
                                <span>Order Now</span>
                                <FaArrowRight className="ml-2" />
                            </button>

                            <div className="mt-4 text-center">
                                <p className="text-sm text-gray-500">
                                    Need help? Call <span className="text-primary">+880 1234-567890</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
} 