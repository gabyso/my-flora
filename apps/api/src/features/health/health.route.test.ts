import { HealthResponseSchema } from '@my-flora/shared/health';
import { afterEach, describe, expect, it } from 'vitest';

import { buildApp } from '../../app';

const appsToClose: Awaited<ReturnType<typeof buildApp>>[] = [];

afterEach(async () => {
  await Promise.all(appsToClose.splice(0).map((app) => app.close()));
});

describe('GET /health', () => {
  it('returns the validated API health contract', async () => {
    const app = await buildApp();
    appsToClose.push(app);

    const response = await app.inject({
      method: 'GET',
      url: '/health',
    });

    expect(response.statusCode).toBe(200);
    expect(HealthResponseSchema.parse(response.json())).toMatchObject({
      status: 'ok',
      service: 'my-flora-api',
      version: '0.1.0',
    });
  });
});
