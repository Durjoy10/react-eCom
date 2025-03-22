import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../store/productStore';
import { ProductCard } from '../components/ProductCard';

export const Home = () => {
  const { products, loading, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = [...new Set(products.map(product => product.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : (
        <>
          {categories.map((category) => (
            <div key={category} className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{category}</h2>
                <Link
                  to={`/category/${category}`}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products
                  .filter(product => product.category === category)
                  .slice(0, 4)
                  .map((product) => (
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
          ))}
        </>
      )}
    </div>
  );
};