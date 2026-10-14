import { ActivityIndicator, Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useHealthCheck } from '@mobile/features/health/use-health-check';
import { AppText } from '@mobile/ui/app-text';

export function ConnectionStatus() {
  const { t } = useTranslation();
  const healthCheck = useHealthCheck();

  if (healthCheck.isPending) {
    return (
      <View className="mt-5 flex-row items-center gap-2">
        <ActivityIndicator color="#66766F" size="small" />
        <AppText tone="muted" variant="caption">
          {t('home.serviceChecking')}
        </AppText>
      </View>
    );
  }

  if (healthCheck.isError) {
    return (
      <Pressable
        accessibilityRole="button"
        className="mt-5 min-h-11 flex-row items-center gap-2"
        onPress={() => {
          void healthCheck.refetch();
        }}
      >
        <View className="h-2.5 w-2.5 rounded-full bg-danger-600" />
        <AppText className="flex-1 text-danger-600" variant="caption">
          {t('home.serviceUnavailable')}
        </AppText>
        <AppText className="font-semibold text-danger-600" variant="caption">
          {t('common.retry')}
        </AppText>
      </Pressable>
    );
  }

  return (
    <View className="mt-5 flex-row items-center gap-2">
      <View className="h-2.5 w-2.5 rounded-full bg-leaf-500" />
      <AppText tone="muted" variant="caption">
        {t('home.serviceReady')}
      </AppText>
    </View>
  );
}
