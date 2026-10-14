import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { restoreStoredLanguage } from '@mobile/i18n/config';
import { useLayoutDirection } from '@mobile/i18n/use-layout-direction';

import { QueryProvider } from './query-provider';

export function AppProviders({ children }: PropsWithChildren) {
  const [isLanguageReady, setIsLanguageReady] = useState(false);
  const { direction } = useLayoutDirection();

  useEffect(() => {
    restoreStoredLanguage()
      .catch((error: unknown) => {
        console.warn('Unable to restore the saved app language.', error);
      })
      .finally(() => {
        setIsLanguageReady(true);
      });
  }, []);

  return (
    <GestureHandlerRootView style={styles.fill}>
      <SafeAreaProvider>
        <View style={[styles.fill, { direction }]}>
          {isLanguageReady ? (
            <QueryProvider>{children}</QueryProvider>
          ) : (
            <View style={styles.loading}>
              <ActivityIndicator color="#3D7450" size="small" />
            </View>
          )}
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  loading: {
    alignItems: 'center',
    backgroundColor: '#F6F4EC',
    flex: 1,
    justifyContent: 'center',
  },
});
