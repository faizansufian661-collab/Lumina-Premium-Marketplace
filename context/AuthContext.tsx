import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name: string) => void;
  signup: (email: string, name: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check local storage for persistent login
    const storedUser = localStorage.getItem('lumina_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email: string, name: string) => {
    // Simulate API call
    const newUser = { email, name };
    setUser(newUser);
    localStorage.setItem('lumina_user', JSON.stringify(newUser));
  };

  const signup = async (email: string, name: string): Promise<boolean> => {
    // Simulate Backend Delay
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { email, name };
        setUser(newUser);
        localStorage.setItem('lumina_user', JSON.stringify(newUser));
        resolve(true);
      }, 1500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lumina_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};