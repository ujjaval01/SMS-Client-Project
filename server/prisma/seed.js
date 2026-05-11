import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding advanced database...');

  // Clear existing data (Order matters!)
  await prisma.activityLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.timetable.deleteMany();
  await prisma.result.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.assignment.deleteMany();
  await prisma.attendance.deleteMany();
  await prisma.fee.deleteMany();
  await prisma.subject.deleteMany();
  await prisma.class.deleteMany();
  await prisma.student.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('demo123', 10);

  // 1. Create Users & Profiles
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@demo.com',
      password: hashedPassword,
      name: 'Rajesh Krishnan',
      role: 'ADMIN',
    },
  });

  const teacherUser = await prisma.user.create({
    data: {
      email: 'teacher@demo.com',
      password: hashedPassword,
      name: 'Dr. Meera Iyer',
      role: 'TEACHER',
    },
  });

  const studentUser = await prisma.user.create({
    data: {
      email: 'student@demo.com',
      password: hashedPassword,
      name: 'Ananya Deshpande',
      role: 'STUDENT',
    },
  });

  // 2. Create Profiles
  const teacher = await prisma.teacher.create({
    data: {
      id: 'tch-1',
      userId: teacherUser.id,
      subject: 'Data Structures',
      department: 'CSE',
    },
  });

  // 3. Create Classes
  const classA = await prisma.class.create({
    data: {
      name: 'B.Tech CSE',
      year: '2nd Year',
      section: 'A',
      teacherId: teacher.id,
    },
  });

  const student = await prisma.student.create({
    data: {
      id: 'VNIT-2024-1001',
      userId: studentUser.id,
      classId: classA.id,
      section: 'A',
      contact: '9876543210',
    },
  });

  // 4. Create Subjects
  const subject1 = await prisma.subject.create({
    data: {
      name: 'Data Structures',
      code: 'CS201',
      classId: classA.id,
    },
  });

  const subject2 = await prisma.subject.create({
    data: {
      name: 'Operating Systems',
      code: 'CS202',
      classId: classA.id,
    },
  });

  // 5. Create Attendance
  await prisma.attendance.create({
    data: {
      studentId: student.id,
      date: new Date(),
      status: 'Present',
      markedBy: teacher.id,
    },
  });

  // 6. Create Assignment
  const assignment = await prisma.assignment.create({
    data: {
      title: 'Compiler Design: Lexical Analyser',
      description: 'Implement a lexical analyser for a subset of C language.',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      subjectId: subject1.id,
      teacherId: teacher.id,
    },
  });

  // 7. Create Timetable
  await prisma.timetable.createMany({
    data: [
      { classId: classA.id, teacherId: teacher.id, day: 'Monday', startTime: '09:00 AM', endTime: '10:00 AM', subject: 'Data Structures' },
      { classId: classA.id, teacherId: teacher.id, day: 'Tuesday', startTime: '10:30 AM', endTime: '11:30 AM', subject: 'Operating Systems' },
    ],
  });

  // 8. Create Announcements
  await prisma.announcement.create({
    data: {
      title: 'Term Exam Timetable',
      content: 'The end-term exam for 2nd-year CSE students starts on June 15th.',
      priority: 'High',
      createdBy: adminUser.id,
    },
  });

  // 9. Activity Log
  await prisma.activityLog.create({
    data: {
      action: 'System Seed',
      actor: 'Admin',
      role: 'ADMIN',
      details: 'Initial system seeding completed.',
    },
  });

  console.log('Advanced Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
