import { useEffect, useState } from 'react';
import { FaArrowLeft, FaBoxOpen, FaCheck, FaExclamationTriangle, FaShippingFast, FaSpinner } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../store/store';

const TrackOrder = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { orders } = useStore();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('TrackOrder - Current orders in store:', orders);
    console.log('TrackOrder - Looking for order ID:', orderId);

    if (orderId) {
      // Try both exact match and case-insensitive match
      const foundOrder = orders.find(o => o.id === orderId || o.id.toString() === orderId);

      if (foundOrder) {
        console.log('TrackOrder - Found order:', foundOrder);
        setOrder(foundOrder);
      } else {
        console.error('TrackOrder - Order not found in store:', orderId);
        console.log('TrackOrder - Available order IDs:', orders.map(o => o.id));
        setError('Order not found. Please check the order ID and try again.');
      }
    } else {
      setError('No order ID provided.');
    }
    setLoading(false);
  }, [orderId, orders]);

  const getStatusPercentage = (status: string) => {
    switch (status) {
      case 'Processing':
        return 25;
      case 'Shipped':
        return 65;
      case 'Delivered':
        return 100;
      default:
        return 0;
    }
  };

  const getEstimatedDelivery = (date: string) => {
    const orderDate = new Date(date);
    const deliveryDate = new Date(orderDate);
    deliveryDate.setDate(orderDate.getDate() + 5); // Assuming 5 days for delivery

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(deliveryDate);
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center">
        <FaSpinner className="animate-spin text-primary h-12 w-12" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <div className="text-center">
            <FaExclamationTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Error Tracking Order</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link to="/orders" className="btn btn-primary">
              Back to My Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <div className="text-center">
            <FaExclamationTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
            <p className="text-gray-600 mb-6">We couldn't find any order with the provided ID.</p>
            <Link to="/orders" className="btn btn-primary">
              Back to My Orders
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/orders" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
            <FaArrowLeft className="mr-2" /> Back to My Orders
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold mb-2">Track Order</h1>
            <div className="flex flex-wrap gap-4">
              <div className="bg-gray-100 px-4 py-2 rounded-md">
                <div className="text-xs text-gray-500">Order ID</div>
                <div className="font-medium">#{orderId?.slice(-6)}</div>
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-md">
                <div className="text-xs text-gray-500">Order Date</div>
                <div className="font-medium">{formatDate(order.date)}</div>
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-md">
                <div className="text-xs text-gray-500">Total Amount</div>
                <div className="font-medium">${order.total.toFixed(2)}</div>
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-md">
                <div className="text-xs text-gray-500">Estimated Delivery</div>
                <div className="font-medium">{getEstimatedDelivery(order.date)}</div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-6">Order Status</h2>

              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary-light">
                      {order.status}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-primary">
                      {getStatusPercentage(order.status)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary-light">
                  <div style={{ width: `${getStatusPercentage(order.status)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"></div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="flex-1 relative mb-8 md:mb-0">
                  <div className="flex items-center mb-2">
                    <div className={`relative z-10 flex items-center justify-center h-10 w-10 rounded-full border-2 ${order.status ? 'border-green-500 bg-green-100' : 'border-gray-300 bg-white'}`}>
                      <FaCheck className="text-green-500" />
                    </div>
                    <div className={`h-1 flex-1 ${order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  </div>
                  <div className="ml-2">
                    <h3 className="font-medium text-sm">Order Confirmed</h3>
                    <p className="text-xs text-gray-500">{formatDate(order.date)}</p>
                  </div>
                </div>

                <div className="flex-1 relative mb-8 md:mb-0">
                  <div className="flex items-center mb-2">
                    <div className={`relative z-10 flex items-center justify-center h-10 w-10 rounded-full border-2 ${order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered' ? 'border-green-500 bg-green-100' : 'border-gray-300 bg-white'}`}>
                      <FaSpinner className={order.status === 'Processing' || order.status === 'Shipped' || order.status === 'Delivered' ? 'text-green-500' : 'text-gray-300'} />
                    </div>
                    <div className={`h-1 flex-1 ${order.status === 'Shipped' || order.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  </div>
                  <div className="ml-2">
                    <h3 className="font-medium text-sm">Processing</h3>
                    <p className="text-xs text-gray-500">Your order is being processed</p>
                  </div>
                </div>

                <div className="flex-1 relative mb-8 md:mb-0">
                  <div className="flex items-center mb-2">
                    <div className={`relative z-10 flex items-center justify-center h-10 w-10 rounded-full border-2 ${order.status === 'Shipped' || order.status === 'Delivered' ? 'border-green-500 bg-green-100' : 'border-gray-300 bg-white'}`}>
                      <FaShippingFast className={order.status === 'Shipped' || order.status === 'Delivered' ? 'text-green-500' : 'text-gray-300'} />
                    </div>
                    <div className={`h-1 flex-1 ${order.status === 'Delivered' ? 'bg-green-500' : 'bg-gray-200'}`}></div>
                  </div>
                  <div className="ml-2">
                    <h3 className="font-medium text-sm">Shipped</h3>
                    <p className="text-xs text-gray-500">Your order is on the way</p>
                  </div>
                </div>

                <div className="flex-1 relative">
                  <div className="flex items-center mb-2">
                    <div className={`relative z-10 flex items-center justify-center h-10 w-10 rounded-full border-2 ${order.status === 'Delivered' ? 'border-green-500 bg-green-100' : 'border-gray-300 bg-white'}`}>
                      <FaBoxOpen className={order.status === 'Delivered' ? 'text-green-500' : 'text-gray-300'} />
                    </div>
                  </div>
                  <div className="ml-2">
                    <h3 className="font-medium text-sm">Delivered</h3>
                    <p className="text-xs text-gray-500">Estimated by {getEstimatedDelivery(order.date)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
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
                    {order.products.map((product: any, index: number) => (
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
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.quantity || 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          ${((product.quantity || 1) * product.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-4">If you have any questions about your order, please contact our customer support.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Email Support</h3>
              <p className="text-sm text-gray-600">support@yourstore.com</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Phone Support</h3>
              <p className="text-sm text-gray-600">+1 (800) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;