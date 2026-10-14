import { View } from 'react-native';

import { AppText } from './app-text';
import { Button } from './button';
import { Card } from './card';

interface EmptyStateProps {
  actionLabel: string;
  description: string;
  onAction: () => void;
  title: string;
}

export function EmptyState({ actionLabel, description, onAction, title }: EmptyStateProps) {
  return (
    <Card>
      <View
        accessibilityElementsHidden
        className="mb-6 h-16 w-16 items-center justify-center rounded-full bg-leaf-100"
        importantForAccessibility="no-hide-descendants"
      >
        <AppText className="text-3xl text-leaf-700">✦</AppText>
      </View>
      <AppText className="mb-2" variant="heading">
        {title}
      </AppText>
      <AppText className="mb-7" tone="muted">
        {description}
      </AppText>
      <Button label={actionLabel} onPress={onAction} />
    </Card>
  );
}
