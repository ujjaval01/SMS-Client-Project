const STUDENT_NAMES = [
  'Ananya Deshpande',
  'Rohan Verma',
  'Ishaan Khanna',
  'Priya Menon',
  'Karthik Nair',
  'Sneha Reddy',
  'Arnav Joshi',
  'Meera Krishnan',
  'Vikram Singh',
  'Kavya Iyer',
  'Aditya Patil',
  'Lakshmi Narayanan',
  'Sanjay Kapoor',
  'Divya Sharma',
  'Harsh Agarwal',
  'Neha Bansal',
  'Siddharth Rao',
  'Tanvi Kulkarni',
]

function buildStudents() {
  return STUDENT_NAMES.map((name, i) => {
    const id = `VNIT-2024-${1001 + i}`
    return {
      id,
      name,
      class: `${10 + (i % 3)}`,
      section: i % 2 === 0 ? 'A' : 'B',
      contact: `98${String(700000000 + i * 13721).slice(0, 8)}`,
      attendance: 72 + (i % 26),
      gpa: Number((7.2 + (i % 25) / 10).toFixed(2)),
    }
  })
}

function buildMarks(students) {
  return students.map((s, i) => ({
    studentId: s.id,
    math: 68 + (i % 28),
    science: 65 + (i % 30),
    english: 70 + (i % 26),
    social: 66 + (i % 29),
  }))
}

export function createSeed() {
  const students = buildStudents()
  const marks = buildMarks(students)

  return {
    schemaVersion: 3,
    instituteName: 'Vidya Niketan Institute of Technology, Pune',
    users: [
      {
        id: 'adm-1',
        role: 'admin',
        name: 'Rajesh Krishnan',
        email: 'admin@demo.com',
        password: 'demo123',
      },
      {
        id: 'tch-1',
        role: 'teacher',
        name: 'Dr. Meera Iyer',
        email: 'teacher@demo.com',
        password: 'demo123',
        department: 'Computer Science & Engineering',
      },
      {
        id: 'stu-1',
        role: 'student',
        name: 'Ananya Deshpande',
        email: 'student@demo.com',
        password: 'demo123',
        studentId: 'VNIT-2024-1001',
      },
    ],
    teachers: [
      { id: 'tch-1', name: 'Dr. Meera Iyer', subject: 'Data Structures', department: 'CSE' },
      { id: 'tch-2', name: 'Prof. Amitabh Sen', subject: 'Database Systems', department: 'CSE' },
      { id: 'tch-3', name: 'Dr. Kavitha Sundaram', subject: 'Operating Systems', department: 'CSE' },
    ],
    students,
    marks,
    assignments: [
      {
        id: 'asg-1',
        title: 'Compiler Design: Lexical Analyser Report',
        dueDate: '2026-05-22',
        status: 'Pending',
        subject: 'CD',
        notes: 'Submit PDF + Git repository link',
      },
      {
        id: 'asg-2',
        title: 'Machine Learning Lab — Clustering Exercise',
        dueDate: '2026-05-18',
        status: 'Submitted',
        subject: 'ML',
        notes: 'Use scikit-learn; include confusion matrix',
      },
      {
        id: 'asg-3',
        title: 'Discrete Mathematics Problem Set 4',
        dueDate: '2026-05-25',
        status: 'Pending',
        subject: 'DM',
        notes: 'Chapters 5–6',
      },
    ],
    schedule: [
      { day: 'Mon', className: 'Data Structures', time: '09:15 AM' },
      { day: 'Mon', className: 'Database Systems Lab', time: '02:00 PM' },
      { day: 'Tue', className: 'Operating Systems', time: '10:30 AM' },
      { day: 'Wed', className: 'Machine Learning', time: '11:00 AM' },
      { day: 'Thu', className: 'Compiler Design', time: '01:30 PM' },
      { day: 'Fri', className: 'Technical Communication', time: '09:00 AM' },
    ],
    notes: [
      { id: 'note-1', title: 'OS — Deadlocks & Scheduling (Unit IV)', subject: 'OS', url: '#' },
      { id: 'note-2', title: 'DBMS — Normalisation Summary', subject: 'DBMS', url: '#' },
      { id: 'note-3', title: 'ML — Gradient Descent Intuition', subject: 'ML', url: '#' },
    ],
    announcements: [
      { id: 'an-1', text: 'Monsoon 2026 end-semester timetable is now available on the portal.', time: '3h ago' },
      { id: 'an-2', text: 'Fee payment window for Term II closes on 30 May 2026.', time: '1d ago' },
    ],
    classes: [
      { id: 'cls-1', program: 'B.Tech CSE', year: '2nd Year', section: 'A', strength: 62 },
      { id: 'cls-2', program: 'B.Tech CSE', year: '2nd Year', section: 'B', strength: 58 },
      { id: 'cls-3', program: 'B.Tech IT', year: '3rd Year', section: 'A', strength: 55 },
    ],
    fees: [
      { id: 'fee-1', studentId: 'VNIT-2024-1001', term: 'Monsoon 2025', total: 92500, paid: 92500, status: 'Paid', verificationStatus: 'Verified' },
      { id: 'fee-2', studentId: 'VNIT-2024-1002', term: 'Monsoon 2025', total: 92500, paid: 60000, status: 'Partial', verificationStatus: 'Pending' },
      { id: 'fee-3', studentId: 'VNIT-2024-1003', term: 'Monsoon 2025', total: 92500, paid: 92500, status: 'Paid', verificationStatus: 'Verified' },
      { id: 'fee-4', studentId: 'VNIT-2024-1004', term: 'Monsoon 2025', total: 92500, paid: 0, status: 'Pending', verificationStatus: 'None' },
    ],
    activityLogs: [
      { id: 'log-1', action: 'Admin broadcast: fee reminder', actor: 'Rajesh Krishnan', time: '2h ago' },
      { id: 'log-2', action: 'Teacher updated marks — ML batch', actor: 'Dr. Meera Iyer', time: '5h ago' },
      { id: 'log-3', action: 'Student login — VNIT-2024-1012', actor: 'System', time: '6h ago' },
      { id: 'log-4', action: 'New assignment published: CD Lexical Analyser', actor: 'Prof. Amitabh Sen', time: '1d ago' },
    ],
    analytics: {
      monthlyAttendance: [
        { month: 'Jan', pct: 88 },
        { month: 'Feb', pct: 86 },
        { month: 'Mar', pct: 91 },
        { month: 'Apr', pct: 89 },
        { month: 'May', pct: 87 },
      ],
      feeCollection: [
        { month: 'Jan', lakhs: 42 },
        { month: 'Feb', lakhs: 38 },
        { month: 'Mar', lakhs: 51 },
        { month: 'Apr', lakhs: 47 },
        { month: 'May', lakhs: 44 },
      ],
      studentGrowth: [
        { year: '2022', count: 1180 },
        { year: '2023', count: 1245 },
        { year: '2024', count: 1310 },
        { year: '2025', count: 1388 },
        { year: '2026', count: 1452 },
      ],
    },
  }
}
