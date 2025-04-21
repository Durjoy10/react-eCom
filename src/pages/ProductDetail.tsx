import { useEffect, useState } from 'react';
import { FaCheck, FaHeart, FaMinus, FaPlus, FaRegHeart, FaShare, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ZoomImage from '../components/ZoomImage';
import { mockProducts } from '../data/mockProducts';
import { useStore } from '../store/store';

export const ProductDetail = () => {
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [isWishlist, setIsWishlist] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [showAllReviews, setShowAllReviews] = useState(false);

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useStore();
  const product = mockProducts.find(p => p.id === id);

  // Find related products
  const relatedProducts = product?.related_ids
    ? mockProducts.filter(p => product.related_ids?.includes(p.id)).slice(0, 4)
    : mockProducts.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  useEffect(() => {
    if (product) {
      // Set default selected image
      setSelectedImage(product.gallery?.[0] || product.image_url);

      // Set default variants if available
      if (product.variants) {
        const defaultColor = product.variants.find(v => v.type === 'color' && v.inStock);
        const defaultSize = product.variants.find(v => v.type === 'size' && v.inStock);

        if (defaultColor) setSelectedColor(defaultColor.id);
        if (defaultSize) setSelectedSize(defaultSize.id);
      }

      // Scroll to top when product changes
      window.scrollTo(0, 0);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
        </div>
      </div>
    );
  }

  const handleBuyNow = () => {
    if (!isVariantsSelected()) {
      toast.error('Please select all options before proceeding');
      return;
    }
    navigate('/checkout', { state: { products: [{ ...product, quantity, selectedColor, selectedSize }] } });
  };

  const handleAddToCart = () => {
    if (!isVariantsSelected()) {
      toast.error('Please select all options before proceeding');
      return;
    }
    addToCart(product, quantity);
    toast.success(`${quantity} ${quantity === 1 ? 'item' : 'items'} added to cart`);
  };

  const isVariantsSelected = () => {
    const hasColors = product.variants?.some(v => v.type === 'color');
    const hasSizes = product.variants?.some(v => v.type === 'size');

    if ((hasColors && !selectedColor) || (hasSizes && !selectedSize)) {
      return false;
    }
    return true;
  };

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
    toast.info(isWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      // Fallback
      navigator.clipboard.writeText(window.location.href);
      toast.info('Link copied to clipboard');
    }
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.comment.trim() === '') {
      toast.error('Please enter your review comment');
      return;
    }

    toast.success('Your review has been submitted');
    setNewReview({ rating: 5, comment: '' });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => {
          if (i < Math.floor(rating)) {
            return <FaStar key={i} className="text-yellow-400 w-4 h-4" />;
          } else if (i === Math.floor(rating) && rating % 1 >= 0.5) {
            return <FaStarHalfAlt key={i} className="text-yellow-400 w-4 h-4" />;
          } else {
            return <FaStar key={i} className="text-gray-300 w-4 h-4" />;
          }
        })}
      </div>
    );
  };

  return (
    <div className="bg-white">
      {/* Breadcrumbs */}
      <nav className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <ol className="flex text-sm">
            <li className="flex items-center">
              <Link to="/" className="text-gray-500 hover:text-primary">Home</Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="flex items-center">
              <Link to="/products" className="text-gray-500 hover:text-primary">Products</Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="flex items-center">
              <Link to={`/category/${product.category.toLowerCase()}`} className="text-gray-500 hover:text-primary">{product.category}</Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
            <li className="text-primary font-medium truncate">{product.name}</li>
          </ol>
        </div>
      </nav>

      {/* Product overview */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product images */}
          <div className="w-full lg:w-1/2">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-2 order-2 md:order-1">
                {product.gallery?.map((image, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 md:w-20 md:h-20 border rounded-md overflow-hidden cursor-pointer transition-all ${selectedImage === image ? 'border-primary' : 'border-gray-200 hover:border-gray-300'}`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Main image with zoom */}
              <div className="flex-1 order-1 md:order-2 h-[300px] sm:h-[400px] md:h-[500px]">
                <ZoomImage
                  src={selectedImage}
                  alt={product.name}
                  zoomLevel={2}
                  className="w-full h-full object-contain rounded-lg overflow-hidden border"
                />
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="w-full lg:w-1/2">
            <div className="mb-2 flex justify-between items-center">
              <div className="flex items-center">
                <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{product.category}</span>
                {product.stock_status === 'in_stock' && (
                  <span className="ml-2 flex items-center text-green-600 text-sm">
                    <FaCheck size={12} className="mr-1" /> In Stock
                  </span>
                )}
                {product.stock_status === 'low_stock' && (
                  <span className="ml-2 text-amber-600 text-sm">Low Stock</span>
                )}
                {product.stock_status === 'out_of_stock' && (
                  <span className="ml-2 text-red-600 text-sm">Out of Stock</span>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={toggleWishlist}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title={isWishlist ? "Remove from wishlist" : "Add to wishlist"}
                >
                  {isWishlist ? <FaHeart className="text-red-500 w-5 h-5" /> : <FaRegHeart className="w-5 h-5" />}
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  title="Share"
                >
                  <FaShare className="w-5 h-5" />
                </button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {renderStars(product.rating)}
                <span className="ml-2 text-sm text-gray-600">{product.rating.toFixed(1)}</span>
              </div>
              {product.reviews && (
                <span className="mx-2 text-gray-400">|</span>
              )}
              {product.reviews && (
                <span className="text-sm text-gray-600">{product.reviews.length} reviews</span>
              )}
            </div>

            <div className="mb-6">
              <div className="flex items-baseline">
                {product.sale_price ? (
                  <>
                    <span className="text-3xl font-bold text-primary">${product.sale_price.toFixed(2)}</span>
                    <span className="ml-2 text-xl text-gray-500 line-through">${product.price.toFixed(2)}</span>
                    <span className="ml-2 bg-red-100 text-red-800 text-sm px-2 py-0.5 rounded">
                      Save {Math.round(((product.price - product.sale_price) / product.price) * 100)}%
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                )}
              </div>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Color variants */}
            {product.variants && product.variants.some(v => v.type === 'color') && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants
                    .filter(v => v.type === 'color')
                    .map(color => (
                      <button
                        key={color.id}
                        type="button"
                        className={`
                          relative h-10 w-10 rounded-full border flex items-center justify-center
                          ${color.inStock ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
                          ${selectedColor === color.id ? 'ring-2 ring-primary ring-offset-2' : 'ring-1 ring-gray-200'}
                        `}
                        style={{ backgroundColor: color.value }}
                        onClick={() => color.inStock && setSelectedColor(color.id)}
                        disabled={!color.inStock}
                        title={color.name}
                      >
                        {!color.inStock && <div className="absolute inset-0 rounded-full bg-white bg-opacity-50" />}
                        {selectedColor === color.id && (
                          <FaCheck className={`h-4 w-4 ${color.value === '#FFFFFF' || color.value === '#FFFFFFF' ? 'text-gray-900' : 'text-white'}`} />
                        )}
                        <span className="sr-only">{color.name}</span>
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Size variants */}
            {product.variants && product.variants.some(v => v.type === 'size') && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <button className="text-sm font-medium text-primary hover:text-primary-dark">Size guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.variants
                    .filter(v => v.type === 'size')
                    .map(size => (
                      <button
                        key={size.id}
                        type="button"
                        className={`
                          px-4 py-2 rounded-md text-sm font-medium
                          ${size.inStock ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'}
                          ${selectedSize === size.id
                            ? 'bg-primary text-white'
                            : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'}
                        `}
                        onClick={() => size.inStock && setSelectedSize(size.id)}
                        disabled={!size.inStock}
                      >
                        {size.name}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Quantity selector */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100"
                >
                  <FaMinus className="h-3 w-3" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="w-16 h-10 border-y border-gray-300 text-center text-gray-900"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100"
                >
                  <FaPlus className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Add to cart and buy now buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary hover:bg-primary-dark text-white py-3 px-6 rounded-md font-medium flex items-center justify-center"
                disabled={product.stock_status === 'out_of_stock'}
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-medium"
                disabled={product.stock_status === 'out_of_stock'}
              >
                Buy Now
              </button>
            </div>

            {/* Product features */}
            {product.features && (
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-base font-medium text-gray-900 mb-4">Key Features</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs section */}
      <div className="border-t border-gray-200 mt-10">
        <div className="container mx-auto px-4">
          <div className="flex border-b border-gray-200 overflow-x-auto">
            <button
              className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === 'description' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            {product.specifications && (
              <button
                className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === 'specifications' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                onClick={() => setActiveTab('specifications')}
              >
                Specifications
              </button>
            )}
            <button
              className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews {product.reviews && `(${product.reviews.length})`}
            </button>
          </div>

          <div className="py-8">
            {/* Description tab */}
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.long_description || product.description}
                </p>
              </div>
            )}

            {/* Specifications tab */}
            {activeTab === 'specifications' && product.specifications && (
              <div className="bg-white rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="border-b border-gray-200 pb-3">
                      <dt className="font-medium text-gray-500">{spec.name}</dt>
                      <dd className="mt-1 text-gray-900">{spec.value}</dd>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews tab */}
            {activeTab === 'reviews' && (
              <div>
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Reviews</h3>

                  {/* Overall rating */}
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <div className="text-5xl font-bold text-gray-900">{product.rating.toFixed(1)}</div>
                      <div className="flex mt-1">{renderStars(product.rating)}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        Based on {product.reviews?.length || 0} reviews
                      </div>
                    </div>

                    {/* Rating bars */}
                    <div className="flex-1 ml-4">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const count = product.reviews?.filter(r => Math.floor(r.rating) === star).length || 0;
                        const percentage = product.reviews?.length
                          ? Math.round((count / product.reviews.length) * 100)
                          : 0;

                        return (
                          <div key={star} className="flex items-center mb-1">
                            <div className="w-10 text-sm text-gray-600">{star} star</div>
                            <div className="w-full h-2 mx-2 bg-gray-200 rounded-full">
                              <div
                                className="h-2 bg-yellow-400 rounded-full"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <div className="w-10 text-xs text-gray-500">{percentage}%</div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Write a review */}
                  <div className="bg-gray-50 p-6 rounded-lg mb-8">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">Write a Review</h4>
                    <form onSubmit={submitReview}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                              key={rating}
                              type="button"
                              className="p-1"
                              onClick={() => setNewReview({ ...newReview, rating })}
                            >
                              <FaStar
                                className={`w-6 h-6 ${rating <= newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                                  }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
                          Your Review
                        </label>
                        <textarea
                          id="review"
                          rows={4}
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                          className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Share your experience with this product..."
                        ></textarea>
                      </div>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark"
                      >
                        Submit Review
                      </button>
                    </form>
                  </div>

                  {/* Reviews list */}
                  {product.reviews && product.reviews.length > 0 ? (
                    <div className="space-y-6">
                      {(showAllReviews ? product.reviews : product.reviews.slice(0, 3)).map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6">
                          <div className="flex items-center mb-2">
                            <h5 className="font-medium text-gray-900 mr-2">{review.user}</h5>
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                              Verified Purchase
                            </span>
                          </div>
                          <div className="flex items-center mb-2">
                            {renderStars(review.rating)}
                            <span className="ml-2 text-sm text-gray-500">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-600">{review.comment}</p>
                          <div className="flex items-center mt-3 text-sm">
                            <button className="text-gray-500 hover:text-gray-700">
                              Helpful ({review.helpful})
                            </button>
                            <span className="mx-2 text-gray-300">|</span>
                            <button className="text-gray-500 hover:text-gray-700">
                              Report
                            </button>
                          </div>
                        </div>
                      ))}

                      {product.reviews.length > 3 && (
                        <div className="text-center">
                          <button
                            onClick={() => setShowAllReviews(!showAllReviews)}
                            className="text-primary font-medium hover:text-primary-dark"
                          >
                            {showAllReviews ? 'Show Less Reviews' : `Show All ${product.reviews.length} Reviews`}
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">This product has no reviews yet. Be the first to review!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-200 bg-gray-50 py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Customers Also Viewed</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative pt-[100%]">
                    <img
                      src={relatedProduct.image_url}
                      alt={relatedProduct.name}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    {relatedProduct.sale_price && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        SALE
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-900 font-medium mb-1 truncate">{relatedProduct.name}</h3>
                    <div className="flex items-center mb-1">
                      {renderStars(relatedProduct.rating)}
                      <span className="ml-1 text-xs text-gray-500">{relatedProduct.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center">
                      {relatedProduct.sale_price ? (
                        <>
                          <span className="font-bold text-primary">${relatedProduct.sale_price.toFixed(2)}</span>
                          <span className="ml-2 text-sm text-gray-500 line-through">${relatedProduct.price.toFixed(2)}</span>
                        </>
                      ) : (
                        <span className="font-bold text-gray-900">${relatedProduct.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;