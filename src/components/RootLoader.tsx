import React from 'react';
import { Loader } from './Loader';

export const RootLoader = () => {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="text-center">
        <Loader size="large" className="mb-4" />
        <p className="text-gray-600 animate-pulse">Loading your shopping experience...</p>
      </div>
    </div>
  );
}; 