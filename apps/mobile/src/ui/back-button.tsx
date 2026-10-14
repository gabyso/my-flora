import { Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useLayoutDirection } from '@mobile/i18n/use-layout-direction';

import { AppText } from './app-text';

interface BackButtonProps {
  onPress: () => void;
}

export function BackButton({ onPress }: BackButtonProps) {
  const { t } = useTranslation();
  const { directionalArrow } = useLayoutDirection();

  return (
    <Pressable
      accessibilityLabel={t('common.back')}
      accessibilityRole="button"
      className="min-h-12 min-w-12 items-center justify-center self-start rounded-full bg-card"
      onPress={onPress}
    >
      <AppText className="rotate-180 text-leaf-700" variant="heading">
        {directionalArrow}
      </AppText>
    </Pressable>
  );
}
