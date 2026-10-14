import { describe, expect, it } from 'vitest';

import { parseApiEnvironment } from './environment';

describe('parseApiEnvironment', () => {
  it('coerces the API port and applies safe defaults', () => {
    const environment = parseApiEnvironment({
      API_PORT: '4100',
      DATABASE_URL: 'postgresql://user:password@localhost:5432/my_flora',
    });

    expect(environment).toMatchObject({
      NODE_ENV: 'development',
      API_HOST: '0.0.0.0',
      API_PORT: 4100,
    });
  });

  it('rejects non-PostgreSQL database URLs', () => {
    expect(() =>
      parseApiEnvironment({
        DATABASE_URL: 'mysql://user:password@localhost:3306/my_flora',
      }),
    ).toThrow();
  });
});
