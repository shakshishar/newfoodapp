'use client';

import { CheckIcon } from '@heroicons/react/24/outline';

export default function AboutPage() {
  const features = [
    'Wide selection of restaurants',
    'Fast and reliable delivery',
    'Real-time order tracking',
    'Secure payment options',
    'Customer satisfaction guarantee',
    'Professional delivery partners',
    'Easy-to-use mobile app',
    'Exclusive deals and offers',
  ];

  const stats = [
    { label: 'Happy Customers', value: '100K+' },
    { label: 'Restaurant Partners', value: '500+' },
    { label: 'Cities Covered', value: '50+' },
    { label: 'Delivery Partners', value: '1000+' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-orange-500">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
            alt="Food delivery"
          />
          <div className="absolute inset-0 bg-orange-500 mix-blend-multiply" />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">About FoodHub</h1>
          <p className="mt-6 text-xl text-orange-100 max-w-3xl">
            We're on a mission to transform the way people think about food delivery. With FoodHub, you get the best of local cuisine delivered right to your doorstep.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-orange-500 font-semibold tracking-wide uppercase">Our Mission</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Connecting People with Great Food
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              We believe that good food has the power to bring people together. Our platform makes it easy for you to discover and order from the best local restaurants.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg shadow px-4 py-5 sm:p-6 text-center">
                <dt className="text-sm font-medium text-gray-500 truncate">{stat.label}</dt>
                <dd className="mt-1 text-3xl font-semibold text-orange-500">{stat.value}</dd>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-orange-500 font-semibold tracking-wide uppercase">What We Offer</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything You Need
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature} className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                    <CheckIcon className="h-6 w-6 text-orange-500" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{feature}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-orange-500">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to try FoodHub?</span>
            <span className="block text-orange-100">Start ordering today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <a
                href="/"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-orange-500 bg-white hover:bg-orange-50"
              >
                Order Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 