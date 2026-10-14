import 'dotenv/config';

import { defineConfig } from 'prisma/config';

const defaultDevelopmentDatabaseUrl =
  'postgresql://my_flora:my_flora@localhost:5432/my_flora?schema=public';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL ?? defaultDevelopmentDatabaseUrl,
  },
});
