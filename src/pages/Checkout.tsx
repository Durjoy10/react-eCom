import { useState } from 'react';
import { BsCashCoin, BsPhone } from 'react-icons/bs';
import { FaArrowLeft, FaMobileAlt, FaRegCreditCard } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ProductCard } from '../components/ProductCard';
import { useStore } from '../store/store';

// Bangladesh specific areas for delivery
const divisionsInBangladesh = [
    'Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh'
];

// Sample districts for each division
const districtsInBangladesh: Record<string, string[]> = {
    'Dhaka': ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail', 'Narsingdi'],
    'Chittagong': ['Chittagong', 'Cox\'s Bazar', 'Bandarban', 'Rangamati', 'Khagrachari'],
    'Rajshahi': ['Rajshahi', 'Bogra', 'Pabna', 'Sirajganj', 'Natore'],
    'Khulna': ['Khulna', 'Jessore', 'Satkhira', 'Bagerhat', 'Chuadanga'],
    'Barisal': ['Barisal', 'Bhola', 'Patuakhali', 'Pirojpur', 'Jhalokati'],
    'Sylhet': ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
    'Rangpur': ['Rangpur', 'Dinajpur', 'Kurigram', 'Gaibandha', 'Nilphamari'],
    'Mymensingh': ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur']
};

