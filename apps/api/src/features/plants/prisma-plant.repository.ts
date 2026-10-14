import type { Plant } from '@my-flora/shared/plants';

import type { PrismaClient } from '../../generated/prisma/client';
import type { PlantRepository } from './plant.repository';

function toDomainPlant(record: {
  id: string;
  nickname: string;
  species: string | null;
  imageUrl: string | null;
  healthStatus: string;
  nextAction: string | null;
  createdAt: Date;
  updatedAt: Date;
}): Plant {
  return {
    id: record.id,
    nickname: record.nickname,
    species: record.species,
    imageUrl: record.imageUrl,
    healthStatus: record.healthStatus as Plant['healthStatus'],
    nextAction: record.nextAction,
    createdAt: record.createdAt.toISOString(),
    updatedAt: record.updatedAt.toISOString(),
  };
}

export class PrismaPlantRepository implements PlantRepository {
  public constructor(private readonly prisma: PrismaClient) {}

  public async create(plant: Plant): Promise<Plant> {
    const createdPlant = await this.prisma.plant.create({
      data: {
        id: plant.id,
        nickname: plant.nickname,
        species: plant.species,
        imageUrl: plant.imageUrl,
        healthStatus: plant.healthStatus,
        nextAction: plant.nextAction,
        createdAt: new Date(plant.createdAt),
        updatedAt: new Date(plant.updatedAt),
      },
    });

    return toDomainPlant(createdPlant);
  }

  public async findAll(): Promise<Plant[]> {
    const plants = await this.prisma.plant.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return plants.map(toDomainPlant);
  }

  public async findById(plantId: string): Promise<Plant | null> {
    const plant = await this.prisma.plant.findUnique({
      where: { id: plantId },
    });

    return plant ? toDomainPlant(plant) : null;
  }
}
