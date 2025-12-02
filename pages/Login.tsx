import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
       // Extract name from email for demo
       const name = email.split('@')[0];
       login(email, name);
       navigate('/');
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-black transition-colors px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 animate-scale-in">
        <div className="text-center mb-8">
           <div className="w-16 h-16 bg-primary-600 rounded-xl mx-auto flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg shadow-primary-500/40">L</div>
           <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Welcome Back</h1>
           <p className="text-gray-500 dark:text-gray-400 mt-2">Sign in to access your premium account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
           <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                 <input 
                   type="email" 
                   required
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                   placeholder="you@example.com" 
                 />
              </div>
           </div>
           
           <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <div className="relative">
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                 <input 
                   type="password" 
                   required
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                   placeholder="••••••••" 
                 />
              </div>
           </div>

           <Button fullWidth size="lg" className="shadow-xl shadow-primary-500/20">
             Sign In <ArrowRight size={20} className="ml-2" />
           </Button>
        </form>

        <div className="mt-8 text-center">
           <p className="text-gray-500 dark:text-gray-400">
             Don't have an account?{' '}
             <Link to="/signup" className="text-primary-600 font-bold hover:underline">Sign Up</Link>
           </p>
        </div>
      </div>
    </div>
  );
};

export default Login;