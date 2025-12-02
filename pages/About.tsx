import React from 'react';
import { Code, Server, Shield } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black pt-32 pb-20 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-gray-900 dark:text-white mb-6 animate-slide-up">About Lumina</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Built for the modern web. Designed for performance. Engineered for security.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-12 shadow-xl border border-gray-100 dark:border-gray-800 mb-16 animate-fade-in">
           <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">The Developer</h2>
           <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                F
              </div>
              <div>
                 <h3 className="text-xl font-bold text-gray-900 dark:text-white">Made by Faizan</h3>
                 <p className="text-gray-500 dark:text-gray-400">Lead Full Stack Engineer</p>
              </div>
           </div>
           <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
             This application represents the pinnacle of modern e-commerce development. 
             It utilizes a React 19 architecture with Tailwind CSS for styling and custom Context APIs for state management.
             Security features include client-side validation, simulated fraud detection algorithms, and secure routing protocols.
           </p>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gray-50 dark:bg-black/50 rounded-xl border border-gray-200 dark:border-gray-800">
                 <Code className="text-primary-600 mb-4" size={32} />
                 <h4 className="font-bold text-gray-900 dark:text-white mb-2">Clean Code</h4>
                 <p className="text-sm text-gray-500">Optimized for Vercel/Github deployment with zero build errors.</p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-black/50 rounded-xl border border-gray-200 dark:border-gray-800">
                 <Server className="text-primary-600 mb-4" size={32} />
                 <h4 className="font-bold text-gray-900 dark:text-white mb-2">Simulated Backend</h4>
                 <p className="text-sm text-gray-500">Persistent local storage mocking database interactions.</p>
              </div>
              <div className="p-6 bg-gray-50 dark:bg-black/50 rounded-xl border border-gray-200 dark:border-gray-800">
                 <Shield className="text-primary-600 mb-4" size={32} />
                 <h4 className="font-bold text-gray-900 dark:text-white mb-2">Secure</h4>
                 <p className="text-sm text-gray-500">Input validation and simulated payment protection layers.</p>
              </div>
           </div>
        </div>

        <div className="text-center text-gray-500 dark:text-gray-600 text-sm">
           <p>© 2025 Lumina Inc. All rights reserved.</p>
           <p>Licensed under MIT License.</p>
        </div>
      </div>
    </div>
  );
};

export default About;