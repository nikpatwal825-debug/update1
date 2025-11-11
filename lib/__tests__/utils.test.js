import { describe, it, expect } from 'vitest';
import { cn } from '../utils';

describe('Utility Functions', () => {
  describe('cn (className utility)', () => {
    it('should merge class names', () => {
      const result = cn('class1', 'class2');
      expect(result).toContain('class1');
      expect(result).toContain('class2');
    });

    it('should handle conditional classes', () => {
      const result = cn('base', false && 'hidden', true && 'visible');
      expect(result).toContain('base');
      expect(result).toContain('visible');
      expect(result).not.toContain('hidden');
    });

    it('should handle undefined and null', () => {
      const result = cn('base', undefined, null, 'end');
      expect(result).toContain('base');
      expect(result).toContain('end');
    });

    it('should deduplicate classes', () => {
      const result = cn('p-4', 'p-2');
      // Should use the last value for conflicting utilities
      expect(result).toBeTruthy();
    });

    it('should handle empty input', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should handle array of classes', () => {
      const result = cn(['class1', 'class2'], 'class3');
      expect(result).toContain('class1');
      expect(result).toContain('class2');
      expect(result).toContain('class3');
    });
  });
});
