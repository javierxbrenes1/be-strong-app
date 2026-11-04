import { describe, expect, it } from 'vitest';
import theme from './theme';
import { chartPalette } from './useChartColors';

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

describe('accent text never uses the yellow', () => {
  it('overrides the focused label and the keyboard focus ring', () => {
    expect(theme.components?.MuiFormLabel?.styleOverrides).toBeDefined();
    expect(theme.components?.MuiButtonBase?.styleOverrides).toBeDefined();
  });
});

describe('chartPalette', () => {
  it('returns the palette of the requested scheme', () => {
    expect(chartPalette(theme, 'light').primaryInk).toBe('#854D0E');
    expect(chartPalette(theme, 'dark').primaryInk).toBe('#FDE047');
    expect(chartPalette(theme, 'dark').text).toBe('#F4F4F5');
  });
});
