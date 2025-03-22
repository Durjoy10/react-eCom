import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
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
  const isWishlisted = isInWishlist(id);
  const [imageLoading, setImageLoading] = React.useState(true);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation when clicking the heart
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  return (
    <Link to={`/product/${id}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-105">
        <div className="relative">
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <Loader size="small" />
            </div>
          )}
          <img
            src={imageUrl}
            alt={name}
            className={`w-full h-48 object-cover transition-opacity duration-300 ${
              imageLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setImageLoading(false)}
            loading="lazy"
          />
          <button
            onClick={handleWishlistClick}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors duration-200"
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={`h-5 w-5 transition-colors duration-200 ${
                isWishlisted ? 'fill-red-500 stroke-red-500' : 'stroke-gray-600'
              }`}
            />
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{name}</h3>
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
});