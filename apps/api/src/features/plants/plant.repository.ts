import type { Plant } from '@my-flora/shared/plants';

export interface PlantRepository {
  create(plant: Plant): Promise<Plant>;
  findAll(): Promise<Plant[]>;
  findById(plantId: string): Promise<Plant | null>;
}
