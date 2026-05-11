import express from 'express';
import { PrismaClient } from '@prisma/client';
import { protect, authorize } from '../middleware/auth.js';
import { emitEvent } from '../utils/socket.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get all announcements
router.get('/', protect, async (req, res) => {
  try {
    const announcements = await prisma.announcement.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create announcement (ADMIN & TEACHER)
router.post('/', protect, authorize('ADMIN', 'TEACHER'), async (req, res) => {
  try {
    const { title, content, priority } = req.body;
    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        priority,
        createdBy: req.user.id
      }
    });

    // Real-time broadcast
    emitEvent('announcement_created', announcement);
    
    // Create activity log
    await prisma.activityLog.create({
      data: {
        action: 'Create Announcement',
        actor: req.user.name || 'System Admin',
        role: req.user.role,
        details: `Published: ${title}`
      }
    });

    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
