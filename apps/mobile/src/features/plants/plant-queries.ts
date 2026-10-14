import type { CreatePlantInput } from '@my-flora/shared/plants';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createPlant, getPlant, getPlants } from '@mobile/services/api/api-client';

export const plantQueryKeys = {
  all: ['plants'] as const,
  detail: (plantId: string) => ['plants', plantId] as const,
};

export function usePlants() {
  return useQuery({
    queryKey: plantQueryKeys.all,
    queryFn: getPlants,
  });
}

export function usePlant(plantId: string | null) {
  return useQuery({
    queryKey: plantQueryKeys.detail(plantId ?? ''),
    queryFn: () => getPlant(plantId ?? ''),
    enabled: plantId !== null,
  });
}

export function useCreatePlant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreatePlantInput) => createPlant(input),
    onSuccess: async (plant) => {
      queryClient.setQueryData(plantQueryKeys.detail(plant.id), plant);
      await queryClient.invalidateQueries({
        queryKey: plantQueryKeys.all,
      });
    },
  });
}
