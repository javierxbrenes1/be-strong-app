import { describe, expect, it } from 'vitest';
import theme from './theme';

const light = theme.colorSchemes.light!.palette;
const dark = theme.colorSchemes.dark!.palette;

describe('Iron theme tokens', () => {
  it('light scheme', () => {
    expect(light.background.default).toBe('#F6F6F4');
    expect(light.background.paper).toBe('#FFFFFF');
    expect(light.primary.main).toBe('#FACC15');
    expect(light.primary.contrastText).toBe('#18181B');
    expect(light.primaryInk).toBe('#854D0E');
    expect(light.text.secondary).toBe('#5B5B63');
  });
  it('dark scheme', () => {
    expect(dark.background.default).toBe('#0F0F10');
    expect(dark.primaryInk).toBe('#FDE047');
    expect(dark.error.main).toBe('#F87171');
  });
  it('shape and font', () => {
    expect(theme.shape.borderRadius).toBe(8);
    expect(theme.typography.fontFamily).toMatch(/^"?Inter/);
  });
});
