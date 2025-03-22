import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, image, description }) => {
  return (
    <Link to={`/category/${id}`} className="group">
      <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="h-48 bg-gray-200">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-0 p-4 text-white">
            <h3 className="text-xl font-semibold mb-1">{name}</h3>
            <p className="text-sm text-gray-200 opacity-90">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}; 