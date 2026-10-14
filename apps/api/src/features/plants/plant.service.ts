import { randomUUID } from 'node:crypto';

import type { CreatePlantInput, Plant } from '@my-flora/shared/plants';

import { PlantNotFoundError } from './plant.errors';
import type { PlantRepository } from './plant.repository';

export interface PlantServiceOptions {
  clock?: () => Date;
  createId?: () => string;
}

export class PlantService {
  private readonly clock: () => Date;
  private readonly createId: () => string;

  public constructor(
    private readonly plantRepository: PlantRepository,
    options: PlantServiceOptions = {},
  ) {
    this.clock = options.clock ?? (() => new Date());
    this.createId = options.createId ?? randomUUID;
  }

  public async createPlant(input: CreatePlantInput): Promise<Plant> {
    const timestamp = this.clock().toISOString();
    const plant: Plant = {
      id: this.createId(),
      nickname: input.nickname,
      species: input.species ?? null,
      imageUrl: input.imageUrl ?? null,
      healthStatus: 'unknown',
      nextAction: null,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    return this.plantRepository.create(plant);
  }

  public async getPlant(plantId: string): Promise<Plant> {
    const plant = await this.plantRepository.findById(plantId);

    if (!plant) {
      throw new PlantNotFoundError(plantId);
    }

    return plant;
  }

  public async listPlants(): Promise<Plant[]> {
    return this.plantRepository.findAll();
  }
}
