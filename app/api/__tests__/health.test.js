import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '../health/route';

// Mock Prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    $queryRaw: vi.fn(),
    user: {
      count: vi.fn(),
    },
    booking: {
      count: vi.fn(),
    },
    service: {
      count: vi.fn(),
    },
  },
}));

describe('Health Check API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return healthy status when database is connected', async () => {
    const { prisma } = await import('@/lib/prisma');
    
    prisma.$queryRaw.mockResolvedValue([{ result: 1 }]);
    prisma.user.count.mockResolvedValue(10);
    prisma.booking.count.mockResolvedValue(5);
    prisma.service.count.mockResolvedValue(3);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe('healthy');
    expect(data.database.status).toBe('connected');
    expect(data.database.stats).toEqual({
      users: 10,
      bookings: 5,
      services: 3,
    });
  });

  it('should return unhealthy status when database fails', async () => {
    const { prisma } = await import('@/lib/prisma');
    
    prisma.$queryRaw.mockRejectedValue(new Error('Connection failed'));

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.status).toBe('unhealthy');
    expect(data.error).toBe('Database connection failed');
  });

  it('should include timestamp in response', async () => {
    const { prisma } = await import('@/lib/prisma');
    
    prisma.$queryRaw.mockResolvedValue([{ result: 1 }]);
    prisma.user.count.mockResolvedValue(0);
    prisma.booking.count.mockResolvedValue(0);
    prisma.service.count.mockResolvedValue(0);

    const response = await GET();
    const data = await response.json();

    expect(data.timestamp).toBeTruthy();
    expect(new Date(data.timestamp).toString()).not.toBe('Invalid Date');
  });

  it('should include environment info', async () => {
    const { prisma } = await import('@/lib/prisma');
    
    prisma.$queryRaw.mockResolvedValue([{ result: 1 }]);
    prisma.user.count.mockResolvedValue(0);
    prisma.booking.count.mockResolvedValue(0);
    prisma.service.count.mockResolvedValue(0);

    const response = await GET();
    const data = await response.json();

    expect(data.environment).toBeTruthy();
  });
});
