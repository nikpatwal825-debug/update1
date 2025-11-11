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

    // Fetch real statistics from database
    const [
      totalBookings,
      totalUsers,
      totalServices,
      completedBookings,
      pendingBookings,
      totalRevenue
    ] = await Promise.all([
      prisma.booking.count(),
      prisma.user.count(),
      prisma.service.count(),
      prisma.booking.count({ where: { status: 'COMPLETED' } }),
      prisma.booking.count({ where: { status: 'PENDING' } }),
      prisma.payment.aggregate({
        where: { status: 'SUCCESS' },
        _sum: { amount: true }
      })
    ]);

    // Calculate this month's data
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const [
      bookingsThisMonth,
      usersThisMonth,
      revenueThisMonth
    ] = await Promise.all([
      prisma.booking.count({
        where: {
          createdAt: {
            gte: firstDayOfMonth
          }
        }
      }),
      prisma.user.count({
        where: {
          createdAt: {
            gte: firstDayOfMonth
          }
        }
      }),
      prisma.payment.aggregate({
        where: {
          status: 'SUCCESS',
          createdAt: {
            gte: firstDayOfMonth
          }
        },
        _sum: { amount: true }
      })
    ]);

    // Calculate previous month for comparison
    const firstDayOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastDayOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    
    const bookingsPrevMonth = await prisma.booking.count({
      where: {
        createdAt: {
          gte: firstDayOfPrevMonth,
          lte: lastDayOfPrevMonth
        }
      }
    });

    // Calculate growth percentages
    const bookingGrowth = bookingsPrevMonth > 0 
      ? (((bookingsThisMonth - bookingsPrevMonth) / bookingsPrevMonth) * 100).toFixed(1)
      : '0';

    return NextResponse.json({
      success: true,
      stats: {
        overview: {
          totalBookings,
          totalUsers,
          totalServices,
          completedBookings,
          pendingBookings,
          totalRevenue: totalRevenue._sum.amount || 0
        },
        thisMonth: {
          bookings: bookingsThisMonth,
          users: usersThisMonth,
          revenue: revenueThisMonth._sum.amount || 0,
          bookingGrowth: `${bookingGrowth > 0 ? '+' : ''}${bookingGrowth}%`
        }
      }
    });

  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
