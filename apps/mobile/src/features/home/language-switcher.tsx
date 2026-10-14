import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { setAppLanguage } from '@mobile/i18n/config';
import type { AppLanguage } from '@mobile/i18n/direction';
import { useLayoutDirection } from '@mobile/i18n/use-layout-direction';
import { AppText } from '@mobile/ui/app-text';

interface LanguageOption {
  accessibilityLabel: string;
  label: string;
  value: AppLanguage;
}

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const { direction, language } = useLayoutDirection();
  const options: LanguageOption[] = [
    {
      accessibilityLabel: t('language.changeToEnglish'),
      label: t('common.english'),
      value: 'en',
    },
    {
      accessibilityLabel: t('language.changeToHebrew'),
      label: t('common.hebrew'),
      value: 'he',
    },
  ];

  return (
    <View
      accessibilityLabel={t('language.label')}
      className="flex-row rounded-full border border-line bg-card p-1"
      style={{ direction }}
    >
      {options.map((option) => {
        const isSelected = option.value === language;

        return (
          <Pressable
            accessibilityLabel={option.accessibilityLabel}
            accessibilityRole="button"
            accessibilityState={{ selected: isSelected }}
            className={isSelected ? 'rounded-full bg-leaf-100 px-3 py-2' : 'px-3 py-2'}
            key={option.value}
            onPress={() => {
              void setAppLanguage(option.value);
            }}
          >
            <AppText className={isSelected ? 'font-semibold text-leaf-700' : ''} variant="caption">
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}
