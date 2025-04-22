import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { categories } from '../data/categories';
import { mockProducts } from '../data/mockProducts';

export const Products = () => {
  const location = useLocation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  // Parse URL params for sorting and category filtering
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get('category');

    if (categoryId) {
      setSelectedCategory(categoryId);
      const categoryName = categories.find(c => c.id === categoryId)?.name;
      setFilteredProducts(mockProducts.filter(product =>
        product.category === categoryName ||
        product.tags?.some(tag => tag.toLowerCase() === categoryName?.toLowerCase())
      ));
    } else {
      setSelectedCategory(null);
      setFilteredProducts(mockProducts);
    }

    // Handle sorting if needed
    const sortParam = params.get('sort');
    if (sortParam === 'popular') {
      setFilteredProducts(prev => [...prev].sort((a, b) => (b.rating || 0) - (a.rating || 0)));
    } else if (sortParam === 'recent') {
      setFilteredProducts(prev => [...prev].sort((a, b) =>
        new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime()
      ));
    }
  }, [location.search]);

  // Handle category selection
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('category', categoryId);
    window.history.pushState({}, '', `${location.pathname}?${newSearchParams.toString()}`);

    const categoryName = categories.find(c => c.id === categoryId)?.name;
    setFilteredProducts(mockProducts.filter(product =>
      product.category === categoryName ||
      product.tags?.some(tag => tag.toLowerCase() === categoryName?.toLowerCase())
    ));
  };

  // Clear category filter
  const clearCategoryFilter = () => {
    setSelectedCategory(null);
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.delete('category');
    window.history.pushState({}, '', `${location.pathname}?${newSearchParams.toString()}`);
    setFilteredProducts(mockProducts);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-[1920px] mx-auto">

        {/* Categories section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-xl md:text-2xl font-bold text-gray-900">Categories</h2>
            {selectedCategory && (
              <button
                onClick={clearCategoryFilter}
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Clear Filter
              </button>
            )}
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 md:gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`transition-all ${selectedCategory === category.id ? 'ring-2 ring-indigo-500 scale-105' : ''}`}
              >
                <CategoryCard
                  id={category.id}
                  name={category.name}
                  image={category.image}
                  description={category.description}
                  onClick={() => handleCategoryClick(category.id)}
                />
              </div>
            ))}
          </div>
        </div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-8">All Products</h1>
        {/* Products grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6">

          {filteredProducts.map((product) => (
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No products found in this category.</p>
            <button
              onClick={clearCategoryFilter}
              className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
