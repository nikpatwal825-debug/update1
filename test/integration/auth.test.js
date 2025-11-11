import { describe, it, expect, vi, beforeEach } from 'vitest';
import { verifyAuth } from '@/lib/middleware/auth';
import { generateAccessToken } from '@/lib/jwt';

// Mock Prisma
vi.mock('@/lib/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
  default: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

describe('Authentication Integration Tests', () => {
  const mockUser = {
    id: 'user-123',
    name: 'Test User',
    email: 'test@example.com',
    role: 'USER',
    phone: '1234567890',
    language: 'en',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('verifyAuth', () => {
    it('should authenticate valid token with existing user', async () => {
      const { prisma } = await import('@/lib/prisma');
      const token = generateAccessToken({ userId: mockUser.id });

      const mockRequest = {
        cookies: {
          get: vi.fn((name) => {
            if (name === 'accessToken') {
              return { value: token };
            }
            return undefined;
          }),
        },
      };

      prisma.user.findUnique.mockResolvedValue(mockUser);

      const result = await verifyAuth(mockRequest);

      expect(result.authenticated).toBe(true);
      expect(result.user.id).toBe(mockUser.id);
      expect(result.user.email).toBe(mockUser.email);
    });

    it('should reject request without token', async () => {
      const mockRequest = {
        cookies: {
          get: vi.fn(() => undefined),
        },
      };

      const result = await verifyAuth(mockRequest);

      expect(result.authenticated).toBe(false);
      expect(result.user).toBeNull();
    });

    it('should reject request with invalid token', async () => {
      const mockRequest = {
        cookies: {
          get: vi.fn(() => ({ value: 'invalid-token' })),
        },
      };

      const result = await verifyAuth(mockRequest);

      expect(result.authenticated).toBe(false);
      expect(result.user).toBeNull();
    });

    it('should reject token for non-existent user', async () => {
      const { prisma } = await import('@/lib/prisma');
      const token = generateAccessToken({ userId: 'non-existent' });

      const mockRequest = {
        cookies: {
          get: vi.fn(() => ({ value: token })),
        },
      };

      prisma.user.findUnique.mockResolvedValue(null);

      const result = await verifyAuth(mockRequest);

      expect(result.authenticated).toBe(false);
      expect(result.user).toBeNull();
    });

    it('should handle database errors gracefully', async () => {
      const { prisma } = await import('@/lib/prisma');
      const token = generateAccessToken({ userId: mockUser.id });

      const mockRequest = {
        cookies: {
          get: vi.fn(() => ({ value: token })),
        },
      };

      prisma.user.findUnique.mockRejectedValue(new Error('Database error'));

      const result = await verifyAuth(mockRequest);

      expect(result.authenticated).toBe(false);
      expect(result.user).toBeNull();
    });
  });
});
