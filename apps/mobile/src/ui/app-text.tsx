import type { PropsWithChildren } from 'react';
import { Text, type TextProps, type TextStyle } from 'react-native';

import { useLayoutDirection } from '@mobile/i18n/use-layout-direction';

type TextVariant = 'body' | 'caption' | 'eyebrow' | 'heading' | 'title';
type TextTone = 'default' | 'muted' | 'onPrimary';

interface AppTextProps extends TextProps {
  className?: string;
  tone?: TextTone;
  variant?: TextVariant;
}

const variantClasses: Record<TextVariant, string> = {
  body: 'text-base leading-6',
  caption: 'text-sm leading-5',
  eyebrow: 'text-xs font-semibold uppercase tracking-widest',
  heading: 'text-2xl font-semibold leading-8',
  title: 'text-4xl font-semibold leading-[44px]',
};

const toneClasses: Record<TextTone, string> = {
  default: 'text-ink',
  muted: 'text-muted',
  onPrimary: 'text-white',
};

export function AppText({
  children,
  className = '',
  style,
  tone = 'default',
  variant = 'body',
  ...textProps
}: PropsWithChildren<AppTextProps>) {
  const { isRtl } = useLayoutDirection();
  const directionStyle: TextStyle = {
    textAlign: isRtl ? 'right' : 'left',
    writingDirection: isRtl ? 'rtl' : 'ltr',
  };

  return (
    <Text
      className={[variantClasses[variant], toneClasses[tone], className].join(' ')}
      style={[directionStyle, style]}
      {...textProps}
    >
      {children}
    </Text>
  );
}
