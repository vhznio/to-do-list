/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/no-mutable-exports */
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // eslint-disable-next-line prettier/prettier
  if (!(global as any).prisma) (global as any).prisma = new PrismaClient()
  prisma = (global as any).prisma
}

export default prisma