import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, User, Heart, Package } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left section - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <ShoppingBag className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold">ShopHub</span>
            </Link>
            
            <div className="hidden md:flex space-x-6">
              <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium">
                Home
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-indigo-600 font-medium">
                Products
              </Link>
              <Link to="/track-order" className="text-gray-700 hover:text-indigo-600 font-medium">
                Track Order
              </Link>
              <Link to="/wishlist" className="text-gray-700 hover:text-indigo-600 font-medium">
                Wishlist
              </Link>
            </div>
          </div>

          {/* Middle section - Search */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Right section - Auth */}
          <div className="flex items-center space-x-6">
            <Link to="/wishlist" className="text-gray-700 hover:text-indigo-600">
              <Heart className="h-6 w-6" />
            </Link>
            <Link to="/track-order" className="text-gray-700 hover:text-indigo-600">
              <Package className="h-6 w-6" />
            </Link>
            <Link to="/login" className="flex items-center space-x-1 text-gray-700 hover:text-indigo-600">
              <User className="h-6 w-6" />
              <span className="hidden md:inline font-medium">Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};