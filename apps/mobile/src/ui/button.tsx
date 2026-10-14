import type { PropsWithChildren } from 'react';
import { ActivityIndicator, Pressable, type PressableProps, View } from 'react-native';

import { useLayoutDirection } from '@mobile/i18n/use-layout-direction';

import { AppText } from './app-text';

interface ButtonProps extends PressableProps {
  isLoading?: boolean;
  label: string;
  showArrow?: boolean;
  variant?: 'primary' | 'secondary';
}

const buttonClasses = {
  primary: 'bg-leaf-600 active:bg-leaf-700',
  secondary: 'border border-leaf-600 bg-transparent active:bg-leaf-50',
} as const;

export function Button({
  children,
  disabled,
  isLoading = false,
  label,
  showArrow = true,
  style,
  variant = 'primary',
  ...pressableProps
}: PropsWithChildren<ButtonProps>) {
  const { direction, directionalArrow } = useLayoutDirection();
  const isDisabled = disabled || isLoading;
  const textTone = variant === 'primary' ? 'onPrimary' : 'default';

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      className={
        'min-h-12 justify-center rounded-control px-5 disabled:opacity-50 ' + buttonClasses[variant]
      }
      disabled={isDisabled}
      style={(pressableState) => [
        { direction },
        typeof style === 'function' ? style(pressableState) : style,
      ]}
      {...pressableProps}
    >
      <View className="flex-row items-center justify-between gap-3">
        <AppText
          className={showArrow ? 'flex-1 font-semibold' : 'flex-1 text-center font-semibold'}
          tone={textTone}
        >
          {children ?? label}
        </AppText>
        {isLoading ? (
          <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : '#3D7450'} />
        ) : showArrow ? (
          <AppText
            accessibilityElementsHidden
            className={variant === 'secondary' ? 'text-leaf-700' : ''}
            importantForAccessibility="no-hide-descendants"
            tone={textTone}
            variant="heading"
          >
            {directionalArrow}
          </AppText>
        ) : null}
      </View>
    </Pressable>
  );
}
