import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateEmail(email)) {
       setError("Please enter a valid email address.");
       return;
    }
    
    if (password.length < 6) {
       setError("Password must be at least 6 characters.");
       return;
    }

    setLoading(true);
    await signup(email, name);
    setLoading(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gray-50 dark:bg-black transition-colors px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 animate-scale-in">
        <div className="text-center mb-8">
           <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white">Create Account</h1>
           <p className="text-gray-500 dark:text-gray-400 mt-2">Join the elite Lumina community</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-2 text-sm">
             <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
           <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <div className="relative">
                 <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                 <input 
                   type="text" 
                   required
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none transition-all"
                   placeholder="John Doe" 
                 />
              </div>
           </div>

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
                   placeholder="Create a strong password" 
                 />
              </div>
           </div>

           <Button fullWidth size="lg" isLoading={loading} className="shadow-xl shadow-primary-500/20">
             Create Account <ArrowRight size={20} className="ml-2" />
           </Button>
        </form>

        <div className="mt-8 text-center">
           <p className="text-gray-500 dark:text-gray-400">
             Already have an account?{' '}
             <Link to="/login" className="text-primary-600 font-bold hover:underline">Log In</Link>
           </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;