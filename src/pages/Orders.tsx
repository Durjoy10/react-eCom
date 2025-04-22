import { useState } from 'react';
import { FaBoxOpen, FaChevronDown, FaChevronRight, FaEye, FaRegSadTear, FaShippingFast, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useStore } from '../store/store';

const Orders = () => {
    const { orders } = useStore();
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

    const toggleOrderExpansion = (orderId: string) => {
        if (expandedOrderId === orderId) {
            setExpandedOrderId(null);
        } else {
            setExpandedOrderId(orderId);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case 'processing':
            case 'confirmed':
                return <FaSpinner className="text-yellow-500" />;
            case 'shipped':
                return <FaShippingFast className="text-blue-500" />;
            case 'delivered':
                return <FaBoxOpen className="text-green-500" />;
            default:
                return <FaSpinner className="text-gray-500" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'processing':
            case 'confirmed':
                return 'bg-yellow-100 text-yellow-800';
            case 'shipped':
                return 'bg-blue-100 text-blue-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    if (!orders || orders.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">My Orders</h1>
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <div className="flex justify-center mb-4">
                            <FaRegSadTear size={64} className="text-gray-300" />
                        </div>
                        <h2 className="text-2xl font-semibold mb-4">No orders found</h2>
                        <p className="text-gray-600 mb-8">You haven't placed any orders yet.</p>
                        <Link to="/products" className="btn btn-primary">
                            Start Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-16">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">My Orders</h1>

                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div
                                className="p-6 border-b cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => toggleOrderExpansion(order.id)}
                            >
                                <div className="flex flex-col sm:flex-row justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-medium text-gray-500">Order #{order.id.slice(-6)}</span>
                                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm">{formatDate(order.date)}</p>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-4">
                                        <div className="text-right">
                                            <div className="text-gray-600 text-sm">Total Amount</div>
                                            <div className="font-bold text-lg">৳ {order.total.toFixed(2)}</div>
                                        </div>
                                        <div>
                                            {expandedOrderId === order.id ? (
                                                <FaChevronDown className="text-gray-400" />
                                            ) : (
                                                <FaChevronRight className="text-gray-400" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {expandedOrderId === order.id && (
                                <div className="p-6 bg-gray-50">
                                    <div className="mb-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                                            <h3 className="font-medium">Order Status</h3>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-4 md:gap-0">
                                            <div className="flex-1 relative">
                                                <div className="flex items-center mb-2">
                                                    <div className={`relative z-10 flex items-center justify-center h-8 w-8 rounded-full border-2 ${order.status.toLowerCase() === 'processing' || order.status.toLowerCase() === 'confirmed' || order.status.toLowerCase() === 'shipped' || order.status.toLowerCase() === 'delivered' ? 'border-green-500 bg-green-100' : 'border-gray-300 bg-white'}`}>
                                                        <FaSpinner className={order.status.toLowerCase() === 'processing' || order.status.toLowerCase() === 'confirmed' || order.status.toLowerCase() === 'shipped' || order.status.toLowerCase() === 'delivered' ? 'text-green-500' : 'text-gray-300'} />
                                                    </div>
                                                    <div className={`h-1 flex-1 ${order.status.toLowerCase() === 'shipped' || order.status.toLowerCase() === 'delivered' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                                                </div>
                                                <span className="text-xs font-medium">Processing</span>
                                            </div>
                                            <div className="flex-1 relative">
                                                <div className="flex items-center mb-2">
                                                    <div className={`relative z-10 flex items-center justify-center h-8 w-8 rounded-full border-2 ${order.status.toLowerCase() === 'shipped' || order.status.toLowerCase() === 'delivered' ? 'border-green-500 bg-green-100' : 'border-gray-300 bg-white'}`}>
                                                        <FaShippingFast className={order.status.toLowerCase() === 'shipped' || order.status.toLowerCase() === 'delivered' ? 'text-green-500' : 'text-gray-300'} />
                                                    </div>
                                                    <div className={`h-1 flex-1 ${order.status.toLowerCase() === 'delivered' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                                                </div>
                                                <span className="text-xs font-medium">Shipped</span>
                                            </div>
                                            <div className="flex-1 relative">
                                                <div className="flex items-center mb-2">
                                                    <div className={`relative z-10 flex items-center justify-center h-8 w-8 rounded-full border-2 ${order.status.toLowerCase() === 'delivered' ? 'border-green-500 bg-green-100' : 'border-gray-300 bg-white'}`}>
                                                        <FaBoxOpen className={order.status.toLowerCase() === 'delivered' ? 'text-green-500' : 'text-gray-300'} />
                                                    </div>
                                                </div>
                                                <span className="text-xs font-medium">Delivered</span>
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="font-medium mb-4">Order Items ({order.items ? order.items.length : 0})</h3>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-100">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Product
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Price
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Quantity
                                                    </th>
                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        Total
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {order.items && order.items.map((product, index) => (
                                                    <tr key={`${product.id}-${index}`}>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <img className="h-10 w-10 rounded-md object-cover mr-3" src={product.image} alt={product.name} />
                                                                <div className="truncate max-w-xs">
                                                                    <div className="text-sm font-medium text-gray-900 truncate">
                                                                        {product.name}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            ৳ {product.price.toFixed(2)}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            {product.quantity || 1}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            ৳ {((product.quantity || 1) * product.price).toFixed(2)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-6 flex justify-between">
                                        <Link
                                            to={`/track-order/${order.id}`}
                                            className="inline-flex items-center text-sm text-primary hover:text-primary-hover"
                                        >
                                            <FaEye className="mr-1" /> Track Order
                                        </Link>
                                        <div className="text-right">
                                            <div className="text-sm text-gray-600 mb-1">Order Total</div>
                                            <div className="text-lg font-bold">৳ {order.total.toFixed(2)}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;