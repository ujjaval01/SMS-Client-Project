import { PrismaClient } from '@prisma/client';
import { emitEvent } from './socket.js';

const prisma = new PrismaClient();

export const logActivity = async (action, actor, role, details) => {
  try {
    const log = await prisma.activityLog.create({
      data: { action, actor, role, details }
    });
    
    emitEvent('activity_created', log);
    return log;
  } catch (error) {
    console.error('Failed to log activity:', error);
  }
};
