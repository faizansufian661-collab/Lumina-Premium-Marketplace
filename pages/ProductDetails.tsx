import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Truck, RotateCcw, Heart, Minus, Plus, Share2 } from 'lucide-react';
import Button from '../components/Button';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../constants';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = PRODUCTS.find(p => p.id === Number(id));

  // If product not found
  if (!product) return <div className="p-20 text-center dark:text-white">Product not found</div>;

  const [mainImage, setMainImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || null);
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor || undefined, selectedSize || undefined);
    navigate('/cart');
  };

  return (
    <div className="pt-32 pb-20 bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          {/* Gallery */}
          <div className="space-y-6">
            <div className="aspect-square bg-gray-100 dark:bg-gray-900 rounded-3xl overflow-hidden cursor-zoom-in relative group border border-gray-200 dark:border-gray-800">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {product.isSale && (
                <span className="absolute top-6 left-6 bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg tracking-wider">
                  SALE
                </span>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${mainImage === img ? 'border-primary-600 ring-2 ring-primary-500/20' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-700'}`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="mb-4 flex items-center gap-4">
               <span className="text-primary-600 dark:text-primary-400 font-bold tracking-widest uppercase text-xs">{product.category}</span>
               {product.isNew && <span className="bg-gray-900 dark:bg-white text-white dark:text-black text-xs font-bold px-2 py-1 rounded">NEW ARRIVAL</span>}
            </div>
            
            <h1 className="text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-6 mb-8">
              <div className="flex text-yellow-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"} 
                    className={i < Math.floor(product.rating) ? "" : "text-gray-300 dark:text-gray-700"}
                  />
                ))}
              </div>
              <span className="text-gray-500 dark:text-gray-400 font-medium border-l border-gray-300 dark:border-gray-700 pl-6">{product.reviews} Verified Reviews</span>
            </div>

            <div className="flex items-baseline gap-6 mb-10">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-2xl text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <div className="w-full h-px bg-gray-200 dark:bg-gray-800 mb-10"></div>

            {/* Colors */}
            {product.colors.length > 0 && (
              <div className="mb-8">
                <span className="block text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">Select Color</span>
                <div className="flex gap-4">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor === color ? 'border-primary-600 scale-110 ring-2 ring-primary-500/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
                    >
                      <div className="w-9 h-9 rounded-full shadow-inner" style={{ backgroundColor: color }}></div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && (
              <div className="mb-10">
                <div className="flex justify-between items-center mb-4">
                  <span className="block text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Select Size</span>
                  <button className="text-sm text-primary-600 dark:text-primary-400 underline decoration-dotted hover:text-primary-700">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[4rem] px-4 py-3 border rounded-xl text-sm font-bold transition-all ${
                        selectedSize === size 
                          ? 'border-primary-600 bg-primary-600 text-white shadow-lg shadow-primary-500/20' 
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary-600 hover:text-primary-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 mb-10">
              <div className="flex items-center bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-5 py-4 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-bold text-gray-900 dark:text-white text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-5 py-4 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              <Button onClick={handleAddToCart} size="lg" className="flex-1 shadow-xl">
                Add to Cart
              </Button>
              <button className="p-4 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-gray-400">
                <Heart size={24} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-primary-600">
                   <Truck size={18} />
                </div>
                <span>Free global delivery<br/>on orders over $150</span>
              </div>
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-primary-600">
                   <RotateCcw size={18} />
                 </div>
                <span>30-day risk-free<br/>return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-16">
          <div className="flex justify-center gap-12 mb-12 border-b border-gray-100 dark:border-gray-800 pb-1">
            {['description', 'specifications', 'reviews'].map(tab => (
               <button
                 key={tab}
                 onClick={() => setActiveTab(tab)}
                 className={`text-lg font-bold capitalize pb-5 border-b-2 transition-all px-6 tracking-wide ${activeTab === tab ? 'border-primary-600 text-gray-900 dark:text-white' : 'border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
               >
                 {tab}
               </button>
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-gray-600 dark:text-gray-300 leading-loose text-lg">
             {activeTab === 'description' && (
               <div className="animate-fade-in space-y-6">
                 <p>{product.description}</p>
                 <p>Crafted with precision and designed for the modern lifestyle, this item represents the pinnacle of Lumina's commitment to quality. Each piece undergoes rigorous testing to ensure durability and performance that exceeds expectations.</p>
               </div>
             )}
             {activeTab === 'specifications' && (
               <div className="animate-fade-in">
                 <ul className="space-y-4">
                   {product.features.map((feature, i) => (
                     <li key={i} className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                       <span className="font-bold text-gray-900 dark:text-white">Feature {i+1}</span>
                       <span>{feature}</span>
                     </li>
                   ))}
                 </ul>
               </div>
             )}
             {activeTab === 'reviews' && (
               <div className="animate-fade-in text-center py-8">
                 <div className="text-6xl font-bold text-gray-900 dark:text-white mb-2">{product.rating}</div>
                 <div className="flex justify-center text-yellow-400 mb-6 gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" size={24} />)}
                 </div>
                 <p className="mb-8">{product.reviews} verified reviews from happy customers</p>
                 <Button variant="outline">Write a Review</Button>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;