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

    if (restaurantId) {
      console.log('restaurantId param:', restaurantId);

      if (!/^[0-9a-fA-F]{24}$/.test(restaurantId)) {
        return NextResponse.json(
          { error: 'Invalid restaurant ID format' },
          { status: 400 }
        );
      }

      query.restaurants = { $in: [restaurantId] };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    console.log('Query being run:', JSON.stringify(query, null, 2));

    const foods = await Food.find(query).sort({ rating: -1 });
    console.log('Foods found:', foods.length);

    return NextResponse.json(foods);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch menu items', details: error.message },
      { status: 500 }
    );
  }
}
