import { TextInput, type TextInputProps, View } from 'react-native';

import { useLayoutDirection } from '@mobile/i18n/use-layout-direction';

import { AppText } from './app-text';

interface FormFieldProps extends TextInputProps {
  error?: string | undefined;
  label: string;
}

export function FormField({ error, label, style, ...textInputProps }: FormFieldProps) {
  const { isRtl } = useLayoutDirection();

  return (
    <View className="gap-2">
      <AppText className="font-semibold">{label}</AppText>
      <TextInput
        accessibilityLabel={label}
        className={
          'min-h-14 rounded-control border bg-card px-4 text-base text-ink ' +
          (error ? 'border-danger-600' : 'border-line')
        }
        placeholderTextColor="#7C8984"
        style={[
          {
            textAlign: isRtl ? 'right' : 'left',
            writingDirection: isRtl ? 'rtl' : 'ltr',
          },
          style,
        ]}
        {...textInputProps}
      />
      {error ? (
        <AppText className="text-danger-600" variant="caption">
          {error}
        </AppText>
      ) : null}
    </View>
  );
}
