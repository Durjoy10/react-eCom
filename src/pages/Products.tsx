import React from 'react';
import { mockProducts } from '../data/mockProducts';
import { ProductCard } from '../components/ProductCard';

export const Products = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockProducts.map((product) => (
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
}; 

export default Products;
