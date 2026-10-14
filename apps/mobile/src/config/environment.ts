import { z } from 'zod';

const developmentApiUrl = 'http://localhost:3000';

const MobileEnvironmentSchema = z.object({
  EXPO_PUBLIC_API_URL: z.url().transform((apiUrl) => apiUrl.replace(/\/$/, '')),
});

const configuredApiUrl =
  process.env.EXPO_PUBLIC_API_URL ?? (__DEV__ ? developmentApiUrl : undefined);

export const mobileEnvironment = MobileEnvironmentSchema.parse({
  EXPO_PUBLIC_API_URL: configuredApiUrl,
});
