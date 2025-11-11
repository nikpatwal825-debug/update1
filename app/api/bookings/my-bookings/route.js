// Get User Bookings API
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/middleware/auth';

export async function GET(request) {
  try {
    // Verify authentication
    const authResult = await verifyAuth(request);
    if (!authResult.authenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userId = authResult.user.id;

    // Fetch user's bookings with pagination support
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = (page - 1) * limit;

    // Fetch bookings with optimized select
    const [bookings, totalCount] = await Promise.all([
      prisma.booking.findMany({
        where: { userId },
        select: {
          id: true,
          status: true,
          paymentStatus: true,
          bookingDate: true,
          bookingTime: true,
          amount: true,
          notes: true,
          createdAt: true,
          service: {
            select: {
              nameEn: true,
              nameHi: true,
              price: true,
              duration: true,
              category: true,
              imageUrl: true,
            },
          },
          payment: {
            select: {
              receiptNumber: true,
              receiptUrl: true,
              status: true,
              createdAt: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.booking.count({
        where: { userId },
      }),
    ]);

    return NextResponse.json({
      success: true,
      bookings,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    });
  } catch (error) {
    console.error('Fetch bookings error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
