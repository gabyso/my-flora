import { View } from 'react-native';

import { AppText } from './app-text';
import { Button } from './button';

interface ErrorStateProps {
  actionLabel: string;
  description: string;
  onRetry: () => void;
  title: string;
}

export function ErrorState({ actionLabel, description, onRetry, title }: ErrorStateProps) {
  return (
    <View className="items-stretch gap-3 rounded-card border border-danger-600 bg-danger-50 p-5">
      <AppText className="font-semibold text-danger-600" variant="heading">
        {title}
      </AppText>
      <AppText className="text-danger-600">{description}</AppText>
      <Button label={actionLabel} onPress={onRetry} showArrow={false} variant="secondary" />
    </View>
  );
}
