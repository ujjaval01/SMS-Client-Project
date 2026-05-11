import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all teachers
router.get('/', async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
