'use client';

import { useState, useEffect } from 'react';
import { HeartIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (food) => {
    const newWishlist = wishlist.filter(item => item._id !== food._id);
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    toast.success('Removed from wishlist');
  };

  const addToCart = (food) => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const newCart = [...savedCart];
    const existingItem = newCart.find(item => item._id === food._id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      newCart.push({ ...food, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(newCart));
    toast.success('Added to cart');
  };

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-12">
        <HeartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
        <p className="text-gray-600">Start adding your favorite foods to the wishlist!</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 mb-8">My Wishlist</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((food) => (
          <div key={food._id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{food.name}</h2>
                <button
                  onClick={() => removeFromWishlist(food)}
                  className="text-red-500 hover:text-red-600"
                >
                  <HeartIcon className="h-6 w-6" />
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">{food.category}</p>
              <p className="mt-2 text-sm text-gray-600">{food.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900">${food.price}</span>
                <button
                  onClick={() => addToCart(food)}
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 