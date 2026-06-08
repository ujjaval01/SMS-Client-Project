import express from 'express';
import { PrismaClient } from '@prisma/client';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get all classes
router.get('/', protect, async (req, res) => {
  try {
    const classes = await prisma.class.findMany({
      include: {
        classTeacher: { include: { user: { select: { name: true } } } },
        _count: { select: { students: true } }
      }
    });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create class (ADMIN ONLY)
router.post('/', protect, authorize('ADMIN'), async (req, res) => {
  try {
    const { name, year, section, teacherId } = req.body;
    const newClass = await prisma.class.create({
      data: { name, year, section, teacherId }
    });

    res.status(201).json(newClass);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
