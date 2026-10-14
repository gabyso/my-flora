import '../../global.css';
import 'react-native-gesture-handler';

import { Stack } from 'expo-router';

import '@mobile/i18n/config';
import { AppProviders } from '@mobile/providers/app-providers';
import { useLayoutDirection } from '@mobile/i18n/use-layout-direction';

function RootNavigator() {
  const { isRtl } = useLayoutDirection();

  return (
    <Stack
      screenOptions={{
        animation: isRtl ? 'slide_from_left' : 'slide_from_right',
        contentStyle: { backgroundColor: '#F6F4EC' },
        headerShown: false,
      }}
    />
  );
}

export default function RootLayout() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
