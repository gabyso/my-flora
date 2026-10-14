import { z } from 'zod';

const ConfidenceSchema = z.number().min(0).max(1);

export const HealthStatusSchema = z.enum([
  'healthy',
  'minor_issues',
  'needs_attention',
  'critical',
]);

export const RecommendationTypeSchema = z.enum([
  'watering',
  'light',
  'fertilizer',
  'soil',
  'repot',
  'pruning',
  'pest',
  'other',
]);

export const AnalysisPrioritySchema = z.enum(['today', 'soon', 'later']);

export const PlantAnalysisResultSchema = z.object({
  identification: z.object({
    commonName: z.string().min(1).nullable(),
    scientificName: z.string().min(1).nullable(),
    confidence: ConfidenceSchema,
  }),
  health: z.object({
    score: z.number().min(0).max(100),
    status: HealthStatusSchema,
  }),
  observations: z.array(
    z.object({
      description: z.string().min(1),
      confidence: ConfidenceSchema,
    }),
  ),
  possibleIssues: z.array(
    z.object({
      issue: z.string().min(1),
      probability: z.enum(['low', 'medium', 'high']),
      explanation: z.string().min(1),
    }),
  ),
  recommendations: z.array(
    z.object({
      type: RecommendationTypeSchema,
      priority: AnalysisPrioritySchema,
      action: z.string().min(1),
      reason: z.string().min(1),
    }),
  ),
  followUpQuestions: z
    .array(
      z.object({
        id: z.string().min(1),
        question: z.string().min(1),
      }),
    )
    .optional(),
});

export type PlantAnalysisResult = z.infer<typeof PlantAnalysisResultSchema>;
