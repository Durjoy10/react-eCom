import React, { Suspense } from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { ProductCard } from '../components/ProductCard';
import { mockProducts } from '../data/mockProducts';
import { useWishlistStore } from '../store/wishlistStore';

const ProductGrid = ({ products }: { products: typeof mockProducts }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    {products.map((product) => (
      <ProductCard
        key={product.id}
        id={product.id}
        name={product.name}
        price={product.price}
        sale_price={product.sale_price}
        imageUrl={product.image_url}
        tags={product.tags}
        rating={product.rating}
      />
    ))}
  </div>
);

export const Wishlist = () => {
  const { items } = useWishlistStore();
  const [isLoading, setIsLoading] = React.useState(true);

  // Simulate loading time
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Get wishlisted products from mock products
  const wishlistProducts = mockProducts.filter(product => items.includes(product.id));

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

      {wishlistProducts.length > 0 ? (
        <Suspense fallback={<Loader size="large" className="min-h-[400px]" />}>
          <ProductGrid products={wishlistProducts} />
        </Suspense>
      ) : (
        <div className="text-center py-12">
          <FaShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Your wishlist is empty</h3>
          <p className="mt-1 text-sm text-gray-500">
            Start adding some items to your wishlist!
          </p>
          <div className="mt-6">
            <Link
              to="/products"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Browse Products
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;