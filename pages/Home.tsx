import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Headphones, Zap } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { PRODUCTS, CATEGORIES } from '../constants';

const Home: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 4);
  
  return (
    <div className="animate-fade-in overflow-hidden">
      {/* Immersive Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center bg-gray-950 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-40 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-8 animate-slide-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
               <div className="h-[1px] w-20 bg-primary-500"></div>
               <span className="text-primary-400 font-medium tracking-[0.2em] uppercase text-sm">Future of Commerce</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[0.9] mb-8 tracking-tight animate-slide-up opacity-0" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              Elevate Your <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-500">Reality.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl animate-slide-up opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              Experience a curated collection of ultra-premium goods. 
              Designed for the visionary, built for the bold.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 animate-slide-up opacity-0" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
              <Link to="/shop">
                <Button size="lg" className="w-full sm:w-auto px-10 py-5 text-lg shadow-[0_0_30px_-5px_rgba(124,58,237,0.5)]">
                  Explore Collection
                </Button>
              </Link>
              <Link to="/about">
                 <button className="group flex items-center gap-2 px-8 py-4 text-white hover:text-primary-400 transition-all text-lg font-medium">
                    Our Story <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                 </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee / Brand Trust */}
      <div className="bg-primary-900 border-y border-primary-800 overflow-hidden py-4">
        <div className="flex gap-12 whitespace-nowrap animate-[marquee_20s_linear_infinite] text-primary-200/50 font-bold uppercase tracking-widest text-sm">
           <span>Premium Quality</span> • <span>Global Shipping</span> • <span>24/7 Support</span> • <span>Secure Payment</span> • <span>Lumina Verified</span> •
           <span>Premium Quality</span> • <span>Global Shipping</span> • <span>24/7 Support</span> • <span>Secure Payment</span> • <span>Lumina Verified</span> •
           <span>Premium Quality</span> • <span>Global Shipping</span> • <span>24/7 Support</span> • <span>Secure Payment</span> • <span>Lumina Verified</span>
        </div>
      </div>

      {/* Categories Grid - Lusion Style (Floating Cards) */}
      <section className="py-32 bg-white dark:bg-gray-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
               <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white mb-4">Curated Categories</h2>
               <p className="text-gray-500 dark:text-gray-400 max-w-md">Browse our meticulously organized collections found nowhere else.</p>
            </div>
            <Link to="/shop" className="text-primary-600 dark:text-primary-400 font-bold hover:underline underline-offset-4 flex items-center gap-2">
              View All Categories <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map((cat, idx) => (
              <Link 
                key={cat.id} 
                to={`/shop?category=${cat.name}`}
                className="group relative h-64 rounded-3xl overflow-hidden bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                {/* Mock abstract images for categories */}
                <img 
                   src={`https://source.unsplash.com/random/400x600?${cat.name.toLowerCase().split(' ')[0]}`}
                   alt={cat.name}
                   className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 filter grayscale group-hover:grayscale-0"
                   onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=400&q=80'; }}
                />
                <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                   <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white mb-3 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                     <ArrowRight size={16} />
                   </div>
                   <h3 className="text-lg font-bold text-white tracking-wide">{cat.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Horizontal Scroll / Grid */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <span className="text-primary-600 dark:text-primary-400 font-bold tracking-widest text-xs uppercase mb-2 block">This Week's Highlights</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 dark:text-white">Trending Now</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* High Contrast Promo Section - Fixed Visibility Issue */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-primary-900/20 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-secondary-900/10 blur-[100px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
             <div className="order-2 md:order-1">
                <div className="relative">
                   <div className="absolute -inset-4 bg-gradient-to-r from-primary-600 to-secondary-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                   <img 
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="Exclusive" 
                    className="relative rounded-3xl shadow-2xl z-10 border border-white/10"
                   />
                </div>
             </div>
             <div className="order-1 md:order-2">
                <div className="inline-block px-4 py-2 rounded-full border border-primary-500/50 bg-primary-500/10 text-primary-400 font-bold tracking-wider text-xs uppercase mb-6">
                   Limited Time Offer
                </div>
                <h2 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
                   Unlock 50% Off <br/> Your First Order.
                </h2>
                <p className="text-xl text-gray-400 mb-10 leading-relaxed">
                   Join the elite Lumina community. Premium shopping experience, early access to drops, and concierge service.
                </p>
                <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm mb-10">
                   <p className="text-gray-300 text-sm mb-2 uppercase tracking-wide">Use Code:</p>
                   <div className="text-3xl font-mono text-primary-400 font-bold tracking-widest">WELCOME50</div>
                </div>
                {/* FIXED: High contrast button colors */}
                <Button 
                   className="bg-white text-black hover:bg-gray-200 border-none shadow-[0_0_20px_rgba(255,255,255,0.3)] w-full md:w-auto px-12 py-4 text-lg font-bold"
                   onClick={() => console.log('Shop Sale Clicked')}
                >
                   Shop The Sale
                </Button>
             </div>
          </div>
        </div>
      </section>

       {/* Features / Benefits */}
       <section className="py-24 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
               { icon: Truck, title: "Global Express", desc: "Free shipping on orders over $150. Tracked & insured." },
               { icon: ShieldCheck, title: "Secure Checkout", desc: "Bank-grade encryption for all your transactions." },
               { icon: Headphones, title: "Concierge Support", desc: "24/7 dedicated support for our premium members." }
            ].map((feature, i) => (
               <div key={i} className="group p-8 rounded-3xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 hover:border-primary-500 dark:hover:border-primary-500 transition-all duration-300">
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center mb-6 text-gray-900 dark:text-white shadow-sm group-hover:scale-110 transition-transform">
                     <feature.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{feature.desc}</p>
               </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;