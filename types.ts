
export enum Role {
  Admin = 'Admin',
  Faculty = 'Faculty',
  Student = 'Student',
}

export enum ComplaintStatus {
  Open = 'Open',
  InProgress = 'In Progress',
  Resolved = 'Resolved',
}

export enum AttendanceStatus {
  Present = 'Present',
  Absent = 'Absent',
}

export enum NoticeCategory {
  General = 'General',
  Urgent = 'Urgent',
  Exam = 'Exam',
  Holiday = 'Holiday',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  department?: string;
  year?: number;
  courses?: string[]; // Course IDs
  avatarUrl: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  department: string;
  facultyId: string;
}

export interface AttendanceRecord {
  studentId: string;
  courseId: string;
  date: string; // YYYY-MM-DD
  status: AttendanceStatus;
}

export interface TimetableEntry {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  courseId: string;
  location: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: NoticeCategory;
  authorId: string;
  createdAt: string; // ISO Date String
  isPinned: boolean;
}

export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  facultyId: string;
  deadline: string; // ISO Date String
  description: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  submittedAt: string; // ISO Date String
  grade: number | null;
  feedback: string | null;
  plagiarismStatus: 'Checked' | 'Pending';
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string; // ISO Date String
  location: string;
  organizer: string; // Club name or Department
  qrCode: string; // data URL for QR code
}

export interface Club {
  id: string;
  name: string;
  description: string;
  members: string[]; // studentIds
}

export interface Complaint {
  id: string;
  studentId: string;
  category: 'IT' | 'Hostel' | 'Admin';
  subject: string;
  description: string;
  status: ComplaintStatus;
  createdAt: string; // ISO Date String
  resolvedAt: string | null;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string; // Can be a user ID or group ID
  content: string;
  timestamp: string; // ISO Date String
  isRead: boolean;
}
