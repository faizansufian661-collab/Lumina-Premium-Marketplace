import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary-900/10 dark:hover:shadow-primary-900/20 transition-all duration-500 flex flex-col h-full">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-gray-900 dark:bg-white dark:text-black rounded-full shadow-lg">
            New
          </span>
        )}
        {product.isSale && (
          <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-white bg-red-600 rounded-full shadow-lg">
            Sale
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button className="absolute top-4 right-4 z-10 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-[-10px] group-hover:translate-y-0">
        <Heart size={20} />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="relative block h-80 overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        {/* Quick Add Overlay */}
        <div className="absolute inset-x-4 bottom-4 translate-y-[120%] group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product, 1);
            }}
            className="w-full py-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-gray-900 dark:text-white font-bold rounded-xl shadow-lg hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="text-xs font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-2">{product.category}</div>
        <Link to={`/product/${product.id}`} className="text-xl font-bold font-serif text-gray-900 dark:text-white mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors line-clamp-2">
          {product.name}
        </Link>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="flex text-yellow-400 gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                className={i < Math.floor(product.rating) ? "" : "text-gray-300 dark:text-gray-700"}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">({product.reviews})</span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through decoration-gray-400/50">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;