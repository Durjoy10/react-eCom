import React from 'react';
import { useParams } from 'react-router-dom';
import { useProductStore } from '../store/productStore';

export const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProductStore();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-3xl font-bold text-indigo-600 mb-6">
            ${product.price.toFixed(2)}
          </p>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};