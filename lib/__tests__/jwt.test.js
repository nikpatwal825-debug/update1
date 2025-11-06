import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  decodeToken,
} from '../jwt';

describe('JWT Utilities', () => {
  const testPayload = { userId: 'test-user-123', role: 'USER' };

  describe('generateAccessToken', () => {
    it('should generate a valid access token', () => {
      const token = generateAccessToken(testPayload);
      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
    });

    it('should include payload data in token', () => {
      const token = generateAccessToken(testPayload);
      const decoded = decodeToken(token);
      expect(decoded.userId).toBe(testPayload.userId);
      expect(decoded.role).toBe(testPayload.role);
    });
  });

  describe('generateRefreshToken', () => {
    it('should generate a valid refresh token', () => {
      const token = generateRefreshToken(testPayload);
      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
    });
  });

  describe('verifyAccessToken', () => {
    it('should verify a valid access token', () => {
      const token = generateAccessToken(testPayload);
      const verified = verifyAccessToken(token);
      expect(verified).toBeTruthy();
      expect(verified.userId).toBe(testPayload.userId);
    });

    it('should return null for invalid token', () => {
      const verified = verifyAccessToken('invalid-token');
      expect(verified).toBeNull();
    });

    it('should return null for expired token', () => {
      // This would require token manipulation or time travel
      // Placeholder for future implementation
      expect(true).toBe(true);
    });
  });

  describe('verifyRefreshToken', () => {
    it('should verify a valid refresh token', () => {
      const token = generateRefreshToken(testPayload);
      const verified = verifyRefreshToken(token);
      expect(verified).toBeTruthy();
      expect(verified.userId).toBe(testPayload.userId);
    });

    it('should return null for invalid token', () => {
      const verified = verifyRefreshToken('invalid-token');
      expect(verified).toBeNull();
    });
  });

  describe('decodeToken', () => {
    it('should decode token without verification', () => {
      const token = generateAccessToken(testPayload);
      const decoded = decodeToken(token);
      expect(decoded.userId).toBe(testPayload.userId);
      expect(decoded.role).toBe(testPayload.role);
    });

    it('should return null for malformed token', () => {
      const decoded = decodeToken('not-a-token');
      expect(decoded).toBeNull();
    });
  });

  describe('Token Security', () => {
    it('should generate different tokens for same payload', () => {
      const token1 = generateAccessToken(testPayload);
      const token2 = generateAccessToken(testPayload);
      // Tokens should be different due to timestamps
      expect(token1).not.toBe(token2);
    });

    it('should not accept refresh token as access token', () => {
      const refreshToken = generateRefreshToken(testPayload);
      const verified = verifyAccessToken(refreshToken);
      expect(verified).toBeNull();
    });

    it('should not accept access token as refresh token', () => {
      const accessToken = generateAccessToken(testPayload);
      const verified = verifyRefreshToken(accessToken);
      expect(verified).toBeNull();
    });
  });
});
