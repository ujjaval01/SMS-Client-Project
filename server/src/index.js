import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import studentRoutes from './routes/students.js';
import teacherRoutes from './routes/teachers.js';
import dashboardRoutes from './routes/dashboard.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*", // Adjust for production
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

// Socket.IO Connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Make io accessible in routes
app.set('io', io);

// Check DB Connection
async function checkDb() {
  try {
    const count = await prisma.user.count();
    console.log(`Connected to DB. Total users in database: ${count}`);
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

app.get('/', (req, res) => {
  res.send('SMS Real-time API is running...');
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

