import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(`Login attempt for: ${email}`);

  try {
    const user = await prisma.user.findUnique({ 
      where: { email },
      include: { student: true, teacher: true }
    });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );


    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        studentId: user.student?.id,
        teacherId: user.teacher?.id
      }

    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Register (for demo/admin purposes)
router.post('/register', async (req, res) => {
  const { email, password, name, role, studentId, teacherId, classId, section } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = {
      email,
      password: hashedPassword,
      name,
      role
    };

    if (role === 'student' && studentId) {
      userData.student = { create: { id: studentId, classId, section } };
    } else if (role === 'teacher' && teacherId) {
      userData.teacher = { create: { id: teacherId } };
    }

    const user = await prisma.user.create({
      data: userData
    });

    res.status(201).json({ message: 'User created', userId: user.id });
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ message: 'An account with this email already exists. Please log in instead.' });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
