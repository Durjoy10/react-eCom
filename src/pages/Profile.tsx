import { useEffect, useState } from 'react';

// Placeholder icons (replace with your actual icon components or SVGs)
const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 inline mr-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
);

const LogoutIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 inline mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
    </svg>
);

export const Profile = () => {
    // Expanded user state to match the design
    const initialUserState = {
        username: '',
        email: '',
        phone: '',
        bio: '',
        profileImage: '', // URL or path to image
        address: {
            country: '',
            state: '',
            city: '',
            postalCode: '',
        },
    };

    const [user, setUser] = useState(initialUserState);
    const [updatedUser, setUpdatedUser] = useState(initialUserState);
    const [selectedTab, setSelectedTab] = useState('My Profile'); // Default to 'My Profile'
    const [editingPersonalInfo, setEditingPersonalInfo] = useState(false);
    const [editingAddress, setEditingAddress] = useState(false);

    // Sidebar tabs based on the image
    const sidebarTabs = [
        'My Profile',
        'Account',
        'Chat',
        'Voice and Video',
        'Appearance',
        'Notification',
    ];

    useEffect(() => {
        // Load user data from localStorage - ensure stored data matches the new structure
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                // Merge with initial state to ensure all keys exist, even if not in localStorage
                const fullUser = { ...initialUserState, ...parsedUser, address: { ...initialUserState.address, ...parsedUser.address } };
                setUser(fullUser);
                setUpdatedUser(fullUser); // Initialize updatedUser as well
            } catch (error) {
                console.error("Failed to parse user data from localStorage:", error);
                // Optionally clear corrupted data: localStorage.removeItem('user');
            }
        }
    }, []);

    const handleEdit = (section) => {
        setUpdatedUser(user); // Reset temporary changes when starting edit
        if (section === 'personalInfo') {
            setEditingPersonalInfo(true);
            setEditingAddress(false); // Ensure only one section is editable at a time
        } else if (section === 'address') {
            setEditingAddress(true);
            setEditingPersonalInfo(false);
        }
    };

    const handleSave = (section) => {
        // Basic validation example (optional)
        if (section === 'personalInfo' && !updatedUser.username) {
            alert('User Name cannot be empty');
            return;
        }
        if (section === 'address' && !updatedUser.address.country) {
            alert('Country cannot be empty');
            return;
        }

        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser)); // Save updated user to localStorage
        if (section === 'personalInfo') {
            setEditingPersonalInfo(false);
        } else if (section === 'address') {
            setEditingAddress(false);
        }
    };

    const handleCancel = (section) => {
        setUpdatedUser(user); // Revert changes
        if (section === 'personalInfo') {
            setEditingPersonalInfo(false);
        } else if (section === 'address') {
            setEditingAddress(false);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Handle nested address fields
        if (name.startsWith('address.')) {
            const field = name.split('.')[1];
            setUpdatedUser(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [field]: value,
                },
            }));
        } else {
            setUpdatedUser(prev => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // Placeholder functions for button actions
    const handleChangePicture = () => {
        console.log("Change Picture clicked");
        // Add logic to handle file upload/selection
        alert("Change picture functionality not implemented.");
    };

    const handleDeletePicture = () => {
        console.log("Delete Picture clicked");
        if (window.confirm("Are you sure you want to delete your profile picture?")) {
            // Add logic to remove picture URL/file and update state/localStorage
            setUser(prev => ({ ...prev, profileImage: '' }));
            setUpdatedUser(prev => ({ ...prev, profileImage: '' }));
            localStorage.setItem('user', JSON.stringify({ ...user, profileImage: '' }));
            alert("Profile picture deleted (simulation).");
        }
    };

    const handleLogout = () => {
        console.log("Logout clicked");
        // Add your actual logout logic here (e.g., clear localStorage, redirect)
        localStorage.removeItem('user');
        alert("Logged out (simulation).");
        // window.location.href = '/login'; // Example redirect
    };


    // Render content based on selected tab
    const renderContent = () => {
        switch (selectedTab) {
            case 'My Profile':
                return renderMyProfile();
            case 'Account':
                return <div>Account Settings Content...</div>; // Placeholder
            case 'Chat':
                return <div>Chat Settings Content...</div>; // Placeholder
            case 'Voice and Video':
                return <div>Voice and Video Settings Content...</div>; // Placeholder
            case 'Appearance':
                return <div>Appearance Settings Content...</div>; // Placeholder
            case 'Notification':
                return <div>Notification Settings Content...</div>; // Placeholder
            default:
                return <div>Select a category</div>;
        }
    };

    // Specific rendering function for the 'My Profile' tab content
    const renderMyProfile = () => (
        <div className="space-y-8">
            {/* Profile Picture Section */}
            <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Profile Picture</h3>
                <div className="flex items-center gap-6">
                    <img
                        src={user.profileImage || 'https://via.placeholder.com/100'} // Default placeholder
                        alt="Profile"
                        className="w-20 h-20 rounded-full border object-cover" // Added object-cover
                    />
                    <div className="flex gap-3">
                        <button
                            onClick={handleChangePicture}
                            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Change Picture
                        </button>
                        <button
                            onClick={handleDeletePicture}
                            className="px-4 py-2 bg-white text-gray-700 border border-gray-300 text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Delete Picture
                        </button>
                    </div>
                </div>
            </div>

            {/* Personal Information Section */}
            <div className="border-t border-gray-200 pt-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Personal Information</h3>
                    {!editingPersonalInfo ? (
                        <button
                            onClick={() => handleEdit('personalInfo')}
                            className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-50"
                        >
                            <EditIcon /> Edit
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleSave('personalInfo')}
                                className="px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => handleCancel('personalInfo')}
                                className="px-4 py-1 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
                {editingPersonalInfo ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="firstName">User Name</label>
                            <input type="text" id="firstName" name="firstName" value={updatedUser.username} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="email">Email Address</label>
                            <input type="email" id="email" name="email" value={updatedUser.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="phone">Phone</label>
                            <input type="tel" id="phone" name="phone" value={updatedUser.phone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="bio">Bio</label>
                            <textarea id="bio" name="bio" value={updatedUser.bio} onChange={handleChange} rows="3" className="w-full p-2 border border-gray-300 rounded-md text-sm"></textarea>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-800">
                        <div>
                            <span className="block text-xs font-medium text-gray-500">User Name</span>
                            {user.username || '-'}
                        </div>

                        <div>
                            <span className="block text-xs font-medium text-gray-500">Email Address</span>
                            {user.email || '-'}
                        </div>
                        <div>
                            <span className="block text-xs font-medium text-gray-500">Phone</span>
                            {user.phone || '-'}
                        </div>
                        <div className="md:col-span-2">
                            <span className="block text-xs font-medium text-gray-500">Bio</span>
                            {user.bio || '-'}
                        </div>
                    </div>
                )}

            </div>

            {/* Address Section */}
            <div className="border-t border-gray-200 pt-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Address</h3>
                    {!editingAddress ? (
                        <button
                            onClick={() => handleEdit('address')}
                            className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center border border-gray-300 px-3 py-1 rounded-md hover:bg-gray-50"
                        >
                            <EditIcon /> Edit
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleSave('address')}
                                className="px-4 py-1 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => handleCancel('address')}
                                className="px-4 py-1 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300"
                            >
                                Cancel
                            </button>
                        </div>
                    )}
                </div>
                {editingAddress ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="country">Country</label>
                            <input type="text" id="country" name="address.country" value={updatedUser.address.country} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="state">State</label>
                            <input type="text" id="state" name="address.state" value={updatedUser.address.state} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="city">City</label>
                            <input type="text" id="city" name="address.city" value={updatedUser.address.city} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor="postalCode">Postal Code</label>
                            <input type="text" id="postalCode" name="address.postalCode" value={updatedUser.address.postalCode} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md text-sm" />
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 text-sm text-gray-800">
                        <div>
                            <span className="block text-xs font-medium text-gray-500">Country</span>
                            {user.address.country || '-'}
                        </div>
                        <div>
                            <span className="block text-xs font-medium text-gray-500">State</span>
                            {user.address.state || '-'}
                        </div>
                        <div>
                            <span className="block text-xs font-medium text-gray-500">City</span>
                            {user.address.city || '-'}
                        </div>
                        <div>
                            <span className="block text-xs font-medium text-gray-500">Postal Code</span>
                            {user.address.postalCode || '-'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans"> {/* Changed background and font */}
            {/* Sidebar */}
            <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-8">Account Settings</h2>
                    <nav>
                        <ul>
                            {sidebarTabs.map((tab) => (
                                <li
                                    key={tab}
                                    className={`px-3 py-2.5 mb-1 rounded-md cursor-pointer transition-all text-sm font-medium ${selectedTab === tab
                                        ? 'bg-blue-50 text-blue-700'
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }`}
                                    onClick={() => {
                                        setSelectedTab(tab);
                                        // Reset editing state when switching tabs
                                        setEditingPersonalInfo(false);
                                        setEditingAddress(false);
                                        setUpdatedUser(user); // Revert any non-saved changes
                                    }}
                                >
                                    {tab}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="flex items-center px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md w-full"
                >
                    <LogoutIcon />
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 lg:p-10">
                {/* Removed the extra white card container, content directly on gray bg */}
                {renderContent()}
            </div>
        </div>
    );
};

export default Profile;