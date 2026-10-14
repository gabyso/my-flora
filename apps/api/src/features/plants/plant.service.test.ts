import { describe, expect, it } from 'vitest';

import { InMemoryPlantRepository } from './in-memory-plant.repository';
import { PlantNotFoundError } from './plant.errors';
import { PlantService } from './plant.service';

const plantId = '66bd8fab-e294-42f2-8954-fcf12c286175';
const timestamp = new Date('2026-09-09T08:00:00.000Z');

describe('PlantService', () => {
  it('creates a plant with safe initial care state', async () => {
    const repository = new InMemoryPlantRepository();
    const service = new PlantService(repository, {
      clock: () => timestamp,
      createId: () => plantId,
    });

    await expect(
      service.createPlant({
        nickname: 'Olive',
        species: null,
      }),
    ).resolves.toEqual({
      id: plantId,
      nickname: 'Olive',
      species: null,
      imageUrl: null,
      healthStatus: 'unknown',
      nextAction: null,
      createdAt: timestamp.toISOString(),
      updatedAt: timestamp.toISOString(),
    });
  });

  it('throws a domain error for an unknown plant', async () => {
    const service = new PlantService(new InMemoryPlantRepository());

    await expect(service.getPlant(plantId)).rejects.toBeInstanceOf(PlantNotFoundError);
  });
});
