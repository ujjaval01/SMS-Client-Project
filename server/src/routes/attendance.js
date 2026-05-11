import express from 'express';
import { PrismaClient } from '@prisma/client';
import { protect, authorize } from '../middleware/auth.js';
import { emitEvent } from '../utils/socket.js';

const router = express.Router();
const prisma = new PrismaClient();

// Mark Attendance (TEACHER & ADMIN)
router.post('/mark', protect, authorize('TEACHER', 'ADMIN'), async (req, res) => {
  try {
    const { studentId, status, date } = req.body;
    
    const attendance = await prisma.attendance.create({
      data: {
        studentId,
        status,
        date: new Date(date),
        markedBy: req.user.id
      }
    });

    // Update student's aggregate attendance pct (Mock logic for demo)
    await prisma.student.update({
      where: { id: studentId },
      data: { attendance: { increment: status === 'Present' ? 1 : 0 } }
    });

    emitEvent('attendance_updated', { studentId, status });
    
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get Attendance for a class
router.get('/class/:classId', protect, async (req, res) => {
  try {
    const attendance = await prisma.attendance.findMany({
      where: { student: { classId: req.params.classId } },
      include: { student: true },
      orderBy: { date: 'desc' }
    });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
