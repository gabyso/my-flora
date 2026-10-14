import { HealthResponseSchema, type HealthResponse } from '@my-flora/shared/health';
import {
  PlantSchema,
  PlantsResponseSchema,
  type CreatePlantInput,
  type Plant,
  type PlantsResponse,
} from '@my-flora/shared/plants';
import type { z } from 'zod';

import { mobileEnvironment } from '@mobile/config/environment';

const requestTimeoutMilliseconds = 10_000;

export class ApiRequestError extends Error {
  public constructor(
    message: string,
    public readonly statusCode?: number,
  ) {
    super(message);
    this.name = 'ApiRequestError';
  }
}

async function apiRequest<ResponseData>(
  path: string,
  responseSchema: z.ZodType<ResponseData>,
  options: RequestInit = {},
): Promise<ResponseData> {
  const abortController = new AbortController();
  const timeout = setTimeout(() => {
    abortController.abort();
  }, requestTimeoutMilliseconds);

  try {
    const response = await fetch(mobileEnvironment.EXPO_PUBLIC_API_URL + path, {
      ...options,
      headers: {
        Accept: 'application/json',
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
      signal: abortController.signal,
    });

    if (!response.ok) {
      throw new ApiRequestError('The API request was not successful.', response.status);
    }

    const responseData: unknown = await response.json();
    const parsedResponse = responseSchema.safeParse(responseData);

    if (!parsedResponse.success) {
      throw new ApiRequestError('The API response did not match its contract.');
    }

    return parsedResponse.data;
  } finally {
    clearTimeout(timeout);
  }
}

export function getApiHealth(): Promise<HealthResponse> {
  return apiRequest('/health', HealthResponseSchema);
}

export function getPlants(): Promise<PlantsResponse> {
  return apiRequest('/plants', PlantsResponseSchema);
}

export function getPlant(plantId: string): Promise<Plant> {
  return apiRequest('/plants/' + encodeURIComponent(plantId), PlantSchema);
}

export function createPlant(input: CreatePlantInput): Promise<Plant> {
  return apiRequest('/plants', PlantSchema, {
    method: 'POST',
    body: JSON.stringify(input),
  });
}
