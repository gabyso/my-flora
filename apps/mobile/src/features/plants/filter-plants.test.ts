import type { Plant } from '@my-flora/shared/plants';
import { describe, expect, it } from 'vitest';

import { filterPlants } from './filter-plants';

const plants: Plant[] = [
  {
    id: '91460869-d438-4b39-93f1-f5628528b00e',
    nickname: 'Olive',
    species: 'Olea europaea',
    imageUrl: null,
    healthStatus: 'unknown',
    nextAction: null,
    createdAt: '2026-09-09T08:00:00.000Z',
    updatedAt: '2026-09-09T08:00:00.000Z',
  },
  {
    id: 'e897db13-331d-40e6-8300-3ecf6ea7062c',
    nickname: 'Mona',
    species: 'Monstera deliciosa',
    imageUrl: null,
    healthStatus: 'healthy',
    nextAction: null,
    createdAt: '2026-09-09T09:00:00.000Z',
    updatedAt: '2026-09-09T09:00:00.000Z',
  },
];

describe('filterPlants', () => {
  it('matches nicknames without case sensitivity', () => {
    expect(filterPlants(plants, ' olive ')).toEqual([plants[0]]);
  });

  it('matches species names', () => {
    expect(filterPlants(plants, 'deliciosa')).toEqual([plants[1]]);
  });

  it('returns all plants for an empty search', () => {
    expect(filterPlants(plants, '')).toEqual(plants);
  });
});
