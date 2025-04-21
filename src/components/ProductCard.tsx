import React, { memo, useState } from 'react';
import { FaEye, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useStore } from '../store/store';
import { useWishlistStore } from '../store/wishlistStore';
import { Loader } from './Loader';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  tags: string[];
}

export const ProductCard: React.FC<ProductCardProps> = memo(({ id, name, price, imageUrl, tags }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const { addToCart } = useStore();
  const isWishlisted = isInWishlist(id);
  const [imageLoading, setImageLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, name, price, image: imageUrl });
  };

  return (
    <Link to={`/product/${id}`} className="product-card group">
      <div className="relative overflow-hidden">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <Loader size="small" />
          </div>
        )}
        <img
          src={imageUrl}
          alt={name}
          className={`product-image ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setImageLoading(false)}
          loading="lazy"
        />

        {/* Quick Actions */}
        <div
          className={`absolute inset-0 bg-black/20 flex items-center justify-center gap-4 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <button
            onClick={handleAddToCart}
            className="bg-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-200"
            title="Add to Cart"
          >
            <FaShoppingCart className="text-gray-700" />
          </button>
          <button
            onClick={handleWishlistClick}
            className="bg-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-200"
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <FaHeart className={isWishlisted ? 'text-red-500' : 'text-gray-700'} />
          </button>
          <Link
            to={`/product/${id}`}
            className="bg-white p-3 rounded-full shadow-lg transform hover:scale-110 transition-transform duration-200"
            title="View Details"
          >
            <FaEye className="text-gray-700" />
          </Link>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{name}</h3>
        <p className="text-xl font-bold text-primary mb-3">${price.toFixed(2)}</p>
        <div className="flex flex-wrap gap-2">
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
    </Link>
  );
});