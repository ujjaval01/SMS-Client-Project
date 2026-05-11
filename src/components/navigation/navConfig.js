import {
  Bell,
  BookOpen,
  Calendar,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  IndianRupee,
  Megaphone,
  Settings,
  Users,
} from 'lucide-react'

export const studentNav = [
  ['dashboard', LayoutDashboard, 'Dashboard'],
  ['attendance', ClipboardList, 'Attendance'],
  ['results', GraduationCap, 'Results'],
  ['assignments', BookOpen, 'Assignments'],
  ['timetable', Calendar, 'Timetable'],
  ['notes', FileText, 'Notes'],
  ['fees', IndianRupee, 'Fees'],
  ['notifications', Bell, 'Notifications'],
  ['profile', Settings, 'Profile'],
]

export const teacherNav = [
  ['dashboard', LayoutDashboard, 'Dashboard'],
  ['students', Users, 'Students Management'],
  ['attendance', ClipboardList, 'Attendance Management'],
  ['results', GraduationCap, 'Results Management'],
  ['assignments', BookOpen, 'Assignments Management'],
  ['timetable', Calendar, 'Timetable Management'],
  ['announcements', Megaphone, 'Announcements'],
  ['analytics', FileText, 'Analytics'],
  ['settings', Settings, 'Settings'],
]