// Delivery options
const deliveryOptions = [
    { id: 'standard', name: 'Standard Delivery', price: 60, time: '3-5 days' },
    { id: 'express', name: 'Express Delivery', price: 120, time: '1-2 days' },
    { id: 'same-day', name: 'Same Day Delivery', price: 200, time: 'Today (Dhaka only)' }
];

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
    orderNotes: string;
}

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

    // Customer Information State
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        division: 'Dhaka',
        district: 'Dhaka',
        postalCode: '',
        orderNotes: ''
    });

    // Delivery and Payment Options
    const [deliveryOption, setDeliveryOption] = useState('standard');
    const [paymentMethod, setPaymentMethod] = useState('cash');

    // Quantities
    const [quantities, setQuantities] = useState<Record<string, number>>(
        cart.reduce((acc, item) => ({
            ...acc,
            [item.id]: item.quantity || 1
        }), {})
    );

    // Form validation
    const [errors, setErrors] = useState<Record<string, string>>({});

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

    const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when field is filled
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDivision = e.target.value;
        setCustomerInfo(prev => ({
            ...prev,
            division: selectedDivision,
            district: districtsInBangladesh[selectedDivision][0] || ''
        }));
    };

    const calculateSubtotal = () => {
        return cart.reduce((sum, product) => {
            return sum + (product.price * (quantities[product.id] || product.quantity || 1));
        }, 0);
    };

    const calculateDeliveryFee = () => {
        return deliveryOptions.find(option => option.id === deliveryOption)?.price || 0;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateDeliveryFee();
    };

    const validateForm = () => {
        const requiredFields = [
            'firstName', 'lastName', 'phone', 'address', 'city', 'division', 'district'
        ];
        const newErrors: Record<string, string> = {};

        requiredFields.forEach(field => {
            if (!customerInfo[field as keyof CustomerInfo]) {
                newErrors[field] = 'This field is required';
            }
        });

        // Phone validation for Bangladesh
        if (customerInfo.phone && !/^01[3-9]\d{8}$/.test(customerInfo.phone)) {
            newErrors.phone = 'Please enter a valid Bangladesh phone number (e.g., 01712345678)';
        }

        // Email validation if provided
        if (customerInfo.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePlaceOrder = () => {
        if (!validateForm()) {
            toast.error('Please fill in all required fields');
            return;
        }

        // Create order items with quantities
        const orderItems = cart.map(product => ({
            ...product,
            quantity: quantities[product.id] || product.quantity || 1
        }));

        // Create order details
        const orderDetails = {
            customerInfo,
            deliveryOption,
            deliveryFee: calculateDeliveryFee(),
            paymentMethod,
            subtotal: calculateSubtotal(),
        };

        // Place the order and get the order ID
        const orderId = placeOrder(orderItems, orderDetails);

        toast.success('Your order has been placed successfully!');
        // Navigate to the profile orders page instead of track order
        navigate('/profile/orders');
    };

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link to="/products" className="inline-flex items-center text-gray-600 hover:text-primary">
                        <FaArrowLeft className="mr-2" />
                        Continue Shopping
                    </Link>
                </div>

                <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>

                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
                    <p className="text-gray-600 mb-6">You need to add items to your cart before checkout.</p>
                    <Link to="/products" className="btn btn-primary">
                        Browse Products
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-6">
                <Link to="/cart" className="inline-flex items-center text-gray-600 hover:text-primary">
                    <FaArrowLeft className="mr-2" />
                    Back to Cart
                </Link>
            </div>

            <h1 className="font-display text-3xl font-bold mb-8">Checkout</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Order Form */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={customerInfo.firstName}
                                    onChange={handleCustomerInfoChange}
                                    className={`w-full p-2 border rounded-md ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="First Name"
                                />
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={customerInfo.lastName}
                                    onChange={handleCustomerInfoChange}
                                    className={`w-full p-2 border rounded-md ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Last Name"
                                />
                                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={customerInfo.email}
                                    onChange={handleCustomerInfoChange}
                                    className={`w-full p-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Email Address"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={customerInfo.phone}
                                    onChange={handleCustomerInfoChange}
                                    className={`w-full p-2 border rounded-md ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="01XXXXXXXXX"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold mb-3">Shipping Address</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address *</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={customerInfo.address}
                                    onChange={handleCustomerInfoChange}
                                    className={`w-full p-2 border rounded-md ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="House #, Road #, Area"
                                />
                                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Division *</label>
                                <select
                                    name="division"
                                    value={customerInfo.division}
                                    onChange={handleDivisionChange}
                                    className={`w-full p-2 border rounded-md ${errors.division ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    {divisionsInBangladesh.map(division => (
                                        <option key={division} value={division}>{division}</option>
                                    ))}
                                </select>
                                {errors.division && <p className="text-red-500 text-xs mt-1">{errors.division}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                                <select
                                    name="district"
                                    value={customerInfo.district}
                                    onChange={handleCustomerInfoChange}
                                    className={`w-full p-2 border rounded-md ${errors.district ? 'border-red-500' : 'border-gray-300'}`}
                                >
                                    {customerInfo.division && districtsInBangladesh[customerInfo.division]?.map(district => (
                                        <option key={district} value={district}>{district}</option>
                                    ))}
                                </select>
                                {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City/Area *</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={customerInfo.city}
                                    onChange={handleCustomerInfoChange}
                                    className={`w-full p-2 border rounded-md ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="City or Area"
                                />
                                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={customerInfo.postalCode}
                                    onChange={handleCustomerInfoChange}
                                    className={`w-full p-2 border rounded-md ${errors.postalCode ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Postal Code"
                                />
                                {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes</label>
                            <textarea
                                name="orderNotes"
                                value={customerInfo.orderNotes}
                                onChange={handleCustomerInfoChange}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                placeholder="Special notes for delivery (optional)"
                                rows={3}
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-4">Delivery Options</h2>

                        <div className="space-y-3">
                            {deliveryOptions.map(option => (
                                <label key={option.id} className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${deliveryOption === option.id ? 'border-primary bg-primary/5' : 'hover:border-gray-400'}`}>
                                    <input
                                        type="radio"
                                        name="deliveryOption"
                                        value={option.id}
                                        checked={deliveryOption === option.id}
                                        onChange={() => setDeliveryOption(option.id)}
                                        className="mr-3"
                                    />
                                    <div className="flex-1">
                                        <div className="font-medium">{option.name}</div>
                                        <div className="text-sm text-gray-600">Delivery time: {option.time}</div>
                                    </div>
                                    <div className="font-semibold">৳ {option.price}</div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                        <div className="space-y-3">
                            <label className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${paymentMethod === 'cash' ? 'border-primary bg-primary/5' : 'hover:border-gray-400'}`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cash"
                                    checked={paymentMethod === 'cash'}
                                    onChange={() => setPaymentMethod('cash')}
                                    className="mr-3"
                                />
                                <div className="flex items-center">
                                    <BsCashCoin className="mr-2 text-green-600 text-lg" />
                                    <div>
                                        <div className="font-medium">Cash on Delivery</div>
                                        <div className="text-sm text-gray-600">Pay when you receive your order</div>
                                    </div>
                                </div>
                            </label>

                            <label className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${paymentMethod === 'bkash' ? 'border-primary bg-primary/5' : 'hover:border-gray-400'}`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="bkash"
                                    checked={paymentMethod === 'bkash'}
                                    onChange={() => setPaymentMethod('bkash')}
                                    className="mr-3"
                                />
                                <div className="flex items-center">
                                    <FaMobileAlt className="mr-2 text-pink-600 text-lg" />
                                    <div>
                                        <div className="font-medium">bKash</div>
                                        <div className="text-sm text-gray-600">Pay via bKash mobile banking</div>
                                    </div>
                                </div>
                            </label>

                            <label className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${paymentMethod === 'nagad' ? 'border-primary bg-primary/5' : 'hover:border-gray-400'}`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="nagad"
                                    checked={paymentMethod === 'nagad'}
                                    onChange={() => setPaymentMethod('nagad')}
                                    className="mr-3"
                                />
                                <div className="flex items-center">
                                    <BsPhone className="mr-2 text-orange-600 text-lg" />
                                    <div>
                                        <div className="font-medium">Nagad</div>
                                        <div className="text-sm text-gray-600">Pay via Nagad mobile banking</div>
                                    </div>
                                </div>
                            </label>

                            <label className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'hover:border-gray-400'}`}>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="card"
                                    checked={paymentMethod === 'card'}
                                    onChange={() => setPaymentMethod('card')}
                                    className="mr-3"
                                />
                                <div className="flex items-center">
                                    <FaRegCreditCard className="mr-2 text-blue-600 text-lg" />
                                    <div>
                                        <div className="font-medium">Credit/Debit Card</div>
                                        <div className="text-sm text-gray-600">Pay securely with your card</div>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
                        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                        <div className="space-y-3 mb-6">
                            {cart.map(product => (
                                <div key={product.id} className="flex items-center gap-3 pb-3 border-b">
                                    <div className="h-16 w-16 flex-shrink-0">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-full w-full object-cover rounded-md"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
                                        <p className="text-xs text-gray-500">Qty: {quantities[product.id] || 1}</p>
                                    </div>
                                    <div className="text-sm font-bold">
                                        ৳ {(product.price * (quantities[product.id] || 1)).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span>৳ {calculateSubtotal().toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Delivery Fee</span>
                                <span>৳ {calculateDeliveryFee().toFixed(2)}</span>
                            </div>
                            <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total</span>
                                    <span>৳ {calculateTotal().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handlePlaceOrder}
                            className="btn btn-primary w-full py-3 text-base"
                        >
                            Place Order
                        </button>

                        <div className="mt-4 text-center">
                            <p className="text-xs text-gray-500">
                                By placing your order, you agree to our Terms of Service and Privacy Policy
                            </p>
                        </div>
                    </div>
                </div>
            </div>

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
                            sale_price={product.sale_price}
                            imageUrl={product.imageUrl}
                            tags={product.tags}
                            rating={product.rating}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
} 