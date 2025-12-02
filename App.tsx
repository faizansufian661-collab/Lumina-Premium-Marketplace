import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import LoadingScreen from './components/LoadingScreen';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <LoadingScreen />
          <HashRouter>
            <ScrollToTop />
            <div className="flex flex-col min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-300">
              <Navbar />
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  {/* Fallback for 404 */}
                  <Route path="*" element={<div className="p-40 text-center text-xl dark:text-white">404 - Page Not Found</div>} />
                </Routes>
              </div>
              <Footer />
            </div>
          </HashRouter>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;