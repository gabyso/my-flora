import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import { CreatePlantInputSchema } from '@my-flora/shared/plants';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { AppText } from '@mobile/ui/app-text';
import { BackButton } from '@mobile/ui/back-button';
import { Button } from '@mobile/ui/button';
import { FormField } from '@mobile/ui/form-field';
import { Screen } from '@mobile/ui/screen';

import { useCreatePlant } from './plant-queries';

interface AddPlantFormValues {
  nickname: string;
  species: string;
}

export function AddPlantScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const createPlantMutation = useCreatePlant();
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { control, handleSubmit, setError } = useForm<AddPlantFormValues>({
    defaultValues: {
      nickname: '',
      species: '',
    },
  });

  const submitForm = handleSubmit(async (values) => {
    setSubmissionError(null);
    const result = CreatePlantInputSchema.safeParse({
      ...values,
      imageUrl,
    });

    if (!result.success) {
      for (const issue of result.error.issues) {
        if (issue.path[0] === 'nickname') {
          setError('nickname', {
            message:
              issue.code === 'too_big'
                ? t('validation.nicknameTooLong')
                : t('validation.nicknameRequired'),
          });
        }

        if (issue.path[0] === 'species') {
          setError('species', {
            message: t('validation.speciesTooLong'),
          });
        }
      }
      return;
    }

    try {
      const plant = await createPlantMutation.mutateAsync(result.data);
      router.replace({
        pathname: '/plants/[plantId]',
        params: { plantId: plant.id },
      });
    } catch {
      setSubmissionError(t('errors.createPlantFailed'));
    }
  });

  const pickPhoto = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      setSubmissionError(t('addPlant.photoPermissionDenied'));
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ['images'],
      quality: 0.8,
    });

    if (!pickerResult.canceled) {
      setImageUrl(pickerResult.assets[0]?.uri ?? null);
      setSubmissionError(null);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1"
    >
      <Screen keyboardShouldPersistTaps="handled">
        <BackButton onPress={() => router.back()} />
        <View className="mb-8 mt-6">
          <AppText className="mb-2" variant="title">
            {t('addPlant.title')}
          </AppText>
          <AppText tone="muted">{t('addPlant.description')}</AppText>
        </View>

        <View className="gap-6">
          <Controller
            control={control}
            name="nickname"
            render={({ field, fieldState }) => (
              <FormField
                autoCapitalize="words"
                autoCorrect={false}
                error={fieldState.error?.message}
                label={t('addPlant.nicknameLabel')}
                maxLength={60}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                placeholder={t('addPlant.nicknamePlaceholder')}
                returnKeyType="next"
                value={field.value}
              />
            )}
          />
          <Controller
            control={control}
            name="species"
            render={({ field, fieldState }) => (
              <FormField
                autoCapitalize="words"
                autoCorrect={false}
                error={fieldState.error?.message}
                label={t('addPlant.speciesLabel')}
                maxLength={100}
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                placeholder={t('addPlant.speciesPlaceholder')}
                returnKeyType="done"
                value={field.value}
              />
            )}
          />
          <AppText tone="muted" variant="caption">
            {t('addPlant.speciesHint')}
          </AppText>

          <View className="gap-3">
            <Button
              label={imageUrl ? t('addPlant.changePhoto') : t('addPlant.addPhoto')}
              onPress={() => {
                void pickPhoto();
              }}
              showArrow={false}
              variant="secondary"
            />
            {imageUrl ? (
              <View className="gap-3">
                <Image
                  accessibilityLabel={t('addPlant.photoPreviewLabel')}
                  className="h-40 w-full rounded-control bg-sand-200"
                  resizeMode="cover"
                  source={{ uri: imageUrl }}
                />
                <Button
                  label={t('addPlant.removePhoto')}
                  onPress={() => {
                    setImageUrl(null);
                  }}
                  showArrow={false}
                  variant="secondary"
                />
              </View>
            ) : (
              <AppText tone="muted" variant="caption">
                {t('addPlant.photoHint')}
              </AppText>
            )}
          </View>

          {submissionError ? (
            <AppText className="text-danger-600">{submissionError}</AppText>
          ) : null}

          <Button
            isLoading={createPlantMutation.isPending}
            label={createPlantMutation.isPending ? t('common.saving') : t('addPlant.save')}
            onPress={() => {
              void submitForm();
            }}
            showArrow={false}
          />
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
}
