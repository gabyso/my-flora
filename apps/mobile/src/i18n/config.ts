import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import { createInstance } from 'i18next';
import { I18nManager } from 'react-native';
import { initReactI18next } from 'react-i18next';

import { getLayoutDirection, normalizeLanguage, type AppLanguage } from './direction';
import { englishResources } from './resources/en';
import { hebrewResources } from './resources/he';

const languageStorageKey = 'my-flora.language';
const deviceLanguage = normalizeLanguage(getLocales()[0]?.languageTag);
const i18n = createInstance();

function configureNativeDirection(language: AppLanguage): void {
  const shouldUseRtl = getLayoutDirection(language) === 'rtl';

  I18nManager.allowRTL(true);
  I18nManager.swapLeftAndRightInRTL(true);

  if (I18nManager.isRTL !== shouldUseRtl) {
    I18nManager.forceRTL(shouldUseRtl);
  }
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: englishResources },
    he: { translation: hebrewResources },
  },
  lng: deviceLanguage,
  initAsync: false,
  fallbackLng: 'en',
  supportedLngs: ['en', 'he'],
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

export async function restoreStoredLanguage(): Promise<void> {
  const storedLanguage = await AsyncStorage.getItem(languageStorageKey);

  if (!storedLanguage) {
    return;
  }

  const language = normalizeLanguage(storedLanguage);
  configureNativeDirection(language);
  await i18n.changeLanguage(language);
}

export async function setAppLanguage(language: AppLanguage): Promise<void> {
  configureNativeDirection(language);
  await i18n.changeLanguage(language);
  await AsyncStorage.setItem(languageStorageKey, language);
}

export function formatLocalizedDate(date: Date, language: string): string {
  return new Intl.DateTimeFormat(normalizeLanguage(language), {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(date);
}

export { i18n };
