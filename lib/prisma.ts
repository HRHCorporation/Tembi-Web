// lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Mencegah multiple instance saat hot-reload di development
const globalForPrisma = global as unknown as { prisma: PrismaClient };

const connectionString = process.env.DATABASE_URL;

// Inisialisasi Pool & Adapter untuk Prisma 7
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({ 
    adapter, 
    // log: ['query'], // Uncomment jika ingin melihat query SQL di terminal
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
