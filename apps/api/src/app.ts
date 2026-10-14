import cors from '@fastify/cors';
import Fastify, { type FastifyInstance } from 'fastify';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import type { ApiEnvironment } from './config/environment';
import { registerHealthRoutes } from './features/health/health.route';
import { InMemoryPlantRepository } from './features/plants/in-memory-plant.repository';
import { PlantNotFoundError } from './features/plants/plant.errors';
import type { PlantRepository } from './features/plants/plant.repository';
import { registerPlantRoutes } from './features/plants/plant.route';
import { PlantService } from './features/plants/plant.service';

export interface BuildAppOptions {
  environment?: Pick<ApiEnvironment, 'API_CORS_ORIGIN'>;
  logger?: boolean;
  plantRepository?: PlantRepository;
}

function hasValidationIssues(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'validation' in error &&
    Array.isArray(error.validation)
  );
}

export async function buildApp(options: BuildAppOptions = {}): Promise<FastifyInstance> {
  const app = Fastify({
    logger: options.logger ?? false,
  });

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.setErrorHandler((error, request, reply) => {
    if (error instanceof PlantNotFoundError) {
      void reply.status(404).send({
        error: 'plant_not_found',
        message: 'The requested plant was not found.',
      });
      return;
    }

    if (hasValidationIssues(error)) {
      void reply.status(400).send({
        error: 'validation_error',
        message: 'The request contains invalid data.',
      });
      return;
    }

    request.log.error({ error }, 'Request failed');
    void reply.status(500).send({
      error: 'internal_server_error',
      message: 'The service could not complete the request.',
    });
  });

  await app.register(cors, {
    origin: options.environment?.API_CORS_ORIGIN ?? '*',
  });
  await app.register(registerHealthRoutes);
  const plantRepository = options.plantRepository ?? new InMemoryPlantRepository();
  await app.register(registerPlantRoutes, {
    plantService: new PlantService(plantRepository),
  });

  return app;
}
