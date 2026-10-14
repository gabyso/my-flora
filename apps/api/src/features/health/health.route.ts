import { HealthResponseSchema, type HealthResponse } from '@my-flora/shared/health';
import type { FastifyPluginAsync } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

const apiVersion = '0.1.0';

export const registerHealthRoutes: FastifyPluginAsync = async (app) => {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/health',
    {
      schema: {
        response: {
          200: HealthResponseSchema,
        },
      },
    },
    async (): Promise<HealthResponse> => ({
      status: 'ok',
      service: 'my-flora-api',
      version: apiVersion,
      timestamp: new Date().toISOString(),
    }),
  );
};
