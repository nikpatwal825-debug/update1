import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAdminTokenFromRequest, verifyAdminToken } from '@/lib/admin-auth';

export async function GET(request) {
  try {
    // Verify admin authentication
    const token = getAdminTokenFromRequest(request);
    const admin = await verifyAdminToken(token);

    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const skip = (page - 1) * limit;

    // Build where clause
    const where = status ? { status } : {};

    // Fetch bookings with user and service details
    const [bookings, totalCount] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              email: true,
              phone: true
            }
          },
          service: {
            select: {
              nameEn: true,
              nameHi: true,
              category: true
            }
          },
          payment: {
            select: {
              amount: true,
              status: true,
              receiptNumber: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit
      }),
      prisma.booking.count({ where })
    ]);

    return NextResponse.json({
      success: true,
      bookings,
      pagination: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit)
      }
    });

  } catch (error) {
    console.error('Admin bookings error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update booking status
export async function PATCH(request) {
  try {
    const token = getAdminTokenFromRequest(request);
    const admin = await verifyAdminToken(token);

    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { bookingId, status } = await request.json();

    if (!bookingId || !status) {
      return NextResponse.json(
        { error: 'Booking ID and status are required' },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status }
    });

    return NextResponse.json({
      success: true,
      booking
    });

  } catch (error) {
    console.error('Update booking error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
