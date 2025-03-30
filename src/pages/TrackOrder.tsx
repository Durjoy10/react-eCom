import React, { useState } from 'react';

export const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order tracking logic here
    console.log('Tracking order:', orderNumber);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Track Your Order</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">
              Order Number
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="orderNumber"
                name="orderNumber"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your order number"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Track Order
          </button>
        </form>

        <div className="mt-8">
          <p className="text-sm text-gray-600 text-center">
            Can't find your order number?<br />
            Please check your email for the order confirmation.
          </p>
        </div>
      </div>
    </div>
  );
}; 

export default TrackOrder;