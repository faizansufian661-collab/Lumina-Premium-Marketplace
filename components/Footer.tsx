import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, CreditCard } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-900 pt-20 pb-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                  L
                </div>
                <span className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
                  Lumina
                </span>
              </div>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Experience the future of commerce. Premium products, seamless shopping, and world-class service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 dark:hover:text-white transition-all">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-8 tracking-wide uppercase text-sm">Shop</h3>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li><Link to="/shop" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">All Products</Link></li>
              <li><Link to="/shop?sort=new" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">New Arrivals</Link></li>
              <li><Link to="/shop?sort=featured" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Featured</Link></li>
              <li><Link to="/shop?filter=sale" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Sale Collection</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-8 tracking-wide uppercase text-sm">Support</h3>
            <ul className="space-y-4 text-gray-600 dark:text-gray-400">
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-bold text-gray-900 dark:text-white mb-8 tracking-wide uppercase text-sm">Stay in the loop</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:text-white transition-all"
              />
              <button className="w-full px-5 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold hover:bg-primary-600 dark:hover:bg-gray-200 transition-colors shadow-lg">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 dark:text-gray-600 text-sm">© 2025 Lumina Commerce. All rights reserved.</p>
          <div className="flex items-center gap-6 text-gray-400 dark:text-gray-600">
             <span className="flex items-center gap-1 hover:text-gray-600 dark:hover:text-gray-400 transition-colors cursor-pointer"><CreditCard size={18}/> VISA</span>
             <span className="flex items-center gap-1 hover:text-gray-600 dark:hover:text-gray-400 transition-colors cursor-pointer"><CreditCard size={18}/> MC</span>
             <span className="flex items-center gap-1 hover:text-gray-600 dark:hover:text-gray-400 transition-colors cursor-pointer"><CreditCard size={18}/> AMEX</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;