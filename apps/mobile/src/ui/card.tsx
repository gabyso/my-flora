import type { PropsWithChildren } from 'react';
import { View, type ViewProps } from 'react-native';

import { useLayoutDirection } from '@mobile/i18n/use-layout-direction';

interface CardProps extends ViewProps {
  className?: string;
}

export function Card({
  children,
  className = '',
  style,
  ...viewProps
}: PropsWithChildren<CardProps>) {
  const { direction } = useLayoutDirection();

  return (
    <View
      className={'rounded-card border border-line bg-card p-5 ' + className}
      style={[{ direction }, style]}
      {...viewProps}
    >
      {children}
    </View>
  );
}
