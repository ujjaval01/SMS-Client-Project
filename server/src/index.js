import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import studentRoutes from './routes/students.js';
import teacherRoutes from './routes/teachers.js';
import dashboardRoutes from './routes/dashboard.js';
import classRoutes from './routes/classes.js';
import resultRoutes from './routes/results.js';
import announcementRoutes from './routes/announcements.js';
import attendanceRoutes from './routes/attendance.js';
import feeRoutes from './routes/fees.js';
import assignmentRoutes from './routes/assignments.js';




import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();



// Check DB Connection
async function checkDb() {
  try {
    const count = await prisma.user.count();
    console.log(`Connected to DB. Total users in database: ${count}`);

    // Ensure static admin exists
    const adminEmail = 'admin@ujvl.com';
    const adminExists = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!adminExists) {
      const bcrypt = await import('bcryptjs');
      const hash = await bcrypt.hash('ujvl123', 10);
      await prisma.user.create({
        data: {
          email: adminEmail,
          password: hash,
          name: 'System Admin',
          role: 'admin'
        }
      });
      console.log('Static admin created.');
    }

    // Ensure classes 1 to 12 exist for registration
    for (let i = 1; i <= 12; i++) {
      const classId = i.toString();
      const existingClass = await prisma.class.findUnique({ where: { id: classId } });
      if (!existingClass) {
        await prisma.class.create({
          data: {
            id: classId,
            name: `Class ${i}`,
            year: new Date().getFullYear().toString()
          }
        });
      }
    }

  } catch (err) {
    console.error('Database connection failed:', err.message);
  }
}
checkDb();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/assignments', assignmentRoutes);





app.get('/', (req, res) => {
  res.send('EduSync API is running...');
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;

