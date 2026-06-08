import express from 'express';
import { PrismaClient } from '@prisma/client';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();
const prisma = new PrismaClient();

// Get all fees
router.get('/', protect, authorize('ADMIN'), async (req, res) => {
  try {
    const fees = await prisma.fee.findMany({
      include: { student: { include: { user: true } } }
    });
    res.json(fees);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create/Update Fee (ADMIN ONLY)
router.post('/', protect, authorize('ADMIN'), async (req, res) => {
  try {
    const { studentId, amount, paid, term, status } = req.body;
    const fee = await prisma.fee.create({
      data: {
        studentId,
        amount: parseFloat(amount),
        paid: parseFloat(paid),
        term,
        status
      }
    });

    res.status(201).json(fee);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
