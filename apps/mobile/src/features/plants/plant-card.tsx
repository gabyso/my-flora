import type { Plant } from '@my-flora/shared/plants';
import { Image, Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useLayoutDirection } from '@mobile/i18n/use-layout-direction';
import { AppText } from '@mobile/ui/app-text';
import { Card } from '@mobile/ui/card';
import { HealthBadge } from '@mobile/ui/health-badge';

interface PlantCardProps {
  onPress: () => void;
  plant: Plant;
}

export function PlantCard({ onPress, plant }: PlantCardProps) {
  const { t } = useTranslation();
  const { direction, directionalArrow } = useLayoutDirection();

  return (
    <Pressable
      accessibilityHint={t('plants.openPlantHint')}
      accessibilityLabel={plant.nickname}
      accessibilityRole="button"
      onPress={onPress}
    >
      <Card>
        <View className="flex-row gap-4" style={{ direction }}>
          {plant.imageUrl ? (
            <Image
              accessibilityLabel={t('plants.photoLabel', { nickname: plant.nickname })}
              className="h-20 w-20 rounded-control bg-leaf-100"
              resizeMode="cover"
              source={{ uri: plant.imageUrl }}
            />
          ) : (
            <View className="h-20 w-20 items-center justify-center rounded-control bg-leaf-100">
              <AppText className="text-3xl text-leaf-700">✦</AppText>
            </View>
          )}
          <View className="flex-1 gap-1">
            <AppText className="font-semibold" variant="heading">
              {plant.nickname}
            </AppText>
            <AppText tone="muted" variant="caption">
              {plant.species ?? t('plants.unknownSpecies')}
            </AppText>
            <View className="mt-2">
              <HealthBadge status={plant.healthStatus} />
            </View>
          </View>
          <View className="justify-center">
            <AppText className="text-leaf-700" variant="heading">
              {directionalArrow}
            </AppText>
          </View>
        </View>
        <View className="mt-4 border-t border-line pt-4">
          <AppText className="font-medium" variant="caption">
            {plant.nextAction ?? t('plants.noRecommendation')}
          </AppText>
        </View>
      </Card>
    </Pressable>
  );
}
