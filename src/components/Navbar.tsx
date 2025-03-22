import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, Search } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Navbar = () => {
  const { user, signOut } = useAuthStore();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold">ShopHub</span>
          </Link>

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

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/profile" className="text-gray-700 hover:text-indigo-600">
                  <User className="h-6 w-6" />
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-white bg-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};