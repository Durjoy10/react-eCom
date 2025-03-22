import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  tags: string[];
}

export const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, imageUrl, tags }) => {
  return (
    <Link to={`/product/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{name}</h3>
          <p className="text-xl font-bold text-indigo-600">${price.toFixed(2)}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};