import express from 'express';
import { PrismaClient } from '@prisma/client';
import { protect, authorize } from '../middleware/auth.js';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

const router = express.Router();
const prisma = new PrismaClient();

// Validation Schema
const studentSchema = z.object({
  id: z.string().min(3),
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  classId: z.string().optional(),
  section: z.string().optional(),
  contact: z.string().optional(),
});

// @desc    Get all students
// @access  Private (Admin & Teacher)
router.get('/', protect, authorize('ADMIN', 'TEACHER'), async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      include: {
        user: { select: { email: true, name: true } },
        class: true,
      }
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @desc    Create student (ADMIN ONLY)
// @access  Private/Admin
router.post('/', protect, authorize('ADMIN'), async (req, res) => {
  try {
    const validatedData = studentSchema.parse(req.body);
    
    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email: validatedData.email } });
    if (existingUser) return res.status(400).json({ message: 'User with this email already exists' });

    // 2. Create User and Student in a transaction
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: validatedData.email,
          password: hashedPassword,
          name: validatedData.name,
          role: 'STUDENT',
        }
      });

      const student = await tx.student.create({
        data: {
          id: validatedData.id,
          userId: user.id,
          classId: validatedData.classId,
          section: validatedData.section,
          contact: validatedData.contact,
        }
      });

      await tx.activityLog.create({
        data: {
          action: 'Create Student',
          actor: req.user.name || 'System Admin',
          role: req.user.role,
          details: `Created student ${validatedData.name} (${validatedData.id})`
        }
      });


      return student;
    });

    // 3. Emit real-time event

    res.status(201).json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
