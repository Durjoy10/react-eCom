import { useEffect, useState } from 'react';
import { BsBox, BsCheckCircleFill, BsTruck } from 'react-icons/bs';
import { FaShippingFast, FaSpinner } from 'react-icons/fa';
import { MdDeliveryDining } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../store/store';
import '../styles/TrackOrder.css';

const TrackOrder = () => {
  const { orderId } = useParams();
  const { orders } = useStore();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      // Find the order directly from the orders array
      const foundOrder = orders.find(o => o.id === orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      }
      setLoading(false);
    }
  }, [orderId, orders]);

  if (loading) {
    return (
      <div className="track-order-loading">
        <FaSpinner className="spinner" />
        <p>Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="track-order-not-found">
        <h2>Order Not Found</h2>
        <p>We couldn't find an order with ID: {orderId}</p>
        <Link to="/shop" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  // Get current step based on status
  const getStepFromStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case 'processing': return 1;
      case 'confirmed': return 2;
      case 'shipped': return 3;
      case 'out-for-delivery': return 4;
      case 'delivered': return 5;
      default: return 1;
    }
  };

  const currentStep = getStepFromStatus(order.status);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get delivery options details
  const getDeliveryDetails = (option: string) => {
    switch (option) {
      case 'standard':
        return { label: 'Standard Delivery', time: '3-5 days' };
      case 'express':
        return { label: 'Express Delivery', time: '1-2 days' };
      case 'same-day':
        return { label: 'Same Day Delivery', time: 'Today' };
      default:
        return { label: 'Standard Delivery', time: '3-5 days' };
    }
  };

  // Get payment method details
  const getPaymentDetails = (method: string) => {
    switch (method) {
      case 'cash':
        return { id: 'cash', label: 'Cash on Delivery' };
      case 'bkash':
        return { id: 'bkash', label: 'bKash' };
      case 'nagad':
        return { id: 'nagad', label: 'Nagad' };
      case 'card':
        return { id: 'card', label: 'Credit/Debit Card' };
      default:
        return { id: 'cash', label: 'Cash on Delivery' };
    }
  };

  const deliveryDetails = getDeliveryDetails(order.deliveryOption || 'standard');
  const paymentDetails = getPaymentDetails(order.paymentMethod || 'cash');

  return (
    <div className="track-order-container">
      <div className="track-order-header">
        <h1>Track Your Order</h1>
        <div className="order-basic-info">
          <p>Order ID: <span>{orderId}</span></p>
          <p>Order Date: <span>{formatDate(order.date)}</span></p>
        </div>
      </div>

      {/* Tracking Timeline */}
      <div className="tracking-timeline">
        <div className="timeline-container">
          <div className="timeline-progress" style={{ width: `${(currentStep - 1) * 25}%` }}></div>

          <div className={`timeline-step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
            <div className="step-icon">
              <BsCheckCircleFill />
            </div>
            <div className="step-label">Processing</div>
          </div>

          <div className={`timeline-step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
            <div className="step-icon">
              <BsBox />
            </div>
            <div className="step-label">Confirmed</div>
          </div>

          <div className={`timeline-step ${currentStep >= 3 ? 'active' : ''} ${currentStep > 3 ? 'completed' : ''}`}>
            <div className="step-icon">
              <FaShippingFast />
            </div>
            <div className="step-label">Shipped</div>
          </div>

          <div className={`timeline-step ${currentStep >= 4 ? 'active' : ''} ${currentStep > 4 ? 'completed' : ''}`}>
            <div className="step-icon">
              <BsTruck />
            </div>
            <div className="step-label">Out for Delivery</div>
          </div>

          <div className={`timeline-step ${currentStep >= 5 ? 'active' : ''}`}>
            <div className="step-icon">
              <MdDeliveryDining />
            </div>
            <div className="step-label">Delivered</div>
          </div>
        </div>
      </div>

      <div className="track-order-details">
        {order.customerInfo && (
          <div className="order-info-section">
            <h2>Customer Information</h2>
            <div className="customer-info">
              <div className="info-item">
                <p className="info-label">Name:</p>
                <p className="info-value">{order.customerInfo.firstName} {order.customerInfo.lastName}</p>
              </div>
              <div className="info-item">
                <p className="info-label">Email:</p>
                <p className="info-value">{order.customerInfo.email}</p>
              </div>
              <div className="info-item">
                <p className="info-label">Phone:</p>
                <p className="info-value">{order.customerInfo.phone}</p>
              </div>
              <div className="info-item">
                <p className="info-label">District:</p>
                <p className="info-value">{order.customerInfo.district}</p>
              </div>
              <div className="info-item">
                <p className="info-label">Address:</p>
                <p className="info-value">{order.customerInfo.address}</p>
              </div>
            </div>
          </div>
        )}

        <div className="order-info-section">
          <h2>Delivery Information</h2>
          <div className="delivery-info">
            <div className="info-item">
              <p className="info-label">Delivery Method:</p>
              <p className="info-value">{deliveryDetails.label}</p>
            </div>
            <div className="info-item">
              <p className="info-label">Estimated Delivery:</p>
              <p className="info-value">{deliveryDetails.time}</p>
            </div>
            <div className="info-item">
              <p className="info-label">Delivery Fee:</p>
              <p className="info-value">৳{order.deliveryFee}</p>
            </div>
          </div>
        </div>

        <div className="order-info-section">
          <h2>Payment Information</h2>
          <div className="payment-info">
            <div className="info-item">
              <p className="info-label">Payment Method:</p>
              <p className="info-value">{paymentDetails.label}</p>
            </div>
            <div className="info-item">
              <p className="info-label">Payment Status:</p>
              <p className="info-value payment-status">
                {paymentDetails.id === 'cash' ? 'Pay on Delivery' : 'Paid'}
              </p>
            </div>
          </div>
        </div>

        <div className="order-info-section">
          <h2>Order Summary</h2>
          <div className="order-items">
            {order.items.map((item: any) => (
              <div className="order-item" key={item.id}>
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-price">৳{item.price}</p>
                  <p className="item-quantity">Quantity: {item.quantity}</p>
                </div>
                <div className="item-total">
                  <p>৳{item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-summary">
            <div className="summary-row">
              <p>Subtotal:</p>
              <p>৳{order.subtotal}</p>
            </div>
            <div className="summary-row">
              <p>Delivery Fee:</p>
              <p>৳{order.deliveryFee}</p>
            </div>
            <div className="summary-row total">
              <p>Total:</p>
              <p>৳{order.total}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="track-order-actions">
        <Link to="/shop" className="btn-secondary">Continue Shopping</Link>
        <button className="btn-primary">Need Help?</button>
      </div>
    </div>
  );
};

export default TrackOrder;