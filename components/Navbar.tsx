import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User as UserIcon, LogOut, Sun, Moon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { CATEGORIES } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  const getHeaderStyles = () => {
    if (isScrolled) return 'bg-white/90 dark:bg-black/90 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-800 py-3';
    if (isHome) return 'bg-transparent py-6'; 
    return 'bg-white/50 dark:bg-black/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 py-4';
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderStyles()}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group relative z-50">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-primary-500/50 transition-all duration-300">
                L
              </div>
              <span className={`text-2xl font-serif font-bold tracking-tight ${isHome && !isScrolled ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                Lumina
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {['Home', 'Shop', 'About'].map((item) => (
                <Link
                  key={item}
                  to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={`text-sm font-medium tracking-wide uppercase hover:text-primary-500 transition-colors ${
                    isHome && !isScrolled ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item}
                </Link>
              ))}
            </div>

            {/* Icons / Actions */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Search Bar */}
              <div className={`relative flex items-center transition-all duration-300 ${isSearchOpen ? 'w-64' : 'w-8'}`}>
                 {isSearchOpen ? (
                    <form onSubmit={handleSearch} className="w-full relative">
                       <input 
                         autoFocus
                         type="text"
                         placeholder="Search..."
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         onBlur={() => !searchQuery && setIsSearchOpen(false)}
                         className="w-full bg-gray-100 dark:bg-gray-800 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                       />
                       <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary-500">
                         <Search size={16} />
                       </button>
                    </form>
                 ) : (
                    <button 
                      onClick={() => setIsSearchOpen(true)}
                      className={`transition-colors ${isHome && !isScrolled ? 'text-white hover:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600'}`}
                    >
                      <Search size={20} />
                    </button>
                 )}
              </div>

              <button onClick={toggleTheme} className={`transition-colors ${isHome && !isScrolled ? 'text-white hover:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600'}`}>
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <Link to="/cart" className={`relative transition-colors ${isHome && !isScrolled ? 'text-white hover:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600'}`}>
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </Link>
              
              {isAuthenticated ? (
                <div className="relative group">
                  <button className={`flex items-center gap-2 ${isHome && !isScrolled ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                    <UserIcon size={20} />
                    <span className="text-sm font-medium max-w-[80px] truncate">{user?.name}</span>
                  </button>
                  <div className="absolute top-full right-0 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 p-2 w-48">
                      <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-800 mb-2">
                        <p className="text-xs text-gray-500">Signed in as</p>
                        <p className="font-bold text-gray-900 dark:text-white truncate">{user?.email}</p>
                      </div>
                      <button 
                        onClick={logout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors text-sm"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                 <Link to="/login">
                    <button className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${isHome && !isScrolled ? 'bg-white text-black hover:bg-gray-100' : 'bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/30'}`}>
                      Sign In
                    </button>
                 </Link>
              )}
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden flex items-center gap-4 z-50">
               <Link to="/cart" className={`relative ${isHome && !isScrolled && !isMobileMenuOpen ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`${isHome && !isScrolled && !isMobileMenuOpen ? 'text-white' : 'text-gray-900 dark:text-white'} transition-colors`}
              >
                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-white dark:bg-black transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="flex flex-col h-full pt-24 px-6 pb-8 overflow-y-auto">
          <form onSubmit={(e) => { handleSearch(e); setIsMobileMenuOpen(false); }} className="mb-8">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search products..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-100 dark:bg-gray-900 px-6 py-4 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
              />
              <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-600">
                <Search size={24} />
              </button>
            </div>
          </form>

          <div className="space-y-6 flex-1">
             <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="block text-4xl font-serif font-bold text-gray-900 dark:text-white hover:text-primary-600">Home</Link>
             <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block text-4xl font-serif font-bold text-gray-900 dark:text-white hover:text-primary-600">Shop</Link>
             <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block text-4xl font-serif font-bold text-gray-900 dark:text-white hover:text-primary-600">About Us</Link>
             
             <div className="h-px bg-gray-100 dark:bg-gray-800 my-6"></div>
             
             <div className="grid grid-cols-2 gap-4">
                {CATEGORIES.map(cat => (
                  <Link key={cat.id} to={`/shop?category=${cat.name}`} onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 dark:text-gray-400 font-medium">
                    {cat.name}
                  </Link>
                ))}
             </div>
          </div>

          <div className="mt-8">
            {isAuthenticated ? (
               <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full py-4 bg-red-500/10 text-red-500 rounded-xl font-bold flex items-center justify-center gap-2">
                 <LogOut size={20} /> Sign Out ({user?.name})
               </button>
            ) : (
               <div className="flex gap-4">
                 <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 py-4 text-center border border-gray-200 dark:border-gray-800 rounded-xl font-bold text-gray-900 dark:text-white">Log In</Link>
                 <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 py-4 text-center bg-primary-600 text-white rounded-xl font-bold">Sign Up</Link>
               </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;