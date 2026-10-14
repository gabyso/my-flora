export type AppLanguage = 'en' | 'he';
export type LayoutDirection = 'ltr' | 'rtl';

export const supportedLanguages: readonly AppLanguage[] = ['en', 'he'];

export function normalizeLanguage(language: string | null | undefined): AppLanguage {
  return language?.toLowerCase().startsWith('he') ? 'he' : 'en';
}

export function getLayoutDirection(language: string): LayoutDirection {
  return normalizeLanguage(language) === 'he' ? 'rtl' : 'ltr';
}

export function getDirectionalArrow(language: string): '‹' | '›' {
  return getLayoutDirection(language) === 'rtl' ? '‹' : '›';
}
