import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Food from '@/models/Food';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search')?.trim();
    const restaurantId = searchParams.get('restaurantId')?.trim();

    const query = {};

    // ✅ Match restaurantId to food.restaurants (string)
    if (restaurantId) {
      console.log('➡️  restaurantId param:', `"${restaurantId}"`);
      query.restaurants = { $in: [restaurantId] };
    }

    if (search) {
      query.$or = [
        { name:        { $regex: search, $options: 'i' } },
        { category:    { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const foods = await Food.find(query).sort({ rating: -1 });
    return NextResponse.json(foods);
  } catch (error) {
    console.error('❌ /api/foods error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu items', details: error.message },
      { status: 500 }
    );
  }
}
