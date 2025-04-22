import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { CategoryCard } from '../components/CategoryCard';
import { Loader } from '../components/Loader';
import { ProductCard } from '../components/ProductCard';
import Showcase1 from '../components/Showcase/Showcase1';
import { categories } from '../data/categories';
import { mockProducts } from '../data/mockProducts';

const ProductSection = ({ title, products, linkText, linkTo }: {
  title: string;
  products: typeof mockProducts;
  linkText: string;
  linkTo: string;
}) => (
  <div className="mb-16">
    <div className="flex justify-between items-center mb-8">
      <h2 className="font-display text-base text-2xl md:text-3xl font-bold text-gray-900">{title}</h2>
      <Link
        to={linkTo}
        className="flex items-center text-base text-indigo-600 hover:text-indigo-700 font-medium"
      >
        {linkText}
        <FaArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-4">
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
  </div>
);

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reduced loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Get first 6 categories for display
  const displayedCategories = categories.slice(0, 6);

  // Get different product sections
  const featuredProducts = mockProducts.slice(0, 5);
  const popularProducts = [...mockProducts]
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 5);
  const recentProducts = [...mockProducts]
    .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
    .slice(0, 5);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <Loader size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-[1920px] mx-auto">
        <Showcase1 />

        {/* Categories Section */}
        <div className="category-section">
          <div className="category-header">
            <h2 className="category-title">Shop by Category</h2>
            <Link
              to="/products"
              className="category-link group"
            >
              <span>View All</span>
              <FaArrowRight className="category-arrow" />
            </Link>
          </div>
          <div className="category-grid">
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
          linkText="View All"
          linkTo="/products"
        />

        {/* Popular Products Section */}
        <ProductSection
          title="Popular Products"
          products={popularProducts}
          linkText="View All"
          linkTo="/products?sort=popular"
        />

        {/* Recent Products Section */}
        <ProductSection
          title="New Arrivals"
          products={recentProducts}
          linkText="View All"
          linkTo="/products?sort=recent"
        />
      </div>
    </div>
  );
};

// Default export for lazy loading
export default Home;