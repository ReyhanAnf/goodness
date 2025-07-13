import { NextRequest, NextResponse } from 'next/server';
import { get_current_pray } from '@/lib/get_location';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');

    if (!year || !month || !latitude || !longitude) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const prayerData = await get_current_pray(year, month, latitude, longitude);

    return NextResponse.json({
      success: true,
      data: prayerData.data
    });

  } catch (error) {
    console.error('Error fetching prayer times:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch prayer times' },
      { status: 500 }
    );
  }
} 