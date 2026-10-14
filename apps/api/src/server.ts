import 'dotenv/config';

import { buildApp } from './app';
import { parseApiEnvironment } from './config/environment';
import { PrismaPlantRepository } from './features/plants/prisma-plant.repository';
import { createPrismaClient } from './infrastructure/database/prisma';

const environment = parseApiEnvironment();
const prismaClient = createPrismaClient(environment.DATABASE_URL);
const app = await buildApp({
  environment,
  logger: true,
  plantRepository: new PrismaPlantRepository(prismaClient),
});

async function stopServer(signal: NodeJS.Signals): Promise<void> {
  app.log.info({ signal }, 'Stopping API');
  await app.close();
  await prismaClient.$disconnect();
  process.exit(0);
}

process.once('SIGINT', () => {
  void stopServer('SIGINT');
});
process.once('SIGTERM', () => {
  void stopServer('SIGTERM');
});

try {
  await prismaClient.$connect();
  await app.listen({
    host: environment.API_HOST,
    port: environment.API_PORT,
  });
} catch (error: unknown) {
  app.log.fatal({ error }, 'API failed to start');
  await prismaClient.$disconnect();
  process.exit(1);
}
