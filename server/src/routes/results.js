import express from 'express';
import { PrismaClient } from '@prisma/client';
import { protect, authorize } from '../middleware/auth.js';
import { emitEvent } from '../utils/socket.js';

const router = express.Router();
const prisma = new PrismaClient();

// Publish Result (TEACHER & ADMIN)
router.post('/publish', protect, authorize('TEACHER', 'ADMIN'), async (req, res) => {
  try {
    const { studentId, subjectId, marks, total, term } = req.body;
    
    const result = await prisma.result.create({
      data: {
        studentId,
        subjectId,
        marks: parseInt(marks),
        total: parseInt(total),
        term,
        grade: marks/total >= 0.9 ? 'A+' : marks/total >= 0.8 ? 'A' : 'B'
      }
    });

    // Real-time broadcast to specific student
    emitEvent('result_published', { studentId, result });
    
    await prisma.activityLog.create({
      data: {
        action: 'Publish Result',
        actor: req.user.name || 'Staff',
        role: req.user.role,
        details: `Published result for Student ${studentId}`
      }
    });


    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
