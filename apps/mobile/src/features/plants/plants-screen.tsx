import { useMemo, useState } from 'react';
import { FlatList, Pressable, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLayoutDirection } from '@mobile/i18n/use-layout-direction';
import { AppText } from '@mobile/ui/app-text';
import { EmptyState } from '@mobile/ui/empty-state';
import { ErrorState } from '@mobile/ui/error-state';
import { LoadingState } from '@mobile/ui/loading-state';

import { filterPlants } from './filter-plants';
import { PlantCard } from './plant-card';
import { usePlants } from './plant-queries';

export function PlantsScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { direction, isRtl } = useLayoutDirection();
  const [searchTerm, setSearchTerm] = useState('');
  const plantsQuery = usePlants();
  const filteredPlants = useMemo(
    () => filterPlants(plantsQuery.data?.plants ?? [], searchTerm),
    [plantsQuery.data?.plants, searchTerm],
  );

  function openAddPlant(): void {
    router.push('/plants/new');
  }

  if (plantsQuery.isPending) {
    return (
      <SafeAreaView className="flex-1 bg-canvas" style={{ direction }}>
        <LoadingState label={t('plants.loading')} />
      </SafeAreaView>
    );
  }

  if (plantsQuery.isError) {
    return (
      <SafeAreaView className="flex-1 bg-canvas p-5" style={{ direction }}>
        <ErrorState
          actionLabel={t('common.retry')}
          description={t('errors.plantsUnavailableDescription')}
          onRetry={() => {
            void plantsQuery.refetch();
          }}
          title={t('errors.plantsUnavailableTitle')}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className="flex-1 bg-canvas"
      edges={['top', 'left', 'right']}
      style={{ direction }}
    >
      <StatusBar style="dark" />
      <FlatList
        contentContainerClassName="grow px-5 pb-8 pt-4"
        data={filteredPlants}
        initialNumToRender={8}
        ItemSeparatorComponent={() => <View className="h-4" />}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(plant) => plant.id}
        ListEmptyComponent={
          searchTerm ? (
            <View className="items-center py-16">
              <AppText className="mb-2" variant="heading">
                {t('plants.noSearchResultsTitle')}
              </AppText>
              <AppText tone="muted">{t('plants.noSearchResultsDescription')}</AppText>
            </View>
          ) : (
            <EmptyState
              actionLabel={t('plants.addPlant')}
              description={t('plants.emptyDescription')}
              onAction={openAddPlant}
              title={t('plants.emptyTitle')}
            />
          )
        }
        ListHeaderComponent={
          <View className="mb-6 gap-5">
            <View className="flex-row items-center justify-between gap-4" style={{ direction }}>
              <View className="flex-1">
                <AppText variant="title">{t('plants.title')}</AppText>
                <AppText tone="muted">
                  {t('plants.collectionCount', { count: plantsQuery.data.plants.length })}
                </AppText>
              </View>
              <Pressable
                accessibilityLabel={t('plants.addPlant')}
                accessibilityRole="button"
                className="h-12 w-12 items-center justify-center rounded-full bg-leaf-600"
                onPress={openAddPlant}
              >
                <AppText className="text-center text-2xl" tone="onPrimary">
                  +
                </AppText>
              </Pressable>
            </View>
            {plantsQuery.data.plants.length > 0 ? (
              <TextInput
                accessibilityLabel={t('plants.searchLabel')}
                className="min-h-12 rounded-control border border-line bg-card px-4 text-base text-ink"
                onChangeText={setSearchTerm}
                placeholder={t('plants.searchPlaceholder')}
                placeholderTextColor="#7C8984"
                returnKeyType="search"
                style={{
                  textAlign: isRtl ? 'right' : 'left',
                  writingDirection: isRtl ? 'rtl' : 'ltr',
                }}
                value={searchTerm}
              />
            ) : null}
          </View>
        }
        renderItem={({ item }) => (
          <PlantCard
            onPress={() => {
              router.push({
                pathname: '/plants/[plantId]',
                params: { plantId: item.id },
              });
            }}
            plant={item}
          />
        )}
      />
    </SafeAreaView>
  );
}
