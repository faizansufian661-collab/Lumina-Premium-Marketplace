import { Product } from './types';

export const CATEGORIES = [
  { id: 'electronics', name: 'Electronics', icon: 'Cpu' },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt' },
  { id: 'home', name: 'Home & Living', icon: 'Home' },
  { id: 'beauty', name: 'Beauty', icon: 'Sparkles' },
  { id: 'sports', name: 'Sports', icon: 'Activity' },
  { id: 'accessories', name: 'Accessories', icon: 'Watch' },
];

// Generating premium mock products
export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Lumina X1 Noise-Canceling Headphones",
    category: "Electronics",
    price: 299.00,
    originalPrice: 349.00,
    rating: 4.8,
    reviews: 124,
    image: "https://picsum.photos/id/1/800/800",
    images: ["https://picsum.photos/id/1/800/800", "https://picsum.photos/id/2/800/800", "https://picsum.photos/id/3/800/800"],
    description: "Experience silence like never before with the Lumina X1. Featuring industry-leading active noise cancellation and 30-hour battery life.",
    features: ["Active Noise Cancellation", "30-hour battery", "Premium leather earcups", "USB-C Fast Charging"],
    colors: ["#000000", "#E5E7EB", "#1F2937"],
    isNew: true
  },
  {
    id: 2,
    name: "Minimalist Chronograph Watch",
    category: "Accessories",
    price: 189.00,
    rating: 4.9,
    reviews: 89,
    image: "https://picsum.photos/id/175/800/800",
    images: ["https://picsum.photos/id/175/800/800", "https://picsum.photos/id/176/800/800"],
    description: "A timeless piece for the modern individual. Sapphire crystal glass and genuine Italian leather strap.",
    features: ["Sapphire Crystal", "5ATM Water Resistance", "Italian Leather", "Swiss Movement"],
    colors: ["#374151", "#92400E"],
    isSale: false
  },
  {
    id: 3,
    name: "Designer Denim Jacket",
    category: "Fashion",
    price: 129.00,
    originalPrice: 159.00,
    rating: 4.5,
    reviews: 215,
    image: "https://picsum.photos/id/338/800/800",
    images: ["https://picsum.photos/id/338/800/800", "https://picsum.photos/id/339/800/800"],
    description: "Vintage inspired, modern fit. Hand-distressed denim that gets better with age.",
    features: ["100% Cotton", "Hand-distressed", "Custom hardware", "Slim fit"],
    colors: ["#1E3A8A", "#000000"],
    sizes: ["S", "M", "L", "XL"],
    isSale: true
  },
  {
    id: 4,
    name: "Smart Home Assistant Hub",
    category: "Electronics",
    price: 89.00,
    rating: 4.2,
    reviews: 540,
    image: "https://picsum.photos/id/366/800/800",
    images: ["https://picsum.photos/id/366/800/800"],
    description: "Control your entire home with your voice. The new Hub connects seamlessly to all your smart devices.",
    features: ["Voice Control", "Touch Screen", "Zigbee Hub", "High-fidelity Speaker"],
    colors: ["#FFFFFF", "#1F2937"],
    isNew: true
  },
  {
    id: 5,
    name: "Organic Bamboo Bedding Set",
    category: "Home & Living",
    price: 149.00,
    rating: 4.7,
    reviews: 320,
    image: "https://picsum.photos/id/449/800/800",
    images: ["https://picsum.photos/id/449/800/800", "https://picsum.photos/id/450/800/800"],
    description: "Sleep in luxury with our 100% organic bamboo sheets. Naturally cooling and hypoallergenic.",
    features: ["100% Organic Bamboo", "300 Thread Count", "Cooling Technology", "Eco-friendly"],
    colors: ["#F3F4F6", "#D1D5DB", "#A7F3D0"],
    sizes: ["Queen", "King", "California King"]
  },
  {
    id: 6,
    name: "Pro-Series Yoga Mat",
    category: "Sports",
    price: 65.00,
    rating: 4.6,
    reviews: 150,
    image: "https://picsum.photos/id/486/800/800",
    images: ["https://picsum.photos/id/486/800/800"],
    description: "Non-slip, high density cushioning for the perfect practice. Includes carrying strap.",
    features: ["Non-slip surface", "6mm thickness", "Eco-friendly material", "Carrying strap included"],
    colors: ["#818CF8", "#F472B6", "#34D399"]
  },
  {
    id: 7,
    name: "Hydrating Facial Serum",
    category: "Beauty",
    price: 45.00,
    rating: 4.9,
    reviews: 890,
    image: "https://picsum.photos/id/514/800/800",
    images: ["https://picsum.photos/id/514/800/800"],
    description: "Revitalize your skin with Hyaluronic acid and Vitamin C. Dermatologist tested.",
    features: ["Hyaluronic Acid", "Vitamin C", "Cruelty-free", "Vegan"],
    colors: [],
    isNew: true
  },
  {
    id: 8,
    name: "Wireless Charging Pad",
    category: "Electronics",
    price: 39.00,
    originalPrice: 59.00,
    rating: 4.3,
    reviews: 210,
    image: "https://picsum.photos/id/61/800/800",
    images: ["https://picsum.photos/id/61/800/800"],
    description: "Fast charging for all Qi-enabled devices. Sleek aluminum design.",
    features: ["15W Fast Charging", "Qi Certified", "Aluminum Body", "LED Indicator"],
    colors: ["#000000", "#FFFFFF"],
    isSale: true
  }
];