import { ActivityIndicator, View } from 'react-native';

import { AppText } from './app-text';

interface LoadingStateProps {
  label: string;
}

export function LoadingState({ label }: LoadingStateProps) {
  return (
    <View
      accessibilityLabel={label}
      accessibilityRole="progressbar"
      className="flex-1 items-center justify-center gap-3 py-16"
    >
      <ActivityIndicator color="#3D7450" size="large" />
      <AppText tone="muted">{label}</AppText>
    </View>
  );
}
