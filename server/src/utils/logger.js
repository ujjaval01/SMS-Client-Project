import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const logActivity = async (action, actor, role, details) => {
  try {
    const log = await prisma.activityLog.create({
      data: { action, actor, role, details }
    });
    
    return log;
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};
