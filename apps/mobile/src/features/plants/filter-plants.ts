import type { Plant } from '@my-flora/shared/plants';

export function filterPlants(plants: Plant[], searchTerm: string): Plant[] {
  const normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase();

  if (!normalizedSearchTerm) {
    return plants;
  }

  return plants.filter((plant) =>
    [plant.nickname, plant.species]
      .filter((value): value is string => value !== null)
      .some((value) => value.toLocaleLowerCase().includes(normalizedSearchTerm)),
  );
}
