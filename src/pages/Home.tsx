import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { categories } from '../data/categories';
import { mockProducts } from '../data/mockProducts';
import { ArrowRight } from 'lucide-react';
import { Loader } from '../components/Loader';
import Showcase1 from '../components/Showcase/Showcase1';

const ProductSection = ({ title, products, linkText, linkTo }: {
  title: string;
  products: typeof mockProducts;
  linkText: string;
  linkTo: string;
}) => (
  <div className="mb-16">
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      <Link
        to={linkTo}
        className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
      >
        {linkText}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          imageUrl={product.image_url}
          tags={product.tags}
        />
      ))}
    </div>
  </div>
);

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Get first 6 categories for display
  const displayedCategories = categories.slice(0, 6);
  
  // Get different product sections
  const featuredProducts = mockProducts.slice(0, 4);
  const popularProducts = [...mockProducts]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);
  const recentProducts = [...mockProducts]
    .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
    .slice(0, 4);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Showcase1 />
      
      {/* Categories Section */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
          <Link
            to="/categories"
            className="flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
          >
            View All Categories
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCategories.map((category) => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              image={category.image}
              description={category.description}
            />
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <ProductSection
        title="Featured Products"
        products={featuredProducts}
        linkText="View All Products"
        linkTo="/products"
      />

      {/* Popular Products Section */}
      <ProductSection
        title="Popular Products"
        products={popularProducts}
        linkText="View All Popular"
        linkTo="/products?sort=popular"
      />

      {/* Recent Products Section */}
      <ProductSection
        title="New Arrivals"
        products={recentProducts}
        linkText="View All New Arrivals"
        linkTo="/products?sort=recent"
      />
    </div>
  );
};

// Default export for lazy loading
export default Home;