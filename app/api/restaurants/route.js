import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Restaurant from '@/models/Restaurant';

export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const id = searchParams.get('id');
    
    let query = {};
    
    if (id) {
      query.id = id;
    }
    
    if (search) {
      query = {
        ...query,
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { cuisine: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
        ],
      };
    }
    
    const restaurants = await Restaurant.find(query);
    return NextResponse.json(restaurants);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 