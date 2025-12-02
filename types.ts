export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  description: string;
  features: string[];
  colors: string[];
  sizes?: string[];
  isNew?: boolean;
  isSale?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface User {
  name: string;
  email: string;
}

export type SortOption = 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';

export interface FilterState {
  category: string | null;
  minPrice: number;
  maxPrice: number;
  rating: number | null;
}