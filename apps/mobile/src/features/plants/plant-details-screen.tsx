import { Image, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { AppText } from '@mobile/ui/app-text';
import { BackButton } from '@mobile/ui/back-button';
import { Card } from '@mobile/ui/card';
import { ErrorState } from '@mobile/ui/error-state';
import { HealthBadge } from '@mobile/ui/health-badge';
import { LoadingState } from '@mobile/ui/loading-state';
import { Screen } from '@mobile/ui/screen';

import { usePlant } from './plant-queries';

export function PlantDetailsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const params = useLocalSearchParams<{ plantId?: string | string[] }>();
  const plantId = typeof params.plantId === 'string' ? params.plantId : null;
  const plantQuery = usePlant(plantId);

  if (plantQuery.isPending) {
    return (
      <Screen>
        <BackButton onPress={() => router.back()} />
        <LoadingState label={t('plantDetails.loading')} />
      </Screen>
    );
  }

  if (plantQuery.isError || !plantQuery.data) {
    return (
      <Screen>
        <BackButton onPress={() => router.back()} />
        <View className="mt-6">
          <ErrorState
            actionLabel={t('common.retry')}
            description={t('errors.plantUnavailableDescription')}
            onRetry={() => {
              void plantQuery.refetch();
            }}
            title={t('errors.plantUnavailableTitle')}
          />
        </View>
      </Screen>
    );
  }

  const plant = plantQuery.data;

  return (
    <Screen>
      <BackButton onPress={() => router.back()} />

      {plant.imageUrl ? (
        <Image
          accessibilityLabel={t('plantDetails.photoLabel', { nickname: plant.nickname })}
          className="mb-6 mt-4 h-56 w-full rounded-control bg-leaf-100"
          resizeMode="cover"
          source={{ uri: plant.imageUrl }}
        />
      ) : (
        <View className="mb-6 mt-4 h-56 w-full items-center justify-center rounded-control bg-leaf-100">
          <AppText className="text-6xl text-leaf-700">✦</AppText>
        </View>
      )}

      <View className="mb-8">
        <AppText className="mb-1" variant="title">
          {plant.nickname}
        </AppText>
        <AppText tone="muted">{plant.species ?? t('plants.unknownSpecies')}</AppText>
      </View>

      <AppText className="mb-3" variant="eyebrow">
        {t('plantDetails.doNow')}
      </AppText>
      <Card className="mb-8 border-leaf-100 bg-leaf-50">
        <AppText className="mb-2" variant="heading">
          {t('plantDetails.firstScanTitle')}
        </AppText>
        <AppText tone="muted">{t('plantDetails.firstScanDescription')}</AppText>
      </Card>

      <AppText className="mb-3" variant="eyebrow">
        {t('plantDetails.status')}
      </AppText>
      <Card className="mb-8">
        <HealthBadge status={plant.healthStatus} />
        <AppText className="mt-4" tone="muted">
          {t('plantDetails.statusUnknownDescription')}
        </AppText>
      </Card>

      <AppText className="mb-3" variant="eyebrow">
        {t('plantDetails.careSchedule')}
      </AppText>
      <Card className="mb-8">
        <AppText className="font-semibold">{t('plantDetails.noScheduleTitle')}</AppText>
        <AppText className="mt-2" tone="muted">
          {t('plantDetails.noScheduleDescription')}
        </AppText>
      </Card>

      <AppText className="mb-3" variant="eyebrow">
        {t('plantDetails.history')}
      </AppText>
      <Card>
        <AppText tone="muted">{t('plantDetails.noHistory')}</AppText>
      </Card>
    </Screen>
  );
}
