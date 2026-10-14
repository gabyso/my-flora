import type { PropsWithChildren } from 'react';
import { ScrollView, type ScrollViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useLayoutDirection } from '@mobile/i18n/use-layout-direction';

interface ScreenProps extends ScrollViewProps {
  className?: string;
}

export function Screen({
  children,
  className = '',
  contentContainerStyle,
  style,
  ...scrollViewProps
}: PropsWithChildren<ScreenProps>) {
  const { direction } = useLayoutDirection();

  return (
    <SafeAreaView
      className="flex-1 bg-canvas"
      edges={['top', 'right', 'left']}
      style={[{ direction }, style]}
    >
      <ScrollView
        className={'flex-1 ' + className}
        contentContainerClassName="grow px-5 pb-10 pt-4"
        contentContainerStyle={[{ direction }, contentContainerStyle]}
        keyboardShouldPersistTaps="handled"
        {...scrollViewProps}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
