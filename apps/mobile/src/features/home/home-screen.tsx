import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StatusBar } from 'expo-status-bar';

import { usePlants } from '@mobile/features/plants/plant-queries';
import { formatLocalizedDate } from '@mobile/i18n/config';
import { useLayoutDirection } from '@mobile/i18n/use-layout-direction';
import { AppText } from '@mobile/ui/app-text';
import { Button } from '@mobile/ui/button';
import { Card } from '@mobile/ui/card';
import { EmptyState } from '@mobile/ui/empty-state';
import { ErrorState } from '@mobile/ui/error-state';
import { LoadingState } from '@mobile/ui/loading-state';
import { Screen } from '@mobile/ui/screen';

import { ConnectionStatus } from './connection-status';
import { LanguageSwitcher } from './language-switcher';

export function HomeScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { direction, language } = useLayoutDirection();
  const plantsQuery = usePlants();
  const localizedDate = formatLocalizedDate(new Date(), language);

  function openAddPlant(): void {
    router.push('/plants/new');
  }

  function openPlants(): void {
    router.push('/plants');
  }

  return (
    <Screen>
      <StatusBar style="dark" />

      <View className="mb-12 flex-row items-center justify-between gap-4" style={{ direction }}>
        <View className="flex-1">
          <AppText className="font-semibold text-leaf-700" variant="heading">
            {t('common.appName')}
          </AppText>
        </View>
        <LanguageSwitcher />
      </View>

      <AppText className="mb-3 text-leaf-700" variant="eyebrow">
        {t('home.eyebrow')} · {localizedDate}
      </AppText>
      <AppText className="mb-8" variant="title">
        {t('home.title')}
      </AppText>

      {plantsQuery.isPending ? (
        <LoadingState label={t('plants.loading')} />
      ) : plantsQuery.isError ? (
        <ErrorState
          actionLabel={t('common.retry')}
          description={t('errors.plantsUnavailableDescription')}
          onRetry={() => {
            void plantsQuery.refetch();
          }}
          title={t('errors.plantsUnavailableTitle')}
        />
      ) : plantsQuery.data.plants.length === 0 ? (
        <EmptyState
          actionLabel={t('home.addPlant')}
          description={t('home.allClearBody')}
          onAction={openAddPlant}
          title={t('home.allClearTitle')}
        />
      ) : (
        <Card>
          <AppText className="mb-2" variant="heading">
            {t('home.growingTitle')}
          </AppText>
          <AppText className="mb-7" tone="muted">
            {t('home.plantCount', { count: plantsQuery.data.plants.length })}
          </AppText>
          <View className="gap-3">
            <Button label={t('home.viewPlants')} onPress={openPlants} />
            <Button
              label={t('home.addAnotherPlant')}
              onPress={openAddPlant}
              showArrow={false}
              variant="secondary"
            />
          </View>
        </Card>
      )}

      <ConnectionStatus />
    </Screen>
  );
}
