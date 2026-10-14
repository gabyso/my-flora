import { PlantSchema, PlantsResponseSchema } from '@my-flora/shared/plants';
import { afterEach, describe, expect, it } from 'vitest';

import { buildApp } from '../../app';

const appsToClose: Awaited<ReturnType<typeof buildApp>>[] = [];

afterEach(async () => {
  await Promise.all(appsToClose.splice(0).map((app) => app.close()));
});

async function createTestApp() {
  const app = await buildApp();
  appsToClose.push(app);
  return app;
}

describe('plant routes', () => {
  it('creates, lists, and retrieves a plant', async () => {
    const app = await createTestApp();
    const createResponse = await app.inject({
      method: 'POST',
      url: '/plants',
      payload: {
        nickname: '  Olive  ',
        species: 'Olea europaea',
      },
    });

    expect(createResponse.statusCode).toBe(201);
    const createdPlant = PlantSchema.parse(createResponse.json());
    expect(createdPlant).toMatchObject({
      nickname: 'Olive',
      species: 'Olea europaea',
      healthStatus: 'unknown',
    });

    const listResponse = await app.inject({
      method: 'GET',
      url: '/plants',
    });
    expect(PlantsResponseSchema.parse(listResponse.json()).plants).toEqual([createdPlant]);

    const detailsResponse = await app.inject({
      method: 'GET',
      url: '/plants/' + createdPlant.id,
    });
    expect(PlantSchema.parse(detailsResponse.json())).toEqual(createdPlant);
  });

  it('rejects an empty nickname at the HTTP boundary', async () => {
    const app = await createTestApp();
    const response = await app.inject({
      method: 'POST',
      url: '/plants',
      payload: {
        nickname: '   ',
      },
    });

    expect(response.statusCode).toBe(400);
  });

  it('returns not found for an unknown plant', async () => {
    const app = await createTestApp();
    const response = await app.inject({
      method: 'GET',
      url: '/plants/66bd8fab-e294-42f2-8954-fcf12c286175',
    });

    expect(response.statusCode).toBe(404);
  });
});
