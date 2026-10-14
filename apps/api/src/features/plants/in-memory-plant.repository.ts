import type { Plant } from '@my-flora/shared/plants';

import type { PlantRepository } from './plant.repository';

export class InMemoryPlantRepository implements PlantRepository {
  private readonly plants = new Map<string, Plant>();

  public constructor(initialPlants: Plant[] = []) {
    for (const plant of initialPlants) {
      this.plants.set(plant.id, plant);
    }
  }

  public async create(plant: Plant): Promise<Plant> {
    this.plants.set(plant.id, plant);
    return plant;
  }

  public async findAll(): Promise<Plant[]> {
    return [...this.plants.values()].sort((firstPlant, secondPlant) =>
      secondPlant.createdAt.localeCompare(firstPlant.createdAt),
    );
  }

  public async findById(plantId: string): Promise<Plant | null> {
    return this.plants.get(plantId) ?? null;
  }
}
