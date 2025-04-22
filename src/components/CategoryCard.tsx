import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  onClick?: () => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, image, description, onClick }) => {
  const cardContent = (
    <div className="category-card">
      <div className="category-image-container">
        <img
          src={image}
          alt={name}
          className="category-image"
        />
      </div>
      <div className="category-overlay">
        <div className="category-content">
          <h3 className="category-name">{name}</h3>
          <p className="category-description">{description}</p>

        </div>
      </div>
    </div>
  );

  if (onClick) {
    return (
      <div onClick={onClick} className="group cursor-pointer">
        {cardContent}
      </div>
    );
  }

  return (
    <Link to={`/category/${id}`} className="group">
      {cardContent}
    </Link>
  );
}; 