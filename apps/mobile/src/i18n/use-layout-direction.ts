import { useTranslation } from 'react-i18next';

import { getDirectionalArrow, getLayoutDirection, normalizeLanguage } from './direction';

export function useLayoutDirection() {
  const { i18n } = useTranslation();
  const language = normalizeLanguage(i18n.resolvedLanguage ?? i18n.language);
  const direction = getLayoutDirection(language);

  return {
    direction,
    directionalArrow: getDirectionalArrow(language),
    isRtl: direction === 'rtl',
    language,
  };
}
