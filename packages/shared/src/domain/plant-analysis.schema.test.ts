import { describe, expect, it } from 'vitest';

import { PlantAnalysisResultSchema } from './plant-analysis.schema';

const validAnalysis = {
  identification: {
    commonName: 'Swiss cheese plant',
    scientificName: 'Monstera deliciosa',
    confidence: 0.92,
  },
  health: {
    score: 76,
    status: 'minor_issues',
  },
  observations: [
    {
      description: 'One lower leaf is yellowing.',
      confidence: 0.88,
    },
  ],
  possibleIssues: [
    {
      issue: 'Possible overwatering',
      probability: 'medium',
      explanation: 'Yellowing can be consistent with soil remaining wet.',
    },
  ],
  recommendations: [
    {
      type: 'watering',
      priority: 'today',
      action: 'Check moisture two fingers below the soil surface.',
      reason: 'The photo alone cannot confirm whether the root zone is wet.',
    },
  ],
} as const;

describe('PlantAnalysisResultSchema', () => {
  it('accepts a structured uncertainty-aware result', () => {
    expect(PlantAnalysisResultSchema.parse(validAnalysis)).toEqual(validAnalysis);
  });

  it('rejects confidence values outside the supported range', () => {
    const invalidAnalysis = {
      ...validAnalysis,
      identification: {
        ...validAnalysis.identification,
        confidence: 1.2,
      },
    };

    expect(PlantAnalysisResultSchema.safeParse(invalidAnalysis).success).toBe(false);
  });

  it('rejects unsupported recommendation categories', () => {
    const invalidAnalysis = {
      ...validAnalysis,
      recommendations: [
        {
          ...validAnalysis.recommendations[0],
          type: 'sing_to_plant',
        },
      ],
    };

    expect(PlantAnalysisResultSchema.safeParse(invalidAnalysis).success).toBe(false);
  });
});
