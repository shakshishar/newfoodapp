import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Food from '@/models/Food';
import Restaurant from '@/models/Restaurant';

export async function GET() {
  try {
    await connectDB();
    
    // Get all restaurants
    const restaurants = await Restaurant.find({});
    console.log('All restaurants:', restaurants);

    // Get all foods
    const foods = await Food.find({});
    console.log('All foods:', foods);

    return NextResponse.json({
      success: true,
      restaurantCount: restaurants.length,
      foodCount: foods.length,
      restaurants,
      foods
    });
  } catch (error) {
    console.error('Test API Error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
} 