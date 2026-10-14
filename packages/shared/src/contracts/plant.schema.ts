import { z } from 'zod';

export const PlantHealthStatusSchema = z.enum(['healthy', 'needs_attention', 'unknown']);

const OptionalPlantTextSchema = z
  .string()
  .trim()
  .max(100)
  .transform((value) => value || null)
  .nullable()
  .optional();

export const CreatePlantInputSchema = z.object({
  nickname: z.string().trim().min(1).max(60),
  species: OptionalPlantTextSchema,
  imageUrl: z.url().nullable().optional(),
});

export const PlantSchema = z.object({
  id: z.uuid(),
  nickname: z.string().min(1).max(60),
  species: z.string().min(1).max(100).nullable(),
  imageUrl: z.url().nullable(),
  healthStatus: PlantHealthStatusSchema,
  nextAction: z.string().min(1).nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
});

export const PlantsResponseSchema = z.object({
  plants: z.array(PlantSchema),
});

export const PlantRouteParamsSchema = z.object({
  plantId: z.uuid(),
});

export type CreatePlantInput = z.infer<typeof CreatePlantInputSchema>;
export type Plant = z.infer<typeof PlantSchema>;
export type PlantHealthStatus = z.infer<typeof PlantHealthStatusSchema>;
export type PlantsResponse = z.infer<typeof PlantsResponseSchema>;
