// Prisma Client Instance
// Singleton pattern to prevent multiple instances in development

import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    // Performance optimizations
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    // Connection pool settings for better performance
    connectionLimit: 10,
    // Reduce query timeout for faster failures
    transactionOptions: {
      maxWait: 5000, // 5 seconds
      timeout: 10000, // 10 seconds
    },
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export default prisma;
