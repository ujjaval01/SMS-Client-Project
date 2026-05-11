import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: { marks: true, fees: true }
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: req.params.id },
      include: { marks: true, fees: true }
    });
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create student
router.post('/', async (req, res) => {
  try {
    const student = await prisma.student.create({
      data: req.body
    });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
