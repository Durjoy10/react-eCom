import React from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { mockProducts } from '../data/mockProducts';
import { categories } from '../data/categories';

export const CategoryProducts = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the category
  const category = categories.find(cat => cat.id === id);
  
  // Filter products by category name
  const categoryProducts = mockProducts.filter(product => 
    product.category.toLowerCase() === category?.name.toLowerCase()
  );

  if (!category) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900">Category not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
        <p className="mt-2 text-gray-600">{category.description}</p>
      </div>

      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
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
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-900">No products found</h3>
          <p className="mt-2 text-gray-500">
            We couldn't find any products in this category.
          </p>
        </div>
      )}
    </div>
  );
}; 