'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MagnifyingGlassIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function RestaurantPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      console.log('Restaurant ID:', id); // Debug log
      try {
        await Promise.all([fetchRestaurant(), fetchFoods()]);
      } catch (err) {
        setError(err.message);
        toast.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
    // Load wishlist and cart from localStorage
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setWishlist(savedWishlist);
    setCart(savedCart);
  }, [id]);

  // Separate effect for search to avoid reloading restaurant data
  useEffect(() => {
    if (id) {
      fetchFoods();
    }
  }, [search]);

  const fetchRestaurant = async () => {
    try {
      const response = await fetch(`/api/restaurants?id=${id}`);
      if (!response.ok) throw new Error('Failed to fetch restaurant');
      const data = await response.json();
      // console.log('Restaurant data:', data); // Debug log
      if (data && data.length > 0) {
        setRestaurant(data[0]);
      } else {
        throw new Error('Restaurant not found');
      }
    } catch (error) {
      console.error('Error fetching restaurant:', error);
      throw error;
    }
  };

 const fetchFoods = async () => {
  try {
    // console.log('Fetching foods for restaurant:', id);
    
    // Construct the URL properly
    const url = `/api/foods?restaurantId=${encodeURIComponent(id)}${search ? `&search=${encodeURIComponent(search)}` : ''}`;
    // console.log('API URL:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      // console.error('Response not OK:', response.status, errorText);
      throw new Error(`Failed to fetch menu items: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    // console.log('Foods response:', data);
    // console.log('Number of foods received:', data.length);
    
    setFoods(data);
  } catch (error) {
    console.error('Error fetching foods:', error);
    throw error;
  }
};

  const toggleWishlist = (food) => {
    const newWishlist = wishlist.find(item => item._id === food._id)
      ? wishlist.filter(item => item._id !== food._id)
      : [...wishlist, food];
    
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    toast.success(wishlist.find(item => item._id === food._id)
      ? 'Removed from wishlist'
      : 'Added to wishlist');
  };

  const addToCart = (food) => {
    const newCart = [...cart];
    const existingItem = newCart.find(item => item._id === food._id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      newCart.push({ ...food, quantity: 1 });
    }
    
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    toast.success('Added to cart');
  };

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (loading || !restaurant) {
    return (
      <div className="text-center py-10">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <div className="relative h-64 mb-6">
          <image
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white rounded-lg">
            <h1 className="text-4xl font-bold">{restaurant.name}</h1>
            <p className="mt-2">{restaurant.cuisine}</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-400">★</span>
              <span className="ml-1">{restaurant.rating}</span>
              <span className={`ml-4 px-2 py-1 rounded-full text-xs ${
                restaurant.isOpen ? 'bg-green-500' : 'bg-red-500'
              }`}>
                {restaurant.isOpen ? 'Open' : 'Closed'}
              </span>
            </div>
          </div>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search menu items..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute right-3 top-3" />
        </div>

        {foods.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No menu items found{search ? ' matching your search' : ''}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foods.map((food) => (
              <div key={food._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <image
                  src={food.image}
                  alt={food.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">{food.name}</h2>
                    <button
                      onClick={() => toggleWishlist(food)}
                      className="text-red-500 hover:text-red-600"
                    >
                      {wishlist.find(item => item._id === food._id) ? (
                        <HeartSolidIcon className="h-6 w-6" />
                      ) : (
                        <HeartIcon className="h-6 w-6" />
                      )}
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
                  <div className="mt-2 flex flex-wrap gap-2">
                    {food.isVegetarian && (
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        Vegetarian
                      </span>
                    )}
                    {food.isVegan && (
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        Vegan
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 