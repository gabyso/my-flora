import type { PlantHealthStatus } from '@my-flora/shared/plants';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppText } from './app-text';

interface HealthBadgeProps {
  status: PlantHealthStatus;
}

const statusClasses: Record<PlantHealthStatus, string> = {
  healthy: 'bg-leaf-100',
  needs_attention: 'bg-warning-50',
  unknown: 'bg-canvas',
};

const indicatorClasses: Record<PlantHealthStatus, string> = {
  healthy: 'bg-leaf-500',
  needs_attention: 'bg-warning-600',
  unknown: 'bg-muted',
};

export function HealthBadge({ status }: HealthBadgeProps) {
  const { t } = useTranslation();

  return (
    <View
      className={
        'flex-row items-center gap-2 self-start rounded-full px-3 py-1.5 ' + statusClasses[status]
      }
    >
      <View className={'h-2 w-2 rounded-full ' + indicatorClasses[status]} />
      <AppText className="font-medium" variant="caption">
        {t('health.' + status)}
      </AppText>
    </View>
  );
}
