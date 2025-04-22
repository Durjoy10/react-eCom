import { FaFacebook, FaInstagram, FaPinterest, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Shop Info */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Shop Name</h3>
                        <p className="text-gray-300 mb-4">
                            Your one-stop destination for quality products at affordable prices.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <FaFacebook size={20} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="text-gray-300 hover:text-white transition-colors">
                                <FaPinterest size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Shop Categories */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Categories</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/products?category=Fashion" className="text-gray-300 hover:text-white transition-colors">
                                    Fashion
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?category=Electronics" className="text-gray-300 hover:text-white transition-colors">
                                    Electronics
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?category=Sports" className="text-gray-300 hover:text-white transition-colors">
                                    Sports
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?category=Accessories" className="text-gray-300 hover:text-white transition-colors">
                                    Accessories
                                </Link>
                            </li>
                            <li>
                                <Link to="/products?category=Home%20%26%20Living" className="text-gray-300 hover:text-white transition-colors">
                                    Home & Living
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">
                                    Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/orders" className="text-gray-300 hover:text-white transition-colors">
                                    Orders
                                </Link>
                            </li>
                            <li>
                                <Link to="/wishlist" className="text-gray-300 hover:text-white transition-colors">
                                    Wishlist
                                </Link>
                            </li>
                            <li>
                                <Link to="/profile" className="text-gray-300 hover:text-white transition-colors">
                                    My Account
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Terms and Conditions */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                                    Terms and Conditions
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                                    Shipping and Delivery
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                                    Return Policy
                                </Link>
                            </li>
                            <li>
                                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>


                </div>
            </div>


            {/* Copyright */}
            <div className="bg-gray-950 py-4">
                <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} Shop Name. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 