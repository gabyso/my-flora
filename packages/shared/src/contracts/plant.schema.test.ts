import { describe, expect, it } from 'vitest';

import { CreatePlantInputSchema, PlantSchema } from './plant.schema';

describe('CreatePlantInputSchema', () => {
  it('trims meaningful fields and normalizes a blank species', () => {
    expect(
      CreatePlantInputSchema.parse({
        nickname: '  Olive  ',
        species: '   ',
      }),
    ).toEqual({
      nickname: 'Olive',
      species: null,
    });
  });

  it('rejects an empty nickname', () => {
    expect(CreatePlantInputSchema.safeParse({ nickname: '   ' }).success).toBe(false);
  });
});

describe('PlantSchema', () => {
  it('rejects records with unrecognized health states', () => {
    const result = PlantSchema.safeParse({
      id: 'e6b51081-116b-4d6d-b8c2-62136ea1fce2',
      nickname: 'Olive',
      species: null,
      imageUrl: null,
      healthStatus: 'sleepy',
      nextAction: null,
      createdAt: '2026-09-09T10:00:00.000Z',
      updatedAt: '2026-09-09T10:00:00.000Z',
    });

    expect(result.success).toBe(false);
  });
});
