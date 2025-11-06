import { describe, it, expect } from 'vitest';
import { hashPassword, comparePassword } from '../password';

describe('Password Utilities', () => {
  const testPassword = 'SecurePassword123!';

  describe('hashPassword', () => {
    it('should hash a password', async () => {
      const hashed = await hashPassword(testPassword);
      expect(hashed).toBeTruthy();
      expect(typeof hashed).toBe('string');
      expect(hashed).not.toBe(testPassword);
    });

    it('should generate different hashes for same password', async () => {
      const hash1 = await hashPassword(testPassword);
      const hash2 = await hashPassword(testPassword);
      expect(hash1).not.toBe(hash2);
    });

    it('should handle empty password', async () => {
      const hashed = await hashPassword('');
      expect(hashed).toBeTruthy();
    });
  });

  describe('comparePassword', () => {
    it('should verify correct password', async () => {
      const hashed = await hashPassword(testPassword);
      const isValid = await comparePassword(testPassword, hashed);
      expect(isValid).toBe(true);
    });

    it('should reject incorrect password', async () => {
      const hashed = await hashPassword(testPassword);
      const isValid = await comparePassword('WrongPassword', hashed);
      expect(isValid).toBe(false);
    });

    it('should handle case-sensitive passwords', async () => {
      const hashed = await hashPassword(testPassword);
      const isValid = await comparePassword(testPassword.toLowerCase(), hashed);
      expect(isValid).toBe(false);
    });

    it('should handle special characters', async () => {
      const specialPassword = 'P@ssw0rd!#$%^&*()';
      const hashed = await hashPassword(specialPassword);
      const isValid = await comparePassword(specialPassword, hashed);
      expect(isValid).toBe(true);
    });
  });

  describe('Password Security', () => {
    it('should produce hash of sufficient length', async () => {
      const hashed = await hashPassword(testPassword);
      expect(hashed.length).toBeGreaterThan(50);
    });

    it('should handle very long passwords', async () => {
      const longPassword = 'a'.repeat(200);
      const hashed = await hashPassword(longPassword);
      const isValid = await comparePassword(longPassword, hashed);
      expect(isValid).toBe(true);
    });
  });
});
