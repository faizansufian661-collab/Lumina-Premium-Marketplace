import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white dark:bg-gray-950 pt-20 transition-colors">
        <div className="w-32 h-32 bg-gray-100 dark:bg-gray-900 rounded-full flex items-center justify-center text-gray-300 dark:text-gray-600 mb-8 animate-scale-in">
          <ShoppingBag size={64} />
        </div>
        <h2 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-10 max-w-md text-center text-lg">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/shop">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen pt-32 pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-serif font-bold text-gray-900 dark:text-white mb-10">Shopping Cart</h1>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Cart Items */}
          <div className="flex-1 bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="p-8">
              <div className="space-y-10">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-8 py-8 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0 animate-fade-in">
                    <div className="w-32 h-32 flex-shrink-0 bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Link to={`/product/${item.id}`} className="text-xl font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                            {item.name}
                          </Link>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2 space-y-1">
                            {item.selectedColor && <div className="flex items-center gap-2">Color: <span className="w-4 h-4 rounded-full border border-gray-200 dark:border-gray-700" style={{ backgroundColor: item.selectedColor }}></span></div>}
                            {item.selectedSize && <div>Size: <span className="font-medium text-gray-900 dark:text-gray-300">{item.selectedSize}</span></div>}
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="flex justify-between items-end">
                        <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-gray-900 dark:text-white">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8 sticky top-32">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-8">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-gray-900 dark:text-white font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping Estimate</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax Estimate</span>
                  <span className="text-gray-900 dark:text-white font-medium">${(cartTotal * 0.08).toFixed(2)}</span>
                </div>
                
                <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-3xl font-bold text-primary-600">${(cartTotal * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-8">
                 <input 
                   type="text" 
                   placeholder="Discount code" 
                   className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 mb-3"
                 />
                 <Button variant="outline" fullWidth size="sm" className="dark:text-white dark:border-gray-700 dark:hover:bg-gray-800">Apply Code</Button>
              </div>

              <Button onClick={() => navigate('/checkout')} fullWidth size="lg" className="shadow-xl">
                Proceed to Checkout <ArrowRight size={20} className="ml-2" />
              </Button>
              
              <div className="mt-8 flex flex-col gap-2 items-center">
                 <div className="flex gap-1 text-gray-400 dark:text-gray-600">
                    {/* Mock payment icons */}
                    <div className="w-8 h-5 bg-current rounded-sm opacity-20"></div>
                    <div className="w-8 h-5 bg-current rounded-sm opacity-20"></div>
                    <div className="w-8 h-5 bg-current rounded-sm opacity-20"></div>
                 </div>
                 <div className="text-xs text-gray-400 dark:text-gray-600">
                    Secure Encrypted Checkout
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;