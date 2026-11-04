import { describe, expect, it } from 'vitest';
import { AVATAR_COLORS, avatarColor, initials } from './avatar';

describe('initials', () => {
  it('uses first letter of the first two words', () => {
    expect(initials('Carlos Jiménez Mora')).toBe('CJ');
    expect(initials('Ángela Núñez')).toBe('ÁN');
  });
  it('handles one word and blank names', () => {
    expect(initials('ana')).toBe('A');
    expect(initials('  ')).toBe('?');
    expect(initials('')).toBe('?');
  });
});

describe('avatarColor', () => {
  it('is deterministic and from the palette', () => {
    expect(AVATAR_COLORS).toContain(avatarColor('Carlos Jiménez Mora'));
    expect(avatarColor('Carlos Jiménez Mora')).toBe(
      avatarColor('Carlos Jiménez Mora')
    );
  });
  it('falls back to the first color for empty names', () => {
    expect(avatarColor('')).toBe(AVATAR_COLORS[0]);
  });
});
