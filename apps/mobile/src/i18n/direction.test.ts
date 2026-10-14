import { describe, expect, it } from 'vitest';

import { getDirectionalArrow, getLayoutDirection, normalizeLanguage } from './direction';

describe('direction helpers', () => {
  it('normalizes Hebrew locale variants', () => {
    expect(normalizeLanguage('he-IL')).toBe('he');
  });

  it('falls back unknown languages to English', () => {
    expect(normalizeLanguage('fr-FR')).toBe('en');
  });

  it('mirrors layout direction and directional icons', () => {
    expect(getLayoutDirection('en')).toBe('ltr');
    expect(getDirectionalArrow('en')).toBe('›');
    expect(getLayoutDirection('he')).toBe('rtl');
    expect(getDirectionalArrow('he')).toBe('‹');
  });
});
