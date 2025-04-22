import React, { memo, useState } from 'react';
import { FaHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/store';
import { useWishlistStore } from '../store/wishlistStore';
import { Loader } from './Loader';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  tags: string[];
  rating?: number;
  sale_price?: number;
}

export const ProductCard: React.FC<ProductCardProps> = memo(({
  id,
  name,
  price,
  imageUrl,
  tags,
  rating = 5,
  sale_price
}) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const { addToCart } = useStore();
  const navigate = useNavigate();
  const isWishlisted = isInWishlist(id);
  const [imageLoading, setImageLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const hasDiscount = sale_price !== undefined && sale_price < price;
  const discountPercentage = hasDiscount ? Math.round((1 - sale_price / price) * 100) : 0;
  const displayPrice = hasDiscount ? sale_price : price;

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price: displayPrice, image: imageUrl });
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price: displayPrice, image: imageUrl });
    navigate('/checkout');
  };

  return (
    <div
      className="rounded-xl bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product ID at top right */}
      <div className="relative">
        <div className="absolute top-2 right-2 text-xs text-gray-500 bg-white/80 px-1.5 py-0.5 rounded-md z-10">
          id: {id}
        </div>

        {/* Sale Tag */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-md z-10">
            SALE
          </div>
        )}

        {/* Image Container */}
        <div className="relative overflow-hidden" style={{ aspectRatio: '1/1' }}>
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <Loader size="small" />
            </div>
          )}
          <Link to={`/product/${id}`}>
            <img
              src={imageUrl}
              alt={name}
              className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${imageLoading ? 'opacity-0' : 'opacity-100'
                }`}
              onLoad={() => setImageLoading(false)}
              loading="lazy"
            />
          </Link>

          {/* Action Buttons - Only visible on hover */}
          <div
            className={`absolute right-3 top-10 flex flex-col gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <button
              onClick={handleWishlistClick}
              className="bg-white w-9 h-9 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <FaHeart className={isWishlisted ? 'text-red-500' : 'text-gray-400'} size={18} />
            </button>
            <button
              onClick={handleAddToCart}
              className="bg-white w-9 h-9 rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Add to cart"
            >
              <FaShoppingCart className="text-gray-700" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-2 md:p-3 flex-grow flex flex-col">
        {/* Product Name */}
        <Link to={`/product/${id}`} className="flex-grow">
          <h3 className="font-sans font-semibold text-gray-800 mb-1 line-clamp-2 hover:text-blue-600 transition-colors text-sm md:text-base">
            {name}
          </h3>
        </Link>

        {/* Ratings */}
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'} size={12} />
            ))}
          </div>
          <span className="text-gray-500 ml-1 md:ml-2 text-xs">{Math.floor(Math.random() * 100) + 1}</span>
        </div>

        {/* Price */}
        <div className="flex flex-wrap items-center gap-1 md:gap-2 mb-3">
          {hasDiscount && (
            <>
              <div className="flex items-center flex-wrap">
                <span className="product-original-price text-gray-500 line-through text-xs md:text-sm mr-1 md:mr-2">${price.toFixed(2)}</span>
                <span className="product-discount-badge bg-blue-100 text-blue-700 text-xs font-medium px-1.5 py-0.5 rounded">
                  -{discountPercentage}%
                </span>
              </div>
              <div className="w-full mt-1"></div>
            </>
          )}
          <span className="product-price text-base md:text-lg font-bold text-gray-900">${displayPrice.toFixed(2)}</span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleBuyNow}
          className="product-buy-button w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 md:py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
        >
          <FaShoppingCart size={14} />
          <span className="text-xs md:text-sm">Buy Now</span>
        </button>
      </div>
    </div>
  );
});

export default ProductCard;