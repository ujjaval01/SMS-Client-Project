import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Generating realistic academic ecosystem...');

  // 1. CLEAR DATA
  const models = ['ActivityLog', 'Notification', 'Announcement', 'Timetable', 'Result', 'Submission', 'Assignment', 'Attendance', 'Fee', 'Subject', 'Class', 'Student', 'Teacher', 'User'];
  for (const model of models) {
    await prisma[model.charAt(0).toLowerCase() + model.slice(1)].deleteMany();
  }

  const hashedPassword = await bcrypt.hash('demo123', 10);

  // 2. CREATE TEACHERS
  const teacherData = [
    { name: 'Dr. Meera Iyer', email: 'meera@vnit.edu', dept: 'CSE', subject: 'Data Structures' },
    { name: 'Prof. Amit Verma', email: 'amit@vnit.edu', dept: 'CSE', subject: 'Operating Systems' },
    { name: 'Dr. Sarah Khan', email: 'sarah@vnit.edu', dept: 'Math', subject: 'Discrete Math' },
    { name: 'Prof. John Doe', email: 'teacher@demo.com', dept: 'CSE', subject: 'Computer Networks' }, // Main Demo Teacher
  ];

  const teachers = [];
  for (const t of teacherData) {
    const user = await prisma.user.create({
      data: { email: t.email, password: hashedPassword, name: t.name, role: 'TEACHER' }
    });
    const teacher = await prisma.teacher.create({
      data: { id: `tch-${t.email.split('@')[0]}`, userId: user.id, subject: t.subject, department: t.dept }
    });
    teachers.push(teacher);
  }

  // 3. CREATE CLASSES
  const classA = await prisma.class.create({
    data: { name: 'B.Tech CSE', year: '2nd Year', section: 'A', teacherId: teachers[0].id }
  });
  const classB = await prisma.class.create({
    data: { name: 'B.Tech CSE', year: '2nd Year', section: 'B', teacherId: teachers[1].id }
  });

  // 4. CREATE SUBJECTS
  const subjects = [];
  const subjectNames = ['Data Structures', 'Operating Systems', 'Discrete Math', 'Algorithms'];
  for (const name of subjectNames) {
    const s = await prisma.subject.create({
      data: { name, code: `CS-${name.substring(0,3).toUpperCase()}`, classId: classA.id }
    });
    subjects.push(s);
  }

  // 5. CREATE STUDENTS
  const studentNames = [
    'Ananya Deshpande', 'Rohan Mehta', 'Sana Parveen', 'Arjun Singh', 'Isha Gupta',
    'Vikram Malhotra', 'Priya Sharma', 'Kabir Bakshi', 'Megha Rao', 'Aditya Joshi'
  ];
  
  // Demo Student
  const demoUser = await prisma.user.create({
    data: { email: 'student@demo.com', password: hashedPassword, name: 'Ujjaval Saini', role: 'STUDENT' }
  });
  const demoStudent = await prisma.student.create({
    data: { id: 'VNIT-2024-001', userId: demoUser.id, classId: classA.id, section: 'A', contact: '9988776655', attendancePct: 92 }
  });

  const students = [demoStudent];
  for (let i = 0; i < studentNames.length; i++) {
    const user = await prisma.user.create({
      data: { email: `student${i+1}@demo.com`, password: hashedPassword, name: studentNames[i], role: 'STUDENT' }
    });
    const s = await prisma.student.create({
      data: { 
        id: `VNIT-2024-10${i+2}`, 
        userId: user.id, 
        classId: i < 5 ? classA.id : classB.id, 
        section: i < 5 ? 'A' : 'B',
        attendancePct: Math.floor(Math.random() * (98 - 75) + 75)
      }
    });

    students.push(s);
  }

  // 6. CREATE RESULTS & FEES
  for (const s of students) {
    // Random Results
    for (const sub of subjects) {
      await prisma.result.create({
        data: { 
          studentId: s.id, 
          subjectId: sub.id, 
          marks: Math.floor(Math.random() * (95 - 40) + 40), 
          total: 100,
          term: 'Mid-Term'
        }
      });
    }

    // Fees
    await prisma.fee.create({
      data: {
        studentId: s.id,
        term: 'Spring 2024',
        amount: 85000,
        paid: Math.random() > 0.5 ? 85000 : 42500,
        status: Math.random() > 0.5 ? 'Paid' : 'Partial'
      }
    });
  }

  // 7. TIMETABLES
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  for (const day of days) {
    await prisma.timetable.create({
      data: {
        classId: classA.id,
        teacherId: teachers[0].id,
        day,
        startTime: '09:00 AM',
        endTime: '10:30 AM',
        subject: 'Data Structures'
      }
    });
  }

  // 8. ADMIN & LOGS
  const adminUser = await prisma.user.create({
    data: { email: 'admin@demo.com', password: hashedPassword, name: 'System Administrator', role: 'ADMIN' }
  });

  await prisma.announcement.createMany({
    data: [
      { title: 'Tech-Fest 2024', content: 'Registrations are now open for the annual innovation summit.', priority: 'High', createdBy: adminUser.id },
      { title: 'Library Hours Extended', content: 'The library will remain open until 10 PM during exam weeks.', priority: 'Normal', createdBy: adminUser.id }
    ]
  });

  await prisma.activityLog.createMany({
    data: [
      { action: 'System Setup', actor: 'Admin', role: 'ADMIN', details: 'Full academic year data migrated.' },
      { action: 'Result Publish', actor: 'Dr. Meera Iyer', role: 'TEACHER', details: 'Mid-term results released for CSE Section A.' }
    ]
  });

  console.log('Database populated with high-fidelity dummy data.');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
