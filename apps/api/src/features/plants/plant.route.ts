import {
  CreatePlantInputSchema,
  PlantRouteParamsSchema,
  PlantSchema,
  PlantsResponseSchema,
} from '@my-flora/shared/plants';
import type { FastifyPluginAsync } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';

import type { PlantService } from './plant.service';

interface PlantRouteOptions {
  plantService: PlantService;
}

export const registerPlantRoutes: FastifyPluginAsync<PlantRouteOptions> = async (app, options) => {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();

  typedApp.get(
    '/plants',
    {
      schema: {
        response: {
          200: PlantsResponseSchema,
        },
      },
    },
    async () => ({
      plants: await options.plantService.listPlants(),
    }),
  );

  typedApp.get(
    '/plants/:plantId',
    {
      schema: {
        params: PlantRouteParamsSchema,
        response: {
          200: PlantSchema,
        },
      },
    },
    async (request) => options.plantService.getPlant(request.params.plantId),
  );

  typedApp.post(
    '/plants',
    {
      schema: {
        body: CreatePlantInputSchema,
        response: {
          201: PlantSchema,
        },
      },
    },
    async (request, reply) => {
      const plant = await options.plantService.createPlant(request.body);
      return reply.status(201).send(plant);
    },
  );
};
