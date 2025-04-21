import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router-dom';
import { mockProducts } from '../data/mockProducts';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    tags: string[];
    image_url: string;
    rating: number;
}

export default function Search() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        // Simulate API fetch delay
        const timer = setTimeout(() => {
            const results = mockProducts.filter(product =>
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase()) ||
                product.category.toLowerCase().includes(query.toLowerCase()) ||
                product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
            );

            setProducts(results);
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    const renderNoResults = () => (
        <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
                <FaSearch className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No results found</h2>
            <p className="text-gray-600 mb-6">
                We couldn't find any products matching "{query}"
            </p>
            <Link to="/products" className="btn btn-primary">
                Browse All Products
            </Link>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Search Results</h1>
                <p className="text-gray-600">
                    {products.length} {products.length === 1 ? 'result' : 'results'} for "{query}"
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center items-center py-16">
                    <div className="spinner-border text-primary" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            ) : products.length === 0 ? (
                renderNoResults()
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <Link
                            to={`/product/${product.id}`}
                            key={product.id}
                            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-1 text-gray-900 truncate">{product.name}</h3>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500 text-sm">{product.category}</span>
                                    <span className="text-primary font-bold">${product.price.toFixed(2)}</span>
                                </div>
                                <p className="mt-2 text-gray-600 text-sm line-clamp-2">{product.description}</p>
                                <div className="mt-3 flex justify-between items-center">
                                    <div className="flex items-center">
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <svg
                                                    key={i}
                                                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            ))}
                                        </div>
                                        <span className="text-xs text-gray-500 ml-1">
                                            {product.rating.toFixed(1)}
                                        </span>
                                    </div>
                                    <button className="text-primary hover:text-primary-dark text-sm font-medium">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
} 