// Health Check API Endpoint
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Check database connectivity
    await prisma.$queryRaw`SELECT 1`;
    
    // Get database stats
    const [userCount, bookingCount, serviceCount] = await Promise.all([
      prisma.user.count(),
      prisma.booking.count(),
      prisma.service.count(),
    ]);

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: {
        status: 'connected',
        stats: {
          users: userCount,
          bookings: bookingCount,
          services: serviceCount,
        },
      },
      version: process.env.npm_package_version || '0.1.0',
    });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Database connection failed',
        environment: process.env.NODE_ENV || 'development',
      },
      { status: 503 }
    );
  }
}
