import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const Profile = () => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-gray-900">{user.email}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Member Since</label>
            <p className="mt-1 text-gray-900">
              {new Date(user.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};