import { z } from 'zod';

const PostgreSqlUrlSchema = z
  .url()
  .refine(
    (databaseUrl) =>
      databaseUrl.startsWith('postgresql://') || databaseUrl.startsWith('postgres://'),
    'DATABASE_URL must use the PostgreSQL protocol',
  );

export const ApiEnvironmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_HOST: z.string().min(1).default('0.0.0.0'),
  API_PORT: z.coerce.number().int().min(1).max(65_535).optional(),
  PORT: z.coerce.number().int().min(1).max(65_535).optional(),
  API_CORS_ORIGIN: z.string().min(1).default('*'),
  DATABASE_URL: PostgreSqlUrlSchema,
});

export type ApiEnvironment = z.infer<typeof ApiEnvironmentSchema> & {
  API_PORT: number;
};

export function parseApiEnvironment(source: NodeJS.ProcessEnv = process.env): ApiEnvironment {
  const parsedEnvironment = ApiEnvironmentSchema.parse(source);

  return {
    ...parsedEnvironment,
    API_PORT: parsedEnvironment.API_PORT ?? parsedEnvironment.PORT ?? 3000,
  };
}
