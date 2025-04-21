import React, { useState } from 'react';
import { FaCamera, FaEdit, FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/authStore';

const Profile = () => {
    const { user, updateProfile } = useAuthStore();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
    });

    if (!user) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-center">
                    <h2 className="text-2xl font-bold">Please login to view your profile</h2>
                </div>
            </div>
        );
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateProfile({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
        });
        setIsEditing(false);
        toast.success('Profile updated successfully!');
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto bg-white rounded-lg shadow overflow-hidden">
                <div className="bg-gradient-to-r from-primary to-secondary h-40 relative">
                    <div className="absolute -bottom-12 left-8">
                        <div className="relative">
                            <img
                                src={user.avatar || `https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&size=150`}
                                alt={user.name}
                                className="w-24 h-24 rounded-full border-4 border-white"
                            />
                            <button className="absolute bottom-0 right-0 bg-white p-1.5 rounded-full shadow-md">
                                <FaCamera className="text-gray-500" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="pt-16 px-8 pb-8">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="flex items-center gap-2 text-sm text-primary hover:text-primary-hover transition-colors"
                        >
                            {isEditing ? (
                                <>
                                    <FaSave />
                                    Cancel
                                </>
                            ) : (
                                <>
                                    <FaEdit />
                                    Edit Profile
                                </>
                            )}
                        </button>
                    </div>

                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div className="form-group">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="input"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="input"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="input"
                                    />
                                </div>

                                <div className="flex justify-end mt-6">
                                    <button
                                        type="button"
                                        onClick={() => setIsEditing(false)}
                                        className="btn btn-outline mr-3"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Personal Information</h3>
                                    <div className="mt-3 space-y-3">
                                        <div>
                                            <p className="text-xs text-gray-500">Full Name</p>
                                            <p className="text-sm font-medium">{user.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Email Address</p>
                                            <p className="text-sm font-medium">{user.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Phone Number</p>
                                            <p className="text-sm font-medium">{user.phone || 'Not provided'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-gray-500">Account Information</h3>
                                    <div className="mt-3 space-y-3">
                                        <div>
                                            <p className="text-xs text-gray-500">User ID</p>
                                            <p className="text-sm font-medium">{user.id}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Account Status</p>
                                            <p className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Active
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t pt-6">
                                <h3 className="text-sm font-medium text-gray-500 mb-3">Recent Activity</h3>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600">Your recent activity will appear here.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;